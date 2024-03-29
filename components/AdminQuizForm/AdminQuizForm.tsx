import React, { FC } from "react";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text,
  VStack,
  useRadioGroup,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Badge } from "../../types/badge";
import { Continent } from "../../types/continent";
import { QuizEditValues } from "../../types/quiz-edit-values";
import { QuizFormSubmit } from "../../types/quiz-form-submit";
import { QuizType } from "../../types/quiz-type";
import { QuizTypes } from "../../types/quiz-types";
import TrueFalseFormField from "../FormFields/TrueFalseFormField";
import RadioButton from "../RadioButton";

const validationSchema = Yup.object().shape({
  typeId: Yup.string().required("Please select a quiz type."),
  singular: Yup.string().required("Please enter a value for   singular."),
  name: Yup.string().required("Please enter a name."),
  maxScore: Yup.number()
    .moreThan(0)
    .required("Please enter a max score greater than 0."),
  time: Yup.number()
    .moreThan(0)
    .required("Please enter a time in seconds value greater than 0."),
  imageUrl: Yup.string().required("Please enter an image URL."),
  plural: Yup.string().required("Please enter a plural value."),
  apiPath: Yup.string().required("Please enter an API path."),
  route: Yup.string().required("Please enter a route value."),
  hasLeaderboard: Yup.boolean().required(
    "Please enter a value for hasLeaderboard."
  ),
  hasGrouping: Yup.boolean().required("Please enter a value for hasGrouping."),
  hasFlags: Yup.boolean().required("Please enter a value for hasFlags."),
  enabled: Yup.boolean().required("Please enter a value for enabled."),
});

export interface Props {
  editValues?: QuizEditValues;
  types?: QuizType[];
  badges?: Badge[];
  continents?: Continent[];
  isSubmitting?: boolean;
  error?: string;
  isLoading?: boolean;
  onSubmit?: (
    values: QuizFormSubmit,
    helpers: FormikHelpers<QuizFormSubmit>
  ) => void;
  onClose?: () => void;
  hideTitle?: boolean;
  closeButtonText?: string;
  submitButtonText?: string;
}

const AdminQuizForm: FC<Props> = ({
  editValues,
  types = [],
  badges = [],
  continents = [],
  isSubmitting = false,
  error = "",
  isLoading = false,
  onSubmit = (): void => {},
  onClose = () => {},
  hideTitle = false,
  closeButtonText = "",
  submitButtonText = "",
}) => {
  const isEditing = !!editValues;

  return (
    <>
      <VStack>
        {error && (
          <Alert status="error" borderRadius={6} marginBottom={3}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Flex justifyContent="center" width="100%">
          <Formik
            initialValues={
              editValues || {
                typeId: "",
                badgeId: "",
                continentId: "",
                country: "",
                singular: "",
                name: "",
                maxScore: "0",
                time: "0",
                mapSVG: "",
                imageUrl: "",
                plural: "",
                apiPath: "",
                route: "",
                hasLeaderboard: "false",
                hasGrouping: "false",
                hasFlags: "false",
                enabled: "false",
              }
            }
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ values, setFieldValue }): React.ReactNode => {
              const {
                getRootProps: getTypeRootProps,
                getRadioProps: getTypeRadioProps,
              } = useRadioGroup({
                name: "typeId",
                value: values.typeId,
                onChange: (value: string) => setFieldValue("typeId", value),
              });

              const typeRadioGroup = getTypeRootProps();

              const {
                getRootProps: getBadgeRootProps,
                getRadioProps: getBadgeRadioProps,
              } = useRadioGroup({
                name: "badgeId",
                value: values.badgeId,
                onChange: (value: string) => setFieldValue("badgeId", value),
              });

              const badgeRadioGroup = getBadgeRootProps();

              const {
                getRootProps: getContinentRootProps,
                getRadioProps: getContinentRadioProps,
              } = useRadioGroup({
                name: "continentId",
                value: values.continentId,
                onChange: (value: string) =>
                  setFieldValue("continentId", value),
              });

              const continentRadioGroup = getContinentRootProps();

              return (
                <Box maxWidth="600px" width="100%">
                  {!hideTitle && (
                    <>
                      <Heading fontSize="22px">
                        {`${isEditing ? "Edit" : "Create"} Quiz`}
                      </Heading>
                      <Divider marginY={5} />
                    </>
                  )}

                  <Form>
                    <Flex direction="column">
                      <Flex marginBottom={6}>
                        <Field name="name">
                          {({ field, form }): React.ReactNode => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
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
                              <Box position="absolute" top="68px" left="2px">
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.name}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

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
                                {!types.length ? (
                                  <Text
                                    width="347px"
                                    textAlign="center"
                                    color="gray.500"
                                  >
                                    {"Loading Types.."}
                                  </Text>
                                ) : (
                                  types.map((type) => {
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

                      {values.typeId === QuizTypes.MAP.toString() && (
                        <Flex marginTop={6} marginBottom={3}>
                          <Field name="mapSVG">
                            {({ field, form }): React.ReactNode => (
                              <FormControl
                                isInvalid={
                                  form.errors.mapSVG && form.touched.mapSVG
                                }
                              >
                                <FormLabel htmlFor="mapSVG" fontWeight="bold">
                                  {"Map SVG"}
                                </FormLabel>
                                <Input
                                  {...field}
                                  id="mapSVG"
                                  type="text"
                                  placeholder="Enter map SVG..."
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
                                    {form.errors.mapSVG}
                                  </FormErrorMessage>
                                </Box>
                                <FormHelperText lineHeight="1.50">
                                  {`Find value under 'ClassName' in https://geobuff.com/resources/maps e.g. WorldCountries.`}
                                </FormHelperText>
                              </FormControl>
                            )}
                          </Field>
                        </Flex>
                      )}

                      <Flex marginY={3}>
                        <Field name="maxScore">
                          {({ form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.maxScore && form.touched.maxScore
                              }
                            >
                              <FormLabel htmlFor="maxScore" fontWeight="bold">
                                {"Max Score"}
                              </FormLabel>
                              <NumberInput
                                value={parseInt(values.maxScore)}
                                onChange={(value: string): void =>
                                  setFieldValue("maxScore", value)
                                }
                              >
                                <NumberInputField id="maxScore" />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <Box position="absolute" top="68px" left="2px">
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.maxScore}
                                </FormErrorMessage>
                              </Box>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="time">
                          {({ form }): React.ReactNode => (
                            <FormControl
                              isInvalid={form.errors.time && form.touched.time}
                            >
                              <FormLabel htmlFor="time" fontWeight="bold">
                                {"Time (Seconds)"}
                              </FormLabel>
                              <NumberInput
                                value={parseInt(values.time)}
                                onChange={(value: string): void =>
                                  setFieldValue("time", value)
                                }
                              >
                                <NumberInputField id="time" />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <Box position="absolute" top="68px" left="2px">
                                <FormErrorMessage fontSize="11px">
                                  {form.errors.time}
                                </FormErrorMessage>
                              </Box>
                              <FormHelperText lineHeight="1.50" mt={4}>
                                {
                                  "300 = 5 minutes, 600 = 10 minutes, 900 = 15 minutes."
                                }
                              </FormHelperText>
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
                              <FormHelperText lineHeight="1.50" mt={3}>
                                {`Used in the quiz card. Please enter the full url e.g. "https://twemoji.maxcdn.com/v/13.0.1/svg/1f1e6-1f1f7.svg".`}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="apiPath">
                          {({ field, form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.apiPath && form.touched.apiPath
                              }
                            >
                              <FormLabel htmlFor="apiPath" fontWeight="bold">
                                {"API Path"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="apiPath"
                                type="text"
                                placeholder="Enter API Path..."
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
                                  {form.errors.apiPath}
                                </FormErrorMessage>
                              </Box>
                              <FormHelperText lineHeight="1.50" mt={3}>
                                {
                                  "This is the key used to get the mappings for this particular quiz. The mapping will be called using http://localhost:3000/api/mappings/{apiPath}."
                                }
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="route">
                          {({ field, form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.route && form.touched.route
                              }
                            >
                              <FormLabel htmlFor="route" fontWeight="bold">
                                {"Route"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="route"
                                type="text"
                                placeholder="Enter route..."
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
                                  {form.errors.route}
                                </FormErrorMessage>
                              </Box>
                              <FormHelperText lineHeight="1.50" mt={3}>
                                {`This is the descriptor used in the URL for the quiz. The full route will be something like geobuff.com/quiz/{route}.`}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="singular">
                          {({ field, form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.singular && form.touched.singular
                              }
                            >
                              <FormLabel htmlFor="singular" fontWeight="bold">
                                {"Singular"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="singular"
                                type="text"
                                placeholder="Enter singular..."
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
                                  {form.errors.singular}
                                </FormErrorMessage>
                              </Box>
                              <FormHelperText lineHeight="1.50" mt={3}>
                                {
                                  "This is used to to describe each instance of a mapping in the quiz e.g. province. Please use lowercase format."
                                }
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="plural">
                          {({ field, form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.plural && form.touched.plural
                              }
                            >
                              <FormLabel htmlFor="plural" fontWeight="bold">
                                {"Plural"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="plural"
                                type="text"
                                placeholder="Enter plural..."
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
                                  {form.errors.plural}
                                </FormErrorMessage>
                              </Box>
                              <FormHelperText lineHeight="1.50" mt={3}>
                                {"Plural of singular field."}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="hasLeaderboard">
                          {({ form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.hasLeaderboard &&
                                form.touched.hasLeaderboard
                              }
                            >
                              <TrueFalseFormField
                                name={"hasLeaderboard"}
                                label={"Has leaderboard?"}
                                selectedValue={values.hasLeaderboard}
                                setFieldHelper={setFieldValue}
                                color="teal"
                              />
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="hasGrouping">
                          {({ form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.hasGrouping &&
                                form.touched.hasGrouping
                              }
                            >
                              <TrueFalseFormField
                                name={"hasGrouping"}
                                label={"Has grouping?"}
                                selectedValue={values.hasGrouping}
                                setFieldHelper={setFieldValue}
                                color="teal"
                              />
                              <FormHelperText lineHeight="1.50" mb={3}>
                                {`Only applicable if "Group" values have been added to the mappings for the quiz e.g. the "world-countries" mappings have been grouped by continents. Discuss with Ash if unsure.`}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="hasFlags">
                          {({ form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.hasFlags && form.touched.hasFlags
                              }
                            >
                              <TrueFalseFormField
                                name={"hasFlags"}
                                label={"Has flags?"}
                                selectedValue={values.hasFlags}
                                setFieldHelper={setFieldValue}
                                color="teal"
                              />
                              <FormHelperText lineHeight="1.50" mb={3}>
                                {`Only applicable if flag mappings have been added to https://github.com/geobuff/flags.`}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="enabled">
                          {({ form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.enabled && form.touched.enabled
                              }
                            >
                              <TrueFalseFormField
                                name={"enabled"}
                                label={"Enabled?"}
                                selectedValue={values.enabled}
                                setFieldHelper={setFieldValue}
                                color="teal"
                              />
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="country">
                          {({ field, form }): React.ReactNode => (
                            <FormControl
                              isInvalid={
                                form.errors.country && form.touched.country
                              }
                            >
                              <FormLabel htmlFor="country" fontWeight="bold">
                                {"Country"}
                              </FormLabel>
                              <Input
                                {...field}
                                id="country"
                                type="text"
                                placeholder="Enter country..."
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
                                  {form.errors.country}
                                </FormErrorMessage>
                              </Box>
                              <FormHelperText lineHeight="1.50">
                                {`Optional field. This is used to filter non-global quizzes. Please use titlecase format e.g. "Argentina".`}
                              </FormHelperText>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="badgeId">
                          {({ form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.badgeId && form.touched.badgeId
                              }
                            >
                              <FormLabel htmlFor="badgeId" fontWeight="bold">
                                {"Badge"}
                              </FormLabel>
                              <FormHelperText lineHeight="1.50" mb={3}>
                                {"Optional field. Only select if applicable."}
                              </FormHelperText>
                              <SimpleGrid
                                columns={2}
                                spacing={3}
                                {...badgeRadioGroup}
                              >
                                {!badges.length ? (
                                  <Text
                                    width="347px"
                                    textAlign="center"
                                    color="gray.500"
                                  >
                                    {"Loading badges.."}
                                  </Text>
                                ) : (
                                  badges.map((badge) => {
                                    const radio = getBadgeRadioProps({
                                      value: badge.id.toString(),
                                    });

                                    return (
                                      <RadioButton
                                        key={badge.id}
                                        radioProps={radio}
                                        color="teal"
                                      >
                                        {badge.name}
                                      </RadioButton>
                                    );
                                  })
                                )}
                              </SimpleGrid>
                            </FormControl>
                          )}
                        </Field>
                      </Flex>

                      <Flex marginY={3}>
                        <Field name="continentId">
                          {({ form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.continentId &&
                                form.touched.continentId
                              }
                            >
                              <FormLabel
                                htmlFor="continentId"
                                fontWeight="bold"
                              >
                                {"Continent"}
                              </FormLabel>
                              <FormHelperText lineHeight="1.50" mb={3}>
                                {"Optional field. Only select if applicable."}
                              </FormHelperText>
                              <SimpleGrid
                                columns={2}
                                spacing={3}
                                {...continentRadioGroup}
                              >
                                {!continents.length ? (
                                  <Text
                                    width="347px"
                                    textAlign="center"
                                    color="gray.500"
                                  >
                                    {"Loading continents.."}
                                  </Text>
                                ) : (
                                  continents.map((continent) => {
                                    const radio = getContinentRadioProps({
                                      value: continent.id.toString(),
                                    });

                                    return (
                                      <RadioButton
                                        key={continent.id}
                                        radioProps={radio}
                                        color="teal"
                                      >
                                        {continent.name}
                                      </RadioButton>
                                    );
                                  })
                                )}
                              </SimpleGrid>
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
                              {closeButtonText ?? "Close"}
                            </Button>
                          )}
                          <Button
                            colorScheme="teal"
                            width="100%"
                            type="submit"
                            isLoading={isLoading}
                            disabled={isLoading || isSubmitting}
                          >
                            {submitButtonText
                              ? submitButtonText
                              : isEditing
                              ? "Update"
                              : "Create"}
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

export default AdminQuizForm;
