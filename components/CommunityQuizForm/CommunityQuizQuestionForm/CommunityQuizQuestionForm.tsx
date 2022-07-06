import React, { FC, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useRadioGroup,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { debounce } from "throttle-debounce";

import * as Maps from "@geobuff/svg-maps";
import * as Yup from "yup";

import { flagCategories } from "@geobuff/flags";

import RadioGroupFormField from "../../FormFields/RadioGroupFormField";
import CommunityQuizFormField from "../CommunityQuizFormField";
import SelectFormField from "../../FormFields/SelectFormField";
import CommunityQuizHasAnswersField from "../CommunityQuizHasAnswersField";
import CommunityQuizAnswersField from "../CommunityQuizAnswersField";
import CommunityQuizFlagSelectField from "../CommunityQuizFlagSelectField";
import { QuestionType } from "../../../types/manual-trivia-question-form-submit";
import { getHighlightRegionsByMap } from "../../../helpers/map";
import { TriviaQuestionType } from "../../../types/trivia-question-type";
import InlineErrorMessage from "../../InlineErrorMessage";
import { CommunityQuizFormQuestion } from "../../../types/community-quiz-form-submit";
import QuestionTypeValuePreview from "../../QuestionTypeValuePreview";
import Search from "../../../Icons/Search";
import UnsplashImageGrid from "../../UnsplashImageGrid";
import { UnsplashImage } from "../../../types/unsplash-image";

const answers = [
  "Answer One",
  "Answer Two",
  "Answer Three (Optional)",
  "Answer Four (Optional)",
];

const initialValues: CommunityQuizFormQuestion = {
  typeId: "1",
  question: "",
  explainer: "",
  imageUrl: "",
  imageAttributeName: "",
  imageAttributeUrl: "",
  imageDownloadLocation: "",
  map: "",
  highlighted: "",
  flagCode: "",
  answers: [],
  correctAnswer: "",
};

const validationSchema = Yup.object().shape({
  typeId: Yup.string().required("Please select a quiz type."),
  question: Yup.string().required("Please enter a value for question."),
  answers: Yup.array().min(2).required("Must include at least two answers"),
  correctAnswer: Yup.number()
    .required("Please select a correct answer")
    .typeError("Please select a correct answer"),
  imageUrl: Yup.string().when("typeId", {
    is: QuestionType.Image,
    then: Yup.string().required(
      "Must include imageUrl for image questions. Please search for an image and select one of the options below."
    ),
  }),
  flagCode: Yup.string().when("typeId", {
    is: QuestionType.Flag,
    then: Yup.string().required("Must include flagCode for flag questions."),
  }),
  map: Yup.string().when("typeId", {
    is: QuestionType.Map,
    then: Yup.string().required("Must include map for map questions."),
  }),
});

const mapCategories = Object.keys(Maps).map((m) => ({
  label: m.match(/[A-Z][a-z]+|[0-9]+/g).join(" "),
  value: m,
}));

const flagOptions = flagCategories?.map(({ key, label }) => ({
  label,
  value: key,
}));

export interface Props {
  values?: CommunityQuizFormQuestion;
  types: TriviaQuestionType[];
  onSubmit?: (values: CommunityQuizFormQuestion) => void;
  images?: UnsplashImage[];
  isSearchingImages?: boolean;
  isEmptyImageSearch?: boolean;
  onChangeSearchImage: (query: string) => void;
}

const CommunityQuizQuestionForm: FC<Props> = ({
  values = initialValues,
  types = [],
  onSubmit,
  images = [],
  isSearchingImages = false,
  isEmptyImageSearch = false,
  onChangeSearchImage = () => {},
  ...props
}) => {
  const [flagCategory, setFlagCategory] = useState("");
  const [flagAnswerCategory, setFlagAnswerCategory] = useState("");
  const [hasFlagAnswers, setHasFlagAnswers] = useState<boolean>(false);

  const options = types.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));

  const handleSearchImageDebounced = debounce(1500, (event) =>
    onChangeSearchImage(event.target.value)
  );

  return (
    <Flex width="100%" {...props}>
      <Formik
        onSubmit={onSubmit}
        initialValues={values}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue, errors }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const {
            getRootProps: getImageUrlRootProps,
            getRadioProps: getImageUrlRadioProps,
          } = useRadioGroup({
            name: "imageUrl",
            value: values.imageUrl,
            onChange: (value: string) => {
              const image = images.find((x) => x.url === value);
              setFieldValue("imageAttributeName", image.attributeName);
              setFieldValue("imageAttributeUrl", image.attributeUrl);
              setFieldValue("imageDownloadLocation", image.downloadLocation);
              setFieldValue("imageUrl", value);
            },
          });

          const imageUrlRadioGroup = getImageUrlRootProps();

          return (
            <Form autoComplete="off" style={{ width: "100%" }}>
              <RadioGroupFormField
                name="typeId"
                label="Type"
                selectedValue={values.typeId}
                options={options}
                setFieldHelper={setFieldValue}
              />

              <Divider marginTop={6} />

              <CommunityQuizFormField
                name="question"
                label="Question"
                placeholder="Enter question..."
              />

              <CommunityQuizFormField
                name="explainer"
                label="Explainer"
                placeholder="Enter explainer..."
              />

              {values.typeId === QuestionType.Image && (
                <>
                  <Flex marginY={3}>
                    <Field name="imageUrl">
                      {({ form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.imageUrl && form.touched.imageUrl
                          }
                        >
                          <FormLabel htmlFor="imageUrl" fontWeight="bold">
                            {"Image URL"}
                          </FormLabel>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none">
                              <Search
                                marginTop="6px"
                                marginLeft="12px"
                                height="24px"
                                width="24px"
                                color="gray.500"
                              />
                            </InputLeftElement>
                            <Input
                              type="text"
                              placeholder="Search image..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background="#F6F6F6"
                              borderRadius={6}
                              _placeholder={{ color: "gray.500" }}
                              _hover={{ background: "#e0e0e0" }}
                              onChange={handleSearchImageDebounced}
                            />
                          </InputGroup>
                          <FormErrorMessage fontSize="11px">
                            {form.errors.imageUrl}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <UnsplashImageGrid
                    images={images}
                    isSearching={isSearchingImages}
                    isEmptySearch={isEmptyImageSearch}
                    imageUrlRadioGroup={imageUrlRadioGroup}
                    getImageUrlRadioProps={getImageUrlRadioProps}
                  />
                </>
              )}

              {values.typeId === QuestionType.Flag && (
                <Flex>
                  <SelectFormField
                    name="flagCategory"
                    label="Flag Category"
                    options={flagOptions}
                    onChange={({ target }) => {
                      setFlagCategory(target.value);
                      setFieldValue("flagCode", "");
                    }}
                    width="100%"
                    marginRight={2}
                  />
                  <CommunityQuizFlagSelectField
                    name="flagCode"
                    label="Flag Code"
                    flagCategory={flagCategory}
                  />
                </Flex>
              )}

              {values.typeId === QuestionType.Map && (
                <Flex>
                  <SelectFormField
                    name="map"
                    label="Map"
                    options={mapCategories}
                    onChange={({ target }) =>
                      setFieldValue("map", target?.value)
                    }
                    width="50%"
                    marginRight={2}
                  />
                  <SelectFormField
                    name="highlighted"
                    label="Highlighted"
                    options={getHighlightRegionsByMap(values.map)}
                    onChange={({ target }) =>
                      setFieldValue("highlighted", target?.value)
                    }
                    width="50%"
                  />
                </Flex>
              )}

              <QuestionTypeValuePreview
                typeId={values.typeId}
                map={values.map}
                highlighted={values.highlighted}
                imageUrl={values.imageUrl}
                imageAttributeName={values.imageAttributeName}
                imageAttributeUrl={values.imageAttributeUrl}
              />

              <Divider marginY={6} />

              <CommunityQuizHasAnswersField
                isEnabled={hasFlagAnswers}
                onChange={(hasFlags) => setHasFlagAnswers(hasFlags)}
                marginY={6}
              />

              {hasFlagAnswers && (
                <SelectFormField
                  name="hasFlagAnswers"
                  options={flagOptions}
                  label="Flag Answer Category"
                  onChange={({ target }) => setFlagAnswerCategory(target.value)}
                  marginY={4}
                />
              )}

              <Flex direction="column" width="100%" marginBottom={5}>
                {answers.map((answer, index) => (
                  <CommunityQuizAnswersField
                    name={`answers[${index}]`}
                    key={index}
                    label={answer}
                    value={index}
                    isChecked={values.correctAnswer === index}
                    hasFlagAnswers={hasFlagAnswers}
                    flagAnswerCategory={flagAnswerCategory}
                    onChangeCorrectAnswer={(answer) =>
                      setFieldValue("correctAnswer", answer)
                    }
                    onChangeFlagCode={(flagCode) =>
                      setFieldValue(`answers[${index}].flagCode`, flagCode)
                    }
                    marginY={0.5}
                  />
                ))}
                {errors.correctAnswer && (
                  <InlineErrorMessage
                    message="Please select a correct answer"
                    marginY={2}
                  />
                )}

                {errors.answers && (
                  <InlineErrorMessage
                    message="Please add at least two answers"
                    marginY={2}
                  />
                )}
              </Flex>

              <Flex width="100%" justifyContent="flex-end">
                <Button type="submit" colorScheme="green">
                  {"Add Question"}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default CommunityQuizQuestionForm;
