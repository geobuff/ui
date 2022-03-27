import React, { FC, useState } from "react";
import { Button, Divider, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import * as Maps from "@geobuff/svg-maps";
import { flagCategories } from "@geobuff/flags";

import { QuizType } from "../../../types/quiz-type";
import RadioGroupFormField from "../../FormFields/RadioGroupFormField";
import CommunityQuizFormField from "../CommunityQuizFormField";
import SelectFormField from "../../FormFields/SelectFormField";

export interface Props {
  // TODO: add type
  onSubmit?: (values: any) => void;
  types: QuizType[];
}

const CommunityQuizQuestionForm: FC<Props> = ({ onSubmit, types = [] }) => {
  const [flagCategory, setFlagCategory] = useState("world");

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

  return (
    <Flex justifyContent="center" width="100%">
      <Formik onSubmit={onSubmit} initialValues={{ typeId: "1" }}>
        {({ values, setFieldValue }) => (
          <Form autoComplete="off">
            <CommunityQuizFormField
              name="question"
              label="Question"
              placeholder="Enter question..."
            />
            <Divider marginY={5} />

            <RadioGroupFormField
              name="typeId"
              label="Type"
              onChange={(value) => setFieldValue("typeId", value)}
              selectedValue={values.typeId}
              options={options}
            />

            <Divider marginY={5} />

            {values.typeId === "2" && (
              <CommunityQuizFormField
                name="imageUrl"
                label="Image URL"
                placeholder="Enter image url..."
                helper="Avoid images that are copyrighted or require attribution. Sites like pixabay are good for free commercial images."
              />
            )}

            {values.typeId === "3" && (
              <Flex>
                <SelectFormField
                  label="Flag Category"
                  options={flagOptions}
                  onChange={({ target }) => setFlagCategory(target.value)}
                  width="50%"
                  marginRight={2}
                />
                <SelectFormField
                  name="flagCode"
                  label="Flag"
                  options={getHighlightRegionsByMap(values.map)}
                  width="50%"
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
