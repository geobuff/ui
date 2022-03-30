import React, { FC, useState } from "react";
import { Button, Divider, Flex, FlexProps, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import * as Maps from "@geobuff/svg-maps";
import * as Yup from "yup";

import { flagCategories } from "@geobuff/flags";

import { QuizType } from "../../../types/quiz-type";
import RadioGroupFormField from "../../FormFields/RadioGroupFormField";
import CommunityQuizFormField from "../CommunityQuizFormField";
import SelectFormField from "../../FormFields/SelectFormField";
import CommunityQuizHasAnswersField from "../CommunityQuizHasAnswersField";
import CommunityQuizAnswersField from "../CommunityQuizAnswersField";
import CommunityQuizFlagSelectField from "../CommunityQuizFlagSelectField";
import { QuestionType } from "../../../types/manual-trivia-question-form-submit";

const answers = [
  "Answer One",
  "Answer Two",
  "Answer Three (Optional)",
  "Answer Four (Optional)",
];

const initialValues = {
  typeId: "1",
  question: "",
  imageUrl: "",
  map: "",
  highlighted: "",
  answers: [],
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
    then: Yup.string().required("Must include imageUrl for image questions."),
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

export interface Props extends FlexProps {
  values?: any;
  types: QuizType[];
  // TODO: add type
  onSubmit?: (values: any) => void;
}

const CommunityQuizQuestionForm: FC<Props> = ({
  values = initialValues,
  types = [],
  onSubmit,
  ...props
}) => {
  const [flagCategory, setFlagCategory] = useState("");
  const [flagAnswerCategory, setFlagAnswerCategory] = useState("");
  const [hasFlagAnswers, setHasFlagAnswers] = useState<boolean>(false);
  const [correctAnswer, setCorrectAnswer] = useState<number | string>(null);

  const options = types.map(({ id, name }) => ({
    label: name,
    value: id.toString(),
  }));

  const mapCategories = Object.keys(Maps).map((m) => ({
    label: m.match(/[A-Z][a-z]+|[0-9]+/g).join(" "),
    value: m,
  }));

  // TODO: move common
  const flagOptions = flagCategories?.map(({ key, label }) => ({
    label,
    value: key,
  }));

  const getHighlightRegionsByMap = (map: string) => {
    const selectedMap = Maps[map];

    if (selectedMap !== undefined) {
      return selectedMap.paths.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    }
  };

  return (
    <Flex width="100%" {...props}>
      <Formik
        onSubmit={onSubmit}
        initialValues={values}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values, setFieldValue, errors }) => (
          <Form autoComplete="off" style={{ width: "100%" }}>
            <RadioGroupFormField
              name="typeId"
              label="Type"
              onChange={(value) => setFieldValue("typeId", value)}
              selectedValue={values.typeId}
              options={options}
            />

            <Divider marginTop={6} />

            <CommunityQuizFormField
              name="question"
              label="Text"
              placeholder="Enter question..."
            />

            {values.typeId === QuestionType.Image && (
              <CommunityQuizFormField
                name="imageUrl"
                label="Image URL"
                placeholder="Enter image url..."
                helper="Copyrighted images will be removed. We recommend sites such as pexels for free images."
              />
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
                  onChange={({ target }) => setFieldValue("map", target?.value)}
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
                  isChecked={correctAnswer === index}
                  hasFlagAnswers={hasFlagAnswers}
                  flagAnswerCategory={flagAnswerCategory}
                  onChangeCorrectAnswer={(answer) => {
                    setCorrectAnswer(answer);
                    setFieldValue("correctAnswer", answer);
                  }}
                  onChangeFlagCode={(flagCode) =>
                    setFieldValue(`answers[${index}].flagCode`, flagCode)
                  }
                  marginY={0.5}
                />
              ))}
              {errors.correctAnswer && (
                <Text
                  color="red.500"
                  fontSize="sm"
                  marginTop={2}
                  marginLeft={4}
                >
                  {"Please select a correct answer"}
                </Text>
              )}

              {errors.answers && (
                <Text
                  color="red.500"
                  fontSize="sm"
                  marginTop={2}
                  marginLeft={4}
                >
                  {"Please select a correct answer"}
                </Text>
              )}
            </Flex>

            <Flex width="100%" justifyContent="flex-end">
              <Button type="submit" colorScheme="green">
                {"Add Question"}
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
};

export default CommunityQuizQuestionForm;
