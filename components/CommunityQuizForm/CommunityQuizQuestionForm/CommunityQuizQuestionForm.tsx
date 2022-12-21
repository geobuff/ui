import React, { FC, useContext, useState } from "react";

import { Search } from "@geobuff/buff-ui/components";

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
import * as Yup from "yup";

import { LanguageContext } from "../../../contexts/LanguageContext";

import useFlagGroups from "../../../hooks/UseFlagGroups";

import axiosClient from "../../../axios";
import { CommunityQuizFormQuestion } from "../../../types/community-quiz-form-submit";
import { GetMapsDto } from "../../../types/get-maps-dto";
import { QuestionType } from "../../../types/manual-trivia-question-form-submit";
import { TriviaQuestionType } from "../../../types/trivia-question-type";
import { UnsplashImage } from "../../../types/unsplash-image";
import RadioGroupFormField from "../../FormFields/RadioGroupFormField";
import SelectFormField from "../../FormFields/SelectFormField";
import InlineErrorMessage from "../../InlineErrorMessage";
import QuestionTypeValuePreview from "../../QuestionTypeValuePreview";
import UnsplashImageGrid from "../../UnsplashImageGrid";
import CommunityQuizAnswersField from "../CommunityQuizAnswersField";
import CommunityQuizFlagSelectField from "../CommunityQuizFlagSelectField";
import CommunityQuizFormField from "../CommunityQuizFormField";
import CommunityQuizHasAnswersField from "../CommunityQuizHasAnswersField";

const initialValues: CommunityQuizFormQuestion = {
  typeId: "1",
  question: "",
  explainer: "",
  imageUrl: "",
  imageAttributeName: "",
  imageAttributeUrl: "",
  imageDownloadLocation: "",
  imageWidth: 0,
  imageHeight: 0,
  imageAlt: "",
  map: "",
  highlighted: "",
  flagCode: "",
  answers: [],
  correctAnswer: "",
};

export interface Props {
  values?: CommunityQuizFormQuestion;
  types: TriviaQuestionType[];
  onSubmit?: (values: CommunityQuizFormQuestion) => void;
  images?: UnsplashImage[];
  isSearchingImages?: boolean;
  isEmptyImageSearch?: boolean;
  onChangeSearchImage: (query: string) => void;
  maps?: GetMapsDto[];
}

const CommunityQuizQuestionForm: FC<Props> = ({
  values = initialValues,
  types = [],
  onSubmit,
  images = [],
  isSearchingImages = false,
  isEmptyImageSearch = false,
  onChangeSearchImage = () => {},
  maps = [],
  ...props
}) => {
  const { t } = useContext(LanguageContext);

  const [flagCategory, setFlagCategory] = useState("");
  const [flagAnswerCategory, setFlagAnswerCategory] = useState("");
  const [hasFlagAnswers, setHasFlagAnswers] = useState<boolean>(false);

  const [highlightedRegions, setHighlightedRegions] = useState([]);

  const { data: flagGroups } = useFlagGroups();

  const validationSchema = Yup.object().shape({
    typeId: Yup.string().required(t.validations.quizTypeRequired),
    question: Yup.string().required(t.validations.questionRequired),
    answers: Yup.array().min(2).required(t.validations.answersMin),
    correctAnswer: Yup.number()
      .required(t.validations.correctAnswerRequired)
      .typeError(t.validations.correctAnswerRequired),
    imageUrl: Yup.string().when("typeId", {
      is: QuestionType.Image,
      then: Yup.string().required(t.validations.imageUrlRequired),
    }),
    flagCode: Yup.string().when("typeId", {
      is: QuestionType.Flag,
      then: Yup.string().required(t.validations.flagCodeRequired),
    }),
    map: Yup.string().when("typeId", {
      is: QuestionType.Map,
      then: Yup.string().required(t.validations.mapRequired),
    }),
  });

  const answers = [
    t.communityQuizQuestionForm.answerOne,
    t.communityQuizQuestionForm.answerTwo,
    t.communityQuizQuestionForm.answerThree,
    t.communityQuizQuestionForm.answerFour,
  ];

  const flagOptions = flagGroups.map((x) => {
    return {
      value: x.key,
      label: x.label,
    };
  });

  const options = types.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));

  const handleSearchImageDebounced = debounce(1500, (event) =>
    onChangeSearchImage(event.target.value)
  );

  const getHighlightRegionsByMap = (className: string): void => {
    axiosClient
      .get(`/maps/highlighted/${className}`)
      .then((response) => setHighlightedRegions(response.data));
  };

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
              setFieldValue("imageWidth", image.width);
              setFieldValue("imageHeight", image.height);
              setFieldValue("imageAlt", image.alt);
              setFieldValue("imageUrl", value);
            },
          });

          const imageUrlRadioGroup = getImageUrlRootProps();

          return (
            <Form autoComplete="off" style={{ width: "100%" }}>
              <RadioGroupFormField
                name="typeId"
                label={t.global.type}
                selectedValue={values.typeId}
                options={options}
                setFieldHelper={setFieldValue}
              />

              <Divider marginTop={6} />

              <CommunityQuizFormField
                name="question"
                label={t.communityQuizQuestionForm.questionLabel}
                placeholder={t.communityQuizQuestionForm.questionPlaceholder}
              />

              <CommunityQuizFormField
                name="explainer"
                label={t.communityQuizQuestionForm.explainerLabel}
                placeholder={t.communityQuizQuestionForm.explainerPlaceholder}
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
                            {t.communityQuizQuestionForm.imageUrlLabel}
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
                              placeholder={
                                t.communityQuizQuestionForm.imageUrlPlaceholder
                              }
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
                    label={t.communityQuizQuestionForm.flagCategoryLabel}
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
                    label={t.communityQuizQuestionForm.flagCodeLabel}
                    flagCategory={flagCategory}
                  />
                </Flex>
              )}

              {values.typeId === QuestionType.Map && (
                <Flex>
                  <SelectFormField
                    name="map"
                    label={t.communityQuizQuestionForm.mapLabel}
                    options={maps}
                    onChange={({ target }) => {
                      getHighlightRegionsByMap(target?.value);
                      setFieldValue("map", target?.value);
                    }}
                    width="50%"
                    marginRight={2}
                  />
                  <SelectFormField
                    name="highlighted"
                    label={t.communityQuizQuestionForm.highlightedLabel}
                    options={highlightedRegions}
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
                  label={t.communityQuizQuestionForm.flagAnswerCategoryLabel}
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
                    message={t.communityQuizQuestionForm.correctAnswerError}
                    marginY={2}
                  />
                )}

                {errors.answers && (
                  <InlineErrorMessage
                    message={t.communityQuizQuestionForm.twoAnswersError}
                    marginY={2}
                  />
                )}
              </Flex>

              <Flex width="100%" justifyContent="flex-end">
                <Button type="submit" colorScheme="green">
                  {t.global.addQuestion}
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
