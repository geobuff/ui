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
import { QuizType } from "../../types/quiz-type";

import { CreateManualTriviaQuestionFormSubmit } from "../../types/create-manual-trivia-question-form-submit";
import RadioButton from "../RadioButton";

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
});

enum QuestionType {
  Text = 1,
  Image = 2,
  Flag = 3,
  Map = 4,
}

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
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ dirty, values, setFieldValue }) => {
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
                      <Radio name="answerOneIsCorrect" value="true" mr={3} />
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
                                  background="#F6F6F6"
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
                              background="#F6F6F6"
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

                    <FormLabel htmlFor="answerOneText" fontWeight="bold">
                      {"Answer Two"}
                    </FormLabel>
                    <Flex marginY={3}>
                      <Radio name="answerOneIsCorrect" value="true" mr={3} />
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
                                  background="#F6F6F6"
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
                              background="#F6F6F6"
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

                    <FormLabel htmlFor="answerOneText" fontWeight="bold">
                      {"Answer Three (Optional)"}
                    </FormLabel>
                    <Flex marginY={3}>
                      <Radio name="answerOneIsCorrect" value="true" mr={3} />
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
                                  background="#F6F6F6"
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
                              background="#F6F6F6"
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

                    <FormLabel htmlFor="answerOneText" fontWeight="bold">
                      {"Answer Four (Optional)"}
                    </FormLabel>
                    <Flex marginY={3}>
                      <Radio name="answerOneIsCorrect" value="true" mr={3} />
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
                                  background="#F6F6F6"
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
                              background="#F6F6F6"
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

                    {/* <Flex marginY={3}>
                      <Field name="answerOneIsCorrect">
                        {({ field, form }) => (
                          <RadioGroup
                            {...field}
                            id="answerOneIsCorrect"
                            value={form.values.answerOneIsCorrect}
                            onChange={(value) =>
                              (form.values.answerOneIsCorrect = value)
                            }
                          >
                            <FormLabel>
                              <Radio
                                name="answerOneIsCorrect"
                                value="true"
                                mr={3}
                              />
                              {"True"}
                            </FormLabel>
                            <FormLabel>
                              <Radio
                                name="answerOneIsCorrect"
                                value="false"
                                mr={3}
                              />
                              {"False"}
                            </FormLabel>
                          </RadioGroup>
                        )}
                      </Field>
                    </Flex>

                    <Flex marginY={3}>
                      <Field name="answerTwoText">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.answerTwoText &&
                              form.touched.answerTwoText
                            }
                          >
                            <FormLabel
                              htmlFor="answerTwoText"
                              fontWeight="bold"
                            >
                              {"Answer Two"}
                            </FormLabel>
                            <Input
                              {...field}
                              id="answerTwoText"
                              type="text"
                              placeholder="Enter answer two text..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background="#F6F6F6"
                              borderRadius={6}
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

                    <Flex marginY={3}>
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
                              placeholder="Enter answer two flag code..."
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

                    <Flex marginY={3}>
                      <Field name="answerTwoIsCorrect">
                        {({ field, form }) => (
                          <RadioGroup
                            {...field}
                            id="answerTwoIsCorrect"
                            value={form.values.answerTwoIsCorrect}
                            onChange={(value) =>
                              (form.values.answerTwoIsCorrect = value)
                            }
                          >
                            <FormLabel>
                              <Radio
                                name="answerTwoIsCorrect"
                                value="true"
                                mr={3}
                              />
                              {"True"}
                            </FormLabel>
                            <FormLabel>
                              <Radio
                                name="answerTwoIsCorrect"
                                value="false"
                                mr={3}
                              />
                              {"False"}
                            </FormLabel>
                          </RadioGroup>
                        )}
                      </Field>
                    </Flex>

                    <Flex marginY={3}>
                      <Field name="answerThreeText">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.answerThreeText &&
                              form.touched.answerThreeText
                            }
                          >
                            <FormLabel
                              htmlFor="answerThreeText"
                              fontWeight="bold"
                            >
                              {"Answer Three"}
                            </FormLabel>
                            <Input
                              {...field}
                              id="answerThreeText"
                              type="text"
                              placeholder="Enter answer three text..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background="#F6F6F6"
                              borderRadius={6}
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

                    <Flex marginY={3}>
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
                              placeholder="Enter answer three flag code..."
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

                    <Flex marginY={3}>
                      <Field name="answerThreeIsCorrect">
                        {({ field, form }) => (
                          <RadioGroup
                            {...field}
                            id="answerThreeIsCorrect"
                            value={form.values.answerThreeIsCorrect}
                            onChange={(value) =>
                              (form.values.answerThreeIsCorrect = value)
                            }
                          >
                            <FormLabel>
                              <Radio
                                name="answerThreeIsCorrect"
                                value="true"
                                mr={3}
                              />
                              {"True"}
                            </FormLabel>
                            <FormLabel>
                              <Radio
                                name="answerThreeIsCorrect"
                                value="false"
                                mr={3}
                              />
                              {"False"}
                            </FormLabel>
                          </RadioGroup>
                        )}
                      </Field>
                    </Flex>

                    <Flex marginY={3}>
                      <Field name="answerFourText">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.answerFourText &&
                              form.touched.answerFourText
                            }
                          >
                            <FormLabel
                              htmlFor="answerFourText"
                              fontWeight="bold"
                            >
                              {"Answer Four"}
                            </FormLabel>
                            <Input
                              {...field}
                              id="answerFourText"
                              type="text"
                              placeholder="Enter answer four text..."
                              size="lg"
                              fontSize="16px"
                              fontWeight={400}
                              background="#F6F6F6"
                              borderRadius={6}
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

                    <Flex marginY={3}>
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
                              placeholder="Enter answer four flag code..."
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

                    <Flex marginY={3}>
                      <Field name="answerFourIsCorrect">
                        {({ field, form }) => (
                          <RadioGroup
                            {...field}
                            id="answerFourIsCorrect"
                            value={form.values.answerFourIsCorrect}
                            onChange={(value) =>
                              (form.values.answerFourIsCorrect = value)
                            }
                          >
                            <FormLabel>
                              <Radio
                                name="answerFourIsCorrect"
                                value="true"
                                mr={3}
                              />
                              {"True"}
                            </FormLabel>
                            <FormLabel>
                              <Radio
                                name="answerFourIsCorrect"
                                value="false"
                                mr={3}
                              />
                              {"False"}
                            </FormLabel>
                          </RadioGroup>
                        )}
                      </Field>
                    </Flex> */}

                    <Flex justifyContent="flex-end">
                      <Flex
                        direction="row"
                        marginTop="44px"
                        marginBottom={6}
                        marginRight={{ base: 0, md: 6 }}
                      >
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
