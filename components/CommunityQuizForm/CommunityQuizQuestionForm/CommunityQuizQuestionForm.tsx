import React, { FC, useState } from "react";
import { Button, Divider, Flex, FlexProps } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import * as Maps from "@geobuff/svg-maps";
import { flagCategories } from "@geobuff/flags";

import { QuizType } from "../../../types/quiz-type";
import RadioGroupFormField from "../../FormFields/RadioGroupFormField";
import CommunityQuizFormField from "../CommunityQuizFormField";
import SelectFormField from "../../FormFields/SelectFormField";
import CommunityQuizHasAnswersField from "../CommunityQuizHasAnswersField";
import CommunityQuizAnswersField from "../CommunityQuizAnswersField";
import CommunityQuizFlagSelectField from "../CommunityQuizFlagSelectField";

export interface Props extends FlexProps {
  // TODO: add type
  onSubmit?: (values: any) => void;
  types: QuizType[];
}

const CommunityQuizQuestionForm: FC<Props> = ({
  onSubmit,
  types = [],
  ...props
}) => {
  const [flagCategory, setFlagCategory] = useState("");
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

  const answers = [
    {
      label: "Answer One",
      value: 1,
    },
    {
      label: "Answer Two",
      value: 2,
    },
    {
      label: "Answer Three (Optional)",
      value: 3,
    },
    {
      label: "Answer Four (Optional)",
      value: 4,
    },
  ];

  return (
    <Flex width="100%" {...props}>
      <Formik
        onSubmit={onSubmit}
        initialValues={{
          typeId: "1",
          question: "",
          imageUrl: "",
          map: "",
          highlighted: "",
          answers: [],
        }}
      >
        {({ values, setFieldValue }) => (
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

            {values.typeId === "2" && (
              <CommunityQuizFormField
                name="imageUrl"
                label="Image URL"
                placeholder="Enter image url..."
                helper="Copyrighted images will be removed. We recommend sites such as pexels for free images."
              />
            )}

            {values.typeId === "3" && (
              <Flex>
                <SelectFormField
                  name="flagCategory"
                  label="Flag Category"
                  options={flagOptions}
                  onChange={({ target }) => {
                    // TODO: fix error
                    //@ts-ignore
                    setFlagCategory(target.value);
                    //@ts-ignore
                    setFieldValue("flagCode", "");
                  }}
                  width="100%"
                  marginRight={2}
                />
                <CommunityQuizFlagSelectField
                  flagCategory={flagCategory}
                  flagCode={values.flagCode}
                />
              </Flex>
            )}

            {values.typeId === "4" && (
              <Flex>
                <SelectFormField
                  name="map"
                  label="Map"
                  options={mapCategories}
                  width="50%"
                  marginRight={2}
                />
                <SelectFormField
                  name="highlighted"
                  label="Highlighted"
                  options={getHighlightRegionsByMap(values.map)}
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
                options={flagOptions}
                label="Flag Answer Category"
              />
            )}

            <Divider marginTop={8} marginBottom={4} />

            <Flex direction="column" width="100%" marginBottom={5}>
              {answers.map(({ label, value }) => (
                <CommunityQuizAnswersField
                  key={value}
                  label={label}
                  value={value}
                  isChecked={correctAnswer === value}
                  hasFlagAnswers={hasFlagAnswers}
                  onChange={(value) => setCorrectAnswer(value)}
                  marginY={0.5}
                />
              ))}
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
