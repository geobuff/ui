import React, { FC } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { QuizType } from "../../types/quiz-type";
import { CreateManualTriviaQuestionFormSubmit } from "../../types/create-manual-trivia-question-form-submit";

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
  onSubmit = (values: CreateManualTriviaQuestionFormSubmit): void => {},
}) => (
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
          typeId: "",
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
        {({ dirty }): React.ReactNode => (
          <Box minWidth="50%">
            <Form>
              <Flex direction="column" marginX={{ base: 1, md: 6 }}>
                <Flex marginTop={6} marginBottom={3}>
                  <Field name="typeId">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.typeId && form.touched.typeId}
                      >
                        <FormLabel htmlFor="typeId" fontWeight="bold">
                          {"Type"}
                        </FormLabel>
                        <Select {...field}>
                          <option value="" disabled>
                            Select a type...
                          </option>
                          {types.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Select>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.typeId}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="question">
                    {({ field, form }): React.ReactNode => (
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.question}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="map">
                    {({ field, form }): React.ReactNode => (
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.map}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="highlighted">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.highlighted && form.touched.highlighted
                        }
                      >
                        <FormLabel htmlFor="highlighted" fontWeight="bold">
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.highlighted}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="flagCode">
                    {({ field, form }): React.ReactNode => (
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.flagCode}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="imageUrl">
                    {({ field, form }): React.ReactNode => (
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.imageUrl}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerOneText">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.answerOneText &&
                          form.touched.answerOneText
                        }
                      >
                        <FormLabel htmlFor="answerOneText" fontWeight="bold">
                          {"Answer One"}
                        </FormLabel>
                        <Input
                          {...field}
                          id="answerOneText"
                          type="text"
                          placeholder="Enter answer one text..."
                          size="lg"
                          fontSize="16px"
                          fontWeight={400}
                          background="#F6F6F6"
                          borderRadius={6}
                          _placeholder={{ color: "gray.500" }}
                          _hover={{ background: "#e0e0e0" }}
                        />
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerOneText}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerOneFlagCode">
                    {({ field, form }): React.ReactNode => (
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
                          placeholder="Enter answer one flag code..."
                          size="lg"
                          fontSize="16px"
                          fontWeight={400}
                          background="#F6F6F6"
                          borderRadius={6}
                          _placeholder={{ color: "gray.500" }}
                          _hover={{ background: "#e0e0e0" }}
                        />
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerOneFlagCode}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerOneIsCorrect">
                    {({ field, form }): React.ReactNode => (
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
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.answerTwoText &&
                          form.touched.answerTwoText
                        }
                      >
                        <FormLabel htmlFor="answerTwoText" fontWeight="bold">
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerTwoText}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerTwoFlagCode">
                    {({ field, form }): React.ReactNode => (
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerTwoFlagCode}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerTwoIsCorrect">
                    {({ field, form }): React.ReactNode => (
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
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.answerThreeText &&
                          form.touched.answerThreeText
                        }
                      >
                        <FormLabel htmlFor="answerThreeText" fontWeight="bold">
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerThreeText}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerThreeFlagCode">
                    {({ field, form }): React.ReactNode => (
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerThreeFlagCode}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerThreeIsCorrect">
                    {({ field, form }): React.ReactNode => (
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
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.answerFourText &&
                          form.touched.answerFourText
                        }
                      >
                        <FormLabel htmlFor="answerFourText" fontWeight="bold">
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerFourText}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerFourFlagCode">
                    {({ field, form }): React.ReactNode => (
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
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.answerFourFlagCode}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="answerFourIsCorrect">
                    {({ field, form }): React.ReactNode => (
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
                </Flex>

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
        )}
      </Formik>
    </Flex>
  </>
);

export default AdminCreateManualTriviaQuestionForm;
