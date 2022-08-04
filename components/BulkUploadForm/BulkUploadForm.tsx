import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Papa from "papaparse";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  useRadioGroup,
  VStack,
  Input,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";

import RadioButton from "../RadioButton";

import { BulkUploadValues } from "../../types/bulk-upload-values";
import { BulkUploadType, BulkUploadTypes } from "../../types/bulk-upload-type";
import TrueFalseFormField from "../FormFields/TrueFalseFormField";
import { validateBulkUploadCsvHeaders } from "../../helpers/csv";
import { getTriviaQuestionTypeId } from "../../helpers/trivia-question-type";
import { ManualTriviaQuestionPayload } from "../../types/manual-trivia-payload";
import { TriviaQuestionTypeValues } from "../../types/trivia-question-types";

const validationSchema = Yup.object().shape({
  typeId: Yup.string().required("Please select an upload type."),
  name: Yup.string().when("typeId", {
    is: BulkUploadType.CommunityQuiz,
    then: Yup.string().required("Must include name for community quiz upload."),
  }),
  description: Yup.string().when("typeId", {
    is: BulkUploadType.CommunityQuiz,
    then: Yup.string().required(
      "Must include description for community quiz upload."
    ),
  }),
  isPublic: Yup.string().when("typeId", {
    is: BulkUploadType.CommunityQuiz,
    then: Yup.string().required(
      "Must choose is public for community quiz upload."
    ),
  }),
});

export interface Props {
  isSubmitting?: boolean;
  error?: string;
  setError?: (value: string) => void;
  onClose?: () => void;
  onSubmit?: (values: BulkUploadValues) => void;
}

const BulkUploadForm: FC<Props> = ({
  isSubmitting = false,
  error = "",
  setError = (): void => {},
  onSubmit = () => {},
  onClose = () => {},
}) => {
  const onTriviaFileSelect = (event: any, setFieldValue: any) => {
    setError("");
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const error = validateBulkUploadCsvHeaders(results.data[0]);
        if (error) {
          setError(error);
          return;
        }

        setFieldValue(
          "questions",
          results.data.map((x) => {
            const typeId = getTriviaQuestionTypeId(x["Type"], setError);
            const answers = x["Answers"].split(", ");
            const correctAnswer = x["Correct"].trim();

            const result: ManualTriviaQuestionPayload = {
              typeId: typeId,
              categoryId: parseInt(x["Category"]),
              question: x["Question"],
              explainer: x["Explainer"],
              quizDate: {
                Time: new Date(),
                Valid: false,
              },
              answers: answers.map((a) => {
                const text = a.trim();
                return {
                  text: text,
                  isCorrect: text.toLowerCase() === correctAnswer.toLowerCase(),
                };
              }),
            };

            if (typeId === TriviaQuestionTypeValues.Image) {
              result.imageUrl = x["Resource"];
              result.imageAttributeName = x["ImageAttributeName"];
              result.imageAttributeUrl = x["ImageAttributeUrl"];
              result.imageWidth = parseInt(x["ImageWidth"]);
              result.imageHeight = parseInt(x["ImageHeight"]);
              result.imageAlt = x["ImageAlt"];
            } else if (typeId === TriviaQuestionTypeValues.Flag) {
              result.flagCode = x["Resource"];
            } else if (typeId === TriviaQuestionTypeValues.Map) {
              result.map = x["Resource"];
            }

            return result;
          })
        );
      },
    });
  };

  return (
    <>
      <VStack>
        {error && (
          <Alert status="error" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Flex justifyContent="center">
          <Formik
            initialValues={{
              typeId: "1",
              name: "",
              description: "",
              isPublic: "true",
              questions: [],
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const {
                getRootProps: getTypeRootProps,
                getRadioProps: getTypeRadioProps,
              } = useRadioGroup({
                name: "typeId",
                value: values.typeId,
                onChange: (value: string) => setFieldValue("typeId", value),
              });

              const typeRadioGroup = getTypeRootProps();

              return (
                <Box maxWidth="600px" width="100%">
                  <Heading fontSize="22px">{`Bulk Upload`}</Heading>
                  <Divider marginY={5} />
                  <Form autoComplete="off">
                    <Flex direction="column">
                      <Flex marginBottom={3}>
                        <Field name="typeId">
                          {({ form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.typeId && form.touched.typeId
                              }
                            >
                              <FormLabel htmlFor="typeId" fontWeight="bold">
                                {"Type"}
                              </FormLabel>
                              <HStack
                                spacing={3}
                                minHeight="50px"
                                {...typeRadioGroup}
                              >
                                {BulkUploadTypes.map((type) => {
                                  const radio = getTypeRadioProps({
                                    value: type.id.toString(),
                                  });
                                  return (
                                    <RadioButton
                                      key={type.id}
                                      radioProps={radio}
                                      color="teal"
                                    >
                                      {type.name}
                                    </RadioButton>
                                  );
                                })}
                              </HStack>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Divider marginY={5} />

                      <Flex mb={3}>
                        <FormControl>
                          <FormLabel htmlFor="questions" fontWeight="bold">
                            {"Questions"}
                          </FormLabel>
                          <Input
                            type="file"
                            name="file"
                            accept=".csv"
                            onChange={(event) =>
                              onTriviaFileSelect(event, setFieldValue)
                            }
                          />
                        </FormControl>
                      </Flex>

                      {values.typeId ===
                        BulkUploadType.CommunityQuiz.toString() && (
                        <>
                          <Flex my={3}>
                            <Field name="name">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.name && form.touched.name
                                  }
                                >
                                  <FormLabel htmlFor="name" fontWeight="bold">
                                    {"Name"}
                                  </FormLabel>
                                  <Input
                                    {...field}
                                    id="name"
                                    type="text"
                                    placeholder="Enter name..."
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                  />
                                  <FormErrorMessage fontSize="11px">
                                    {form.errors.name}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Flex>

                          <Flex my={3}>
                            <Field name="description">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.description &&
                                    form.touched.description
                                  }
                                >
                                  <FormLabel
                                    htmlFor="description"
                                    fontWeight="bold"
                                  >
                                    {"Description"}
                                  </FormLabel>
                                  <Input
                                    {...field}
                                    id="description"
                                    type="text"
                                    placeholder="Enter description..."
                                    size="lg"
                                    fontSize="16px"
                                    fontWeight={400}
                                    background="#F6F6F6"
                                    borderRadius={6}
                                    _placeholder={{ color: "gray.500" }}
                                    _hover={{ background: "#e0e0e0" }}
                                  />
                                  <FormErrorMessage fontSize="11px">
                                    {form.errors.description}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </Flex>

                          <Flex marginY={3}>
                            <Field name="isPublic">
                              {({ form }): React.ReactNode => (
                                <FormControl
                                  isInvalid={
                                    form.errors.isPublic &&
                                    form.touched.isPublic
                                  }
                                >
                                  <TrueFalseFormField
                                    name={"isPublic"}
                                    label={"Is Public?"}
                                    selectedValue={values.isPublic}
                                    setFieldHelper={setFieldValue}
                                    color="teal"
                                  />
                                </FormControl>
                              )}
                            </Field>
                          </Flex>
                        </>
                      )}

                      <Flex justifyContent="flex-end">
                        <Flex direction="row" marginTop="44px" marginBottom={6}>
                          {onClose && (
                            <Button
                              variant="outline"
                              width="100%"
                              isDisabled={isSubmitting}
                              onClick={onClose}
                              marginRight={3}
                            >
                              {"Close"}
                            </Button>
                          )}
                          <Button
                            colorScheme="teal"
                            width="100%"
                            type="submit"
                            disabled={
                              isSubmitting || values.questions.length === 0
                            }
                          >
                            {"Submit"}
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Form>
                </Box>
              );
            }}
          </Formik>
        </Flex>
      </VStack>
    </>
  );
};

export default BulkUploadForm;
