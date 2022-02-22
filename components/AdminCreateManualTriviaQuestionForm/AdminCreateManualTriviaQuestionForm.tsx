import React, { FC, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

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
  Input,
  Radio,
  useRadioGroup,
} from "@chakra-ui/react";

import RadioButton from "../RadioButton";

import {
  CreateManualTriviaQuestionFormSubmit,
  QuestionType,
} from "../../types/create-manual-trivia-question-form-submit";
import { QuizType } from "../../types/quiz-type";

const validationSchema = Yup.object().shape({
  typeId: Yup.string().required("Please select a quiz type."),
  question: Yup.string().required("Please enter a value for question."),
  answerOneText: Yup.string().required(
    "Please enter a value for answer one text."
  ),
  answerOneIsCorrect: Yup.string().required(
    "Please select a value for answer one is correct."
  ),
  answerTwoText: Yup.string().required(
    "Please enter a value for answer two text."
  ),
  answerTwoIsCorrect: Yup.string().required(
    "Please select a value for answer two is correct."
  ),
  correctAnswer: Yup.number()
    .required("Please select a correct answer")
    .typeError("Please select a correct answer"),
});

export interface Props {
  types?: QuizType[];
  isSubmitting?: boolean;
  error?: string;
  isLoading?: boolean;
  onSubmit?: (values: CreateManualTriviaQuestionFormSubmit) => void;
}

const AdminCreateManualTriviaQuestionForm: FC<Props> = ({
  types = [],
  isSubmitting = false,
  error = "",
  isLoading = false,
  onSubmit = () => {},
}) => {
  const [hasFlagAnswers, setHasFlagAnswers] = useState(false);
  return (
    <>
      {error && (
        <Alert status="error" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Flex
        margin={6}
        padding={12}
        background="white"
        borderRadius={12}
        justifyContent="center"
      >
        <Formik
          initialValues={{
            typeId: "1",
            question: "",
            map: "",
            highlighted: "",
            flagCode: "",
            imageUrl: "",
            answerOneText: "",
            answerOneIsCorrect: "false",
            answerOneFlagCode: "",
            answerTwoText: "",
            answerTwoIsCorrect: "false",
            answerTwoFlagCode: "",
            answerThreeText: "",
            answerThreeIsCorrect: "false",
            answerThreeFlagCode: "",
            answerFourText: "",
            answerFourIsCorrect: "false",
            answerFourFlagCode: "",
            correctAnswer: null,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ dirty, values, setFieldValue, errors }) => {
            console.log(values.correctAnswer, "values");
            console.log(errors, "errors");
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { getRootProps, getRadioProps } = useRadioGroup({
              name: "typeId",
              defaultValue: "1",
              onChange: (value: number) =>
                setFieldValue("typeId", value.toString()),
            });

            const radioGroup = getRootProps();

            return (
              <Box maxWidth="600px" width="100%">
                <Heading size="md">{"Create Manual Trivia Question"}</Heading>
                <Divider marginY={5} />
                <Form>
                  <Flex direction="column">
                    <Field name="typeId">
                      {({ form }) => (
                        <FormControl
                          isInvalid={form.errors.typeId && form.touched.typeId}
                        >
                          <FormLabel htmlFor="typeId" fontWeight="bold">
                            {"Type"}
                          </FormLabel>
                          <HStack spacing={3} name="typeId" {...radioGroup}>
                            {types.map((type) => {
                              //@ts-expect-error
                              const radio = getRadioProps({
                                value: type.id.toString(),
                              });
                              return (
                                <RadioButton key={type.id} radioProps={radio}>
                                  {type.name}
                                </RadioButton>
                              );
                            })}
                          </HStack>
                        </FormControl>
                      )}
                    </Field>

                    <Divider marginY={5} />

                    <Flex>
                      <Field name="question">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.question && form.touched.question
                            }
                          >
                            <FormLabel htmlFor="question" fontWeight="bold">
                              {"Question"}
                            </FormLabel>
                            <Input
                              {...field}
                              id="question"
                              type="text"
                              placeholder="Enter question..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background="#F6F6F6"
                              borderRadius={6}
                              _placeholder={{ color: "gray.500" }}
                              _hover={{ background: "#e0e0e0" }}
                            />
                            <FormErrorMessage fontSize="11px">
                              {form.errors.question}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    {values.typeId === QuestionType.Map.toString() && (
                      <>
                        <Flex marginY={3}>
                          <Field name="map">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={form.errors.map && form.touched.map}
                              >
                                <FormLabel htmlFor="map" fontWeight="bold">
                                  {"Map"}
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="map"
                                  type="text"
                                  placeholder="Enter map..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background="#F6F6F6"
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                />
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.map}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>

                        <Flex marginY={3}>
                          <Field name="highlighted">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.highlighted &&
                                  form.touched.highlighted
                                }
                              >
                                <FormLabel
                                  htmlFor="highlighted"
                                  fontWeight="bold"
                                >
                                  {"Highlighted"}
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="highlighted"
                                  type="text"
                                  placeholder="Enter highlighted..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background="#F6F6F6"
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                />
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.highlighted}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      </>
                    )}

                    {values.typeId === QuestionType.Flag.toString() && (
                      <Flex marginY={3}>
                        <Field name="flagCode">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.flagCode && form.touched.flagCode
                              }
                            >
                              <FormLabel htmlFor="flagCode" fontWeight="bold">
                                {"Flag Code"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="flagCode"
                                type="text"
                                placeholder="Enter flag code..."
                                size="lg"
                                fontSize="16px"
                                fontWeight={400}
                                background="#F6F6F6"
                                borderRadius={6}
                                _placeholder={{ color: "gray.500" }}
                                _hover={{ background: "#e0e0e0" }}
                              />
                              <FormErrorMessage fontSize="11px">
                                {form.errors.flagCode}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    )}

                    {values.typeId === QuestionType.Image.toString() && (
                      <Flex marginY={3}>
                        <Field name="imageUrl">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.imageUrl && form.touched.imageUrl
                              }
                            >
                              <FormLabel htmlFor="imageUrl" fontWeight="bold">
                                {"Image URL"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="imageUrl"
                                type="text"
                                placeholder="Enter image URL..."
                                size="lg"
                                fontSize="16px"
                                fontWeight={400}
                                background="#F6F6F6"
                                borderRadius={6}
                                _placeholder={{ color: "gray.500" }}
                                _hover={{ background: "#e0e0e0" }}
                              />
                              <FormErrorMessage fontSize="11px">
                                {form.errors.imageUrl}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    )}

                    <Divider marginY={5} />

                    <Heading size="md" marginBottom={5}>
                      {"Answers"}
                    </Heading>

                    <Flex direction="column" marginBottom={2}>
                      <FormLabel htmlFor="answerOneText" fontWeight="bold">
                        {"Do answers have flags?"}
                      </FormLabel>

                      <HStack spacing={3}>
                        <RadioButton
                          radioProps={{
                            isChecked: !hasFlagAnswers,
                            onChange: () => setHasFlagAnswers(false),
                          }}
                        >
                          {"No"}
                        </RadioButton>
                        <RadioButton
                          radioProps={{
                            isChecked: hasFlagAnswers,
                            onChange: () => setHasFlagAnswers(true),
                          }}
                        >
                          {"Yes"}
                        </RadioButton>
                      </HStack>
                    </Flex>

                    <Divider marginY={5} />

                    <FormLabel htmlFor="answerOneText" fontWeight="bold">
                      {"Answer One"}
                    </FormLabel>
                    <Flex marginY={3}>
                      <Radio
                        value={1}
                        isChecked={values.correctAnswer === 1}
                        mr={3}
                        onChange={() => {
                          setFieldValue("correctAnswer", 1);
                        }}
                        colorScheme="green"
                      />
                      {hasFlagAnswers && (
                        <Flex maxWidth="150px">
                          <Field name="answerOneFlagCode">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.answerOneFlagCode &&
                                  form.touched.answerOneFlagCode
                                }
                              >
                                <Input
                                  {...field}
                                  id="answerOneFlagCode"
                                  type="text"
                                  placeholder="Flag code..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background={"#F6F6F6"}
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                />
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.answerOneFlagCode}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      )}

                      <Field name="answerOneText">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.answerOneText &&
                              form.touched.answerOneText
                            }
                          >
                            <Input
                              {...field}
                              width="100%"
                              id="answerOneText"
                              type="text"
                              placeholder="Answer text..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background={
                                values.correctAnswer === 1
                                  ? "green.100"
                                  : "#F6F6F6"
                              }
                              borderRadius={6}
                              ml={hasFlagAnswers ? 3 : 0}
                              _placeholder={{ color: "gray.500" }}
                              _hover={{ background: "#e0e0e0" }}
                            />
                            <FormErrorMessage fontSize="11px">
                              {form.errors.answerOneText}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <FormLabel htmlFor="answerTwoText" fontWeight="bold">
                      {"Answer Two"}
                    </FormLabel>
                    <Flex marginY={3}>
                      <Radio
                        value={2}
                        isChecked={values.correctAnswer === 2}
                        onChange={() => {
                          setFieldValue("correctAnswer", 2);
                        }}
                        colorScheme="green"
                        marginRight={3}
                      />
                      {hasFlagAnswers && (
                        <Flex maxWidth="150px">
                          <Field name="answerTwoFlagCode">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.answerTwoFlagCode &&
                                  form.touched.answerTwoFlagCode
                                }
                              >
                                <Input
                                  {...field}
                                  id="answerTwoFlagCode"
                                  type="text"
                                  placeholder="Flag code..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background="#F6F6F6"
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                />
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.answerTwoFlagCode}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      )}
                      <Field name="answerTwoText">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.answerTwoText &&
                              form.touched.answerTwoText
                            }
                          >
                            <Input
                              {...field}
                              width="100%"
                              id="answerTwoText"
                              type="text"
                              placeholder="Answer text..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background={
                                values.correctAnswer === 2
                                  ? "green.100"
                                  : "#F6F6F6"
                              }
                              borderRadius={6}
                              ml={hasFlagAnswers ? 3 : 0}
                              _placeholder={{ color: "gray.500" }}
                              _hover={{ background: "#e0e0e0" }}
                            />
                            <FormErrorMessage fontSize="11px">
                              {form.errors.answerTwoText}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <FormLabel htmlFor="answerThreeText" fontWeight="bold">
                      {"Answer Three (Optional)"}
                    </FormLabel>
                    <Flex marginY={3}>
                      <Radio
                        value={3}
                        isChecked={values.correctAnswer === 3}
                        onChange={() => setFieldValue("correctAnswer", 3)}
                        colorScheme="green"
                        marginRight={3}
                      />
                      {hasFlagAnswers && (
                        <Flex maxWidth="150px">
                          <Field name="answerThreeFlagCode">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.answerThreeFlagCode &&
                                  form.touched.answerThreeFlagCode
                                }
                              >
                                <Input
                                  {...field}
                                  id="answerThreeFlagCode"
                                  type="text"
                                  placeholder="Flag code..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background="#F6F6F6"
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                />
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.answerThreeFlagCode}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      )}

                      <Field name="answerThreeText">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.answerThreeText &&
                              form.touched.answerThreeText
                            }
                          >
                            <Input
                              {...field}
                              width="100%"
                              id="answerThreeText"
                              type="text"
                              placeholder="Answer text..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background={
                                values.correctAnswer === 3
                                  ? "green.100"
                                  : "#F6F6F6"
                              }
                              borderRadius={6}
                              ml={hasFlagAnswers ? 3 : 0}
                              _placeholder={{ color: "gray.500" }}
                              _hover={{ background: "#e0e0e0" }}
                            />
                            <FormErrorMessage fontSize="11px">
                              {form.errors.answerThreeText}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <FormLabel htmlFor="answerFourText" fontWeight="bold">
                      {"Answer Four (Optional)"}
                    </FormLabel>
                    <Flex marginY={3}>
                      <Radio
                        value={4}
                        isChecked={values.correctAnswer === 4}
                        onChange={() => setFieldValue("correctAnswer", 4)}
                        colorScheme="green"
                        marginRight={3}
                      />
                      {hasFlagAnswers && (
                        <Flex maxWidth="150px">
                          <Field name="answerFourFlagCode">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.answerFourFlagCode &&
                                  form.touched.answerFourFlagCode
                                }
                              >
                                <Input
                                  {...field}
                                  id="answerFourFlagCode"
                                  type="text"
                                  placeholder="Flag code..."
                                  size="lg"
                                  fontSize="16px"
                                  fontWeight={400}
                                  background="#F6F6F6"
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                />
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.answerFourFlagCode}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      )}

                      <Field name="answerFourText">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.answerFourText &&
                              form.touched.answerFourText
                            }
                          >
                            <Input
                              {...field}
                              width="100%"
                              id="answerFourText"
                              type="text"
                              placeholder="Answer text..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background={
                                values.correctAnswer === 4
                                  ? "green.100"
                                  : "#F6F6F6"
                              }
                              borderRadius={6}
                              ml={hasFlagAnswers ? 3 : 0}
                              _placeholder={{ color: "gray.500" }}
                              _hover={{ background: "#e0e0e0" }}
                            />
                            <FormErrorMessage fontSize="11px">
                              {form.errors.answerFourText}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <Flex justifyContent="flex-end">
                      <Flex direction="row" marginTop="44px" marginBottom={6}>
                        <Button
                          colorScheme="teal"
                          width="100%"
                          type="submit"
                          isLoading={isLoading}
                          disabled={!dirty || isLoading || isSubmitting}
                        >
                          {"Create"}
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
    </>
  );
};

export default AdminCreateManualTriviaQuestionForm;
