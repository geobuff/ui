import React, { FC, useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as Maps from "@geobuff/svg-maps";
import { flagCategories } from "@geobuff/flags";

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
  Text,
  Radio,
  useRadioGroup,
  FormHelperText,
  Link,
  Select,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { getFlagUrl, flags } from "@geobuff/flags";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CountrySelect from "../CountrySelect";
import RadioButton from "../RadioButton";
import Image from "../Image";

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
  answerTwoText: Yup.string().required(
    "Please enter a value for answer two text."
  ),
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

const getFlagsByCategory = (category: string) => {
  if (category === "world") {
    return Object.keys(flags).filter((flag) => flag.length === 2);
  }

  return Object.keys(flags).filter(
    (flag) => flag.slice(0, 2) === category && flag.length !== 2
  );
};

// Accommodate the extra field needed to override the hasFlags radio
export interface EditValues extends CreateManualTriviaQuestionFormSubmit {
  hasFlagAnswers?: boolean;
}

export interface Props {
  editValues?: EditValues;
  types?: QuizType[];
  isSubmitting?: boolean;
  error?: string;
  isLoading?: boolean;
  isEditing?: boolean;
  onClose?: () => void;
  onSubmit?: (
    values: CreateManualTriviaQuestionFormSubmit,
    helpers: FormikHelpers<CreateManualTriviaQuestionFormSubmit>
  ) => void;
}

const AdminCreateManualTriviaQuestionForm: FC<Props> = ({
  editValues,
  types = [],
  isSubmitting = false,
  error = "",
  isLoading = false,
  isEditing = false,
  onSubmit = () => {},
  onClose = () => {},
}) => {
  const initialHasFlagAnswers = editValues?.hasFlagAnswers || false;

  const [hasFlagAnswers, setHasFlagAnswers] = useState(initialHasFlagAnswers);
  const [flagCategory, setFlagCategory] = useState("world");

  const getHighlightRegionsByMap = (map: string) => {
    const selectedMap = Maps[map];

    if (selectedMap !== undefined) {
      return selectedMap.paths.map(({ id, name }) => ({
        value: id,
        name,
      }));
    }
  };

  return (
    <>
      {error && (
        <Alert status="error" borderRadius={6} marginBottom={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Flex justifyContent="center">
        <Formik
          initialValues={
            editValues || {
              typeId: "1",
              question: "",
              quizDate: "",
              map: "",
              highlighted: "",
              flagCode: "",
              imageUrl: "",
              answerOneText: "",
              answerOneFlagCode: "",
              answerTwoText: "",
              answerTwoFlagCode: "",
              answerThreeText: "",
              answerThreeFlagCode: "",
              answerFourText: "",
              answerFourFlagCode: "",
              correctAnswer: null,
            }
          }
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ dirty, values, setFieldValue, errors }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { getRootProps, getRadioProps } = useRadioGroup({
              name: "typeId",
              value: values.typeId,
              onChange: (value: number) =>
                setFieldValue("typeId", value.toString()),
            });

            const radioGroup = getRootProps();

            return (
              <Box maxWidth="600px" width="100%">
                <Heading size="md">
                  {`${isEditing ? "Edit" : "Create"} Manual Trivia Question`}
                </Heading>
                <Divider marginY={5} />
                <Form autoComplete="off">
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
                                <Select {...field}>
                                  <option value="">{"Select a map..."}</option>
                                  {Object.keys(Maps).map((map) => (
                                    <option key={map} value={map}>
                                      {map
                                        .match(/[A-Z][a-z]+|[0-9]+/g)
                                        .join(" ")}
                                    </option>
                                  ))}
                                </Select>

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
                                <Select {...field}>
                                  <option value="">
                                    {"Select highlighted..."}
                                  </option>
                                  {getHighlightRegionsByMap(values.map)?.map(
                                    (region) => (
                                      <option
                                        key={region.value}
                                        value={region.value}
                                      >
                                        {`${region.value} - ${region.name}`}
                                      </option>
                                    )
                                  )}
                                </Select>
                                <FormHelperText lineHeight="1.50">
                                  {
                                    "Selecting a region will highlight it on the selected map. Leaving it blank will display the map without any highlighting."
                                  }
                                </FormHelperText>
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
                      <>
                        <Flex marginY={3}>
                          <FormControl>
                            <FormLabel htmlFor="flagCode" fontWeight="bold">
                              {"Flag Category"}
                            </FormLabel>
                            <Select
                              onChange={(e) => {
                                setFlagCategory(e.target.value);
                                setFieldValue("flagCode", "");
                              }}
                            >
                              <option>{"Select a category..."}</option>
                              {flagCategories.map(({ key, label }) => (
                                <option key={key} value={key}>
                                  {label}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        </Flex>
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

                                {flagCategory === "world" ? (
                                  <CountrySelect
                                    id="flagCode"
                                    fieldProps={field}
                                  />
                                ) : (
                                  <Select
                                    {...field}
                                    id="flagCode"
                                    icon={
                                      values.flagCode ? (
                                        <Image
                                          marginRight="16px"
                                          minHeight="22px"
                                          minWidth="32px"
                                          objectFit="cover"
                                          src={getFlagUrl(values.flagCode)}
                                          borderRadius={5}
                                        />
                                      ) : (
                                        <ChevronDownIcon stroke="black" />
                                      )
                                    }
                                  >
                                    <option value="">
                                      {"select a flag code..."}
                                    </option>
                                    {getFlagsByCategory(flagCategory).map(
                                      (category) => (
                                        <option key={category} value={category}>
                                          {category}
                                        </option>
                                      )
                                    )}
                                  </Select>
                                )}
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.flagCode}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      </>
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
                              <FormHelperText lineHeight="1.50">
                                {
                                  "Avoid images that are copyrighted or require attribution. Sites like"
                                }
                                <Link
                                  href="https://pixabay.com/"
                                  isExternal
                                  marginX={1}
                                  fontWeight="bold"
                                >
                                  {"pixabay"}
                                </Link>
                                {"are good for free commercial images."}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    )}

                    <Divider marginY={5} />

                    <Flex direction="row" marginBottom={5} flexWrap="wrap">
                      <Flex flex={1} direction="column" width="100%">
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
                        {hasFlagAnswers ? (
                          <Text color="gray.500" fontSize="sm" mt={2} mr={6}>
                            {"Use 2 letter country codes."}{" "}
                            <Link
                              href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements"
                              isExternal
                              fontWeight="bold"
                              color="gray.500"
                            >
                              {"You can find a list of codes here."}
                            </Link>
                          </Text>
                        ) : (
                          <Text color="gray.500" fontSize="sm" mt={2} mr={6}>
                            {"Enables answer buttons to contain flag images."}
                          </Text>
                        )}
                      </Flex>
                      <Flex
                        flex={1}
                        direction="column"
                        width="100%"
                        marginRight={5}
                      >
                        <FormLabel htmlFor="answerOneText" fontWeight="bold">
                          {"Appearance Date"}
                        </FormLabel>
                        <Field name="quizDate">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.answerOneFlagCode &&
                                form.touched.answerOneFlagCode
                              }
                            >
                              <DatePicker
                                {...field}
                                placeholderText="Select date..."
                                selected={
                                  (field.value && new Date(field.value)) || null
                                }
                                onChange={(value) => {
                                  setFieldValue(
                                    "quizDate",
                                    new Date(value).toISOString()
                                  );
                                }}
                              />
                              <Box position="absolute" top="38px" left="2px">
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.quizDate}
                                </FormErrorMessage>
                              </Box>
                              <FormHelperText lineHeight="1.50">
                                {
                                  "Selecting a date will schedule the question to appear on that day. Leaving the field blank will add the question to the random question pool."
                                }
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>
                    </Flex>

                    <Divider marginY={5} />

                    <FormLabel htmlFor="answerOneText" fontWeight="bold">
                      {"Answer One"}
                    </FormLabel>
                    <Flex marginTop={3} marginBottom={7}>
                      <Radio
                        value={1}
                        isChecked={values.correctAnswer === 1}
                        onChange={() => {
                          setFieldValue("correctAnswer", 1);
                        }}
                        colorScheme="green"
                        marginRight={3}
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
                                  background={
                                    values.correctAnswer === 1
                                      ? "green.100"
                                      : "#F6F6F6"
                                  }
                                  borderRadius={6}
                                  _placeholder={{ color: "gray.500" }}
                                  _hover={{ background: "#e0e0e0" }}
                                />
                                <Box position="absolute" top="38px" left="2px">
                                  <FormErrorMessage fontSize="11px">
                                    {form.errors.answerOneFlagCode}
                                  </FormErrorMessage>
                                </Box>
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
                            <Box position="absolute" top="42px" left="2px">
                              <FormErrorMessage fontSize="11px">
                                {form.errors.answerOneText}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <FormLabel htmlFor="answerTwoText" fontWeight="bold">
                      {"Answer Two"}
                    </FormLabel>
                    <Flex marginTop={3} marginBottom={7}>
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
                                  background={
                                    values.correctAnswer === 2
                                      ? "green.100"
                                      : "#F6F6F6"
                                  }
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
                            <Box position="absolute" top="42px" left="2px">
                              <FormErrorMessage fontSize="11px">
                                {form.errors.answerTwoText}
                              </FormErrorMessage>
                            </Box>
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <FormLabel htmlFor="answerThreeText" fontWeight="bold">
                      {"Answer Three (Optional)"}
                    </FormLabel>
                    <Flex marginTop={3} marginBottom={7}>
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
                                  background={
                                    values.correctAnswer === 3
                                      ? "green.100"
                                      : "#F6F6F6"
                                  }
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
                    <Flex marginTop={3}>
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
                                  background={
                                    values.correctAnswer === 4
                                      ? "green.100"
                                      : "#F6F6F6"
                                  }
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
                            {form.touched.correctAnswer &&
                              errors.correctAnswer && (
                                <Text
                                  color="red.500"
                                  marginTop={3}
                                  marginLeft={1.5}
                                >
                                  {errors.correctAnswer}
                                </Text>
                              )}
                          </FormControl>
                        )}
                      </Field>
                    </Flex>

                    <Flex justifyContent="flex-end">
                      <Flex direction="row" marginTop="44px" marginBottom={6}>
                        {onClose && (
                          <Button
                            variant="outline"
                            width="100%"
                            isLoading={isLoading}
                            isDisabled={isLoading || isSubmitting}
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
                          isLoading={isLoading}
                          disabled={!dirty || isLoading || isSubmitting}
                        >
                          {isEditing ? "Update" : "Create"}
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
