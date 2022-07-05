import React, { FC, useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import * as Maps from "@geobuff/svg-maps";
import { flagCategories, getFlagUrl } from "@geobuff/flags";
import { debounce } from "throttle-debounce";

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
  VStack,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import CountrySelect from "../CountrySelect";
import RadioButton from "../RadioButton";
import Image from "../Image";

import {
  ManualTriviaQuestionFormSubmit,
  QuestionType,
} from "../../types/manual-trivia-question-form-submit";
import { QuizType } from "../../types/quiz-type";
import { ManualTriviaQuestionEditValues } from "../../types/manual-trivia-question-edit-values";
import CloseLine from "../../Icons/CloseLine";
import QuestionTypeValuePreview from "../QuestionTypeValuePreview";
import { getHighlightRegionsByMap } from "../../helpers/map";
import { getFlagsByCategory } from "../../helpers/flag";
import { TriviaQuestionCategory } from "../../types/trivia-question-category";
import Search from "../../Icons/Search";
import UnsplashImageGrid from "../UnsplashImageGrid";
import { UnsplashImage } from "../../types/unsplash-image";

const validationSchema = Yup.object().shape({
  typeId: Yup.string().required("Please select a question type."),
  categoryId: Yup.string().required("Please select a question category."),
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

export interface Props {
  editValues?: ManualTriviaQuestionEditValues;
  types?: QuizType[];
  categories?: TriviaQuestionCategory[];
  isLoading?: boolean;
  isSubmitting?: boolean;
  error?: string;
  onClose?: () => void;
  onSubmit?: (
    values: ManualTriviaQuestionFormSubmit,
    helpers: FormikHelpers<ManualTriviaQuestionFormSubmit>
  ) => void;
  images?: UnsplashImage[];
  isSearchingImages?: boolean;
  isEmptyImageSearch?: boolean;
  onChangeSearchImage?: (query: string) => void;
}

const AdminManualTriviaQuestionForm: FC<Props> = ({
  editValues,
  types = [],
  categories = [],
  isSubmitting = false,
  isLoading = false,
  error = "",
  onSubmit = () => {},
  onClose = () => {},
  images = [],
  isSearchingImages = false,
  isEmptyImageSearch = false,
  onChangeSearchImage = () => {},
}) => {
  const initialHasFlagAnswers = editValues?.hasFlagAnswers || false;
  const isEditing = !!editValues;

  const [hasFlagAnswers, setHasFlagAnswers] = useState(initialHasFlagAnswers);
  const [flagCategory, setFlagCategory] = useState("world");

  const handleSearchImageDebounced = debounce(1500, (event) =>
    onChangeSearchImage(event.target.value)
  );

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
            initialValues={
              editValues || {
                typeId: "1",
                categoryId: "1",
                question: "",
                explainer: "",
                quizDate: null,
                map: "",
                highlighted: "",
                flagCode: "",
                imageUrl: "",
                imageAttributeName: "",
                imageAttributeUrl: "",
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
            {({ values, setFieldValue, errors }) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const {
                getRootProps: getTypeRootProps,
                getRadioProps: getTypeRadioProps,
              } = useRadioGroup({
                name: "typeId",
                value: values.typeId,
                onChange: (value: number) =>
                  setFieldValue("typeId", value.toString()),
              });

              const typeRadioGroup = getTypeRootProps();

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const {
                getRootProps: getCategoryRootProps,
                getRadioProps: getCategoryRadioProps,
              } = useRadioGroup({
                name: "categoryId",
                value: values.categoryId,
                onChange: (value: number) =>
                  setFieldValue("categoryId", value.toString()),
              });

              const categoryRadioGroup = getCategoryRootProps();

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
                  setFieldValue("imageUrl", value);
                },
              });

              const imageUrlRadioGroup = getImageUrlRootProps();

              return (
                <Box maxWidth="600px" width="100%">
                  <Heading fontSize="22px">
                    {`${isEditing ? "Edit" : "Create"} Manual Trivia Question`}
                  </Heading>
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
                                name="typeId"
                                spacing={3}
                                minHeight="50px"
                                {...typeRadioGroup}
                              >
                                {!types.length ? (
                                  <Text
                                    width="347px"
                                    textAlign="center"
                                    color="gray.500"
                                  >
                                    {"Loading types.."}
                                  </Text>
                                ) : (
                                  types.map((type) => {
                                    //@ts-expect-error
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
                                  })
                                )}
                              </HStack>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="categoryId">
                          {({ form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.categoryId &&
                                form.touched.categoryId
                              }
                            >
                              <FormLabel htmlFor="categoryId" fontWeight="bold">
                                {"Category"}
                              </FormLabel>
                              <SimpleGrid
                                columns={2}
                                name="categoryId"
                                spacing={3}
                                {...categoryRadioGroup}
                              >
                                {!categories.length ? (
                                  <Text
                                    width="347px"
                                    textAlign="center"
                                    color="gray.500"
                                  >
                                    {"Loading categories.."}
                                  </Text>
                                ) : (
                                  categories.map((category) => {
                                    //@ts-expect-error
                                    const radio = getCategoryRadioProps({
                                      value: category.id.toString(),
                                    });
                                    return (
                                      <RadioButton
                                        key={category.id}
                                        radioProps={radio}
                                        color="teal"
                                      >
                                        {category.name}
                                      </RadioButton>
                                    );
                                  })
                                )}
                              </SimpleGrid>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

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

                      <Flex marginY={3}>
                        <Field name="explainer">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.explainer && form.touched.explainer
                              }
                            >
                              <FormLabel htmlFor="explainer" fontWeight="bold">
                                {"Explainer"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="explainer"
                                type="text"
                                placeholder="Enter explainer..."
                                size="lg"
                                fontSize="16px"
                                fontWeight={400}
                                background="#F6F6F6"
                                borderRadius={6}
                                _placeholder={{ color: "gray.500" }}
                                _hover={{ background: "#e0e0e0" }}
                              />
                              <FormErrorMessage fontSize="11px">
                                {form.errors.explainer}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      {values.typeId === QuestionType.Image.toString() && (
                        <>
                          <Flex marginY={3}>
                            <Field name="imageUrl">
                              {({ form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.imageUrl &&
                                    form.touched.imageUrl
                                  }
                                >
                                  <FormLabel
                                    htmlFor="imageUrl"
                                    fontWeight="bold"
                                  >
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
                                {flagCategories?.map(({ key, label }) => (
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
                                    form.errors.flagCode &&
                                    form.touched.flagCode
                                  }
                                >
                                  <FormLabel
                                    htmlFor="flagCode"
                                    fontWeight="bold"
                                  >
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
                                        (category, index) => (
                                          <option key={index} value={category}>
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

                      {values.typeId === QuestionType.Map.toString() && (
                        <>
                          <Flex marginY={3}>
                            <Field name="map">
                              {({ field, form }) => (
                                <FormControl
                                  isInvalid={
                                    form.errors.map && form.touched.map
                                  }
                                >
                                  <FormLabel htmlFor="map" fontWeight="bold">
                                    {"Map"}
                                  </FormLabel>
                                  <Select {...field}>
                                    <option value="">
                                      {"Select a map..."}
                                    </option>
                                    {Object.keys(Maps)
                                      .sort()
                                      .map((map) => (
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
                                          {region.label}
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

                      <QuestionTypeValuePreview
                        typeId={values.typeId}
                        map={values.map}
                        highlighted={values.highlighted}
                        imageUrl={values.imageUrl}
                        imageAttributeName={values.imageAttributeName}
                        imageAttributeUrl={values.imageAttributeUrl}
                      />

                      <Divider marginY={5} />

                      <Flex direction="row" marginBottom={5} flexWrap="wrap">
                        <Flex flex={1} direction="column" width="100%">
                          <FormLabel htmlFor="answerOneText" fontWeight="bold">
                            {"Do answers have flags?"}
                          </FormLabel>

                          <HStack spacing={3}>
                            <RadioButton
                              color="teal"
                              radioProps={{
                                isChecked: !hasFlagAnswers,
                                onChange: () => setHasFlagAnswers(false),
                              }}
                            >
                              {"No"}
                            </RadioButton>
                            <RadioButton
                              color="teal"
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
                          <FormLabel htmlFor="quizDate" fontWeight="bold">
                            {"Appearance Date"}
                          </FormLabel>
                          <Field name="quizDate">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.quizDate && form.touched.quizDate
                                }
                              >
                                <HStack>
                                  <DatePicker
                                    {...field}
                                    placeholderText="Select date..."
                                    selected={
                                      (field.value && new Date(field.value)) ||
                                      null
                                    }
                                    onChange={(value) => {
                                      setFieldValue(
                                        "quizDate",
                                        new Date(value).toISOString()
                                      );
                                    }}
                                  />
                                  <Button
                                    onClick={() => {
                                      setFieldValue("quizDate", null);
                                    }}
                                  >
                                    <CloseLine />
                                  </Button>
                                </HStack>
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
                                  <Box
                                    position="absolute"
                                    top="38px"
                                    left="2px"
                                  >
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
                            disabled={isLoading || isSubmitting}
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
      </VStack>
    </>
  );
};

export default AdminManualTriviaQuestionForm;
