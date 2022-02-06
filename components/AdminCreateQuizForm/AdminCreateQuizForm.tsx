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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CreateQuizFormSubmit } from "../../types/create-quiz-form-submit";
import { QuizType } from "../../types/quiz-type";
import { Continent } from "../../types/continent";
import { Badge } from "../../types/badge";

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
  verb: Yup.string().required("Please enter a verb value."),
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
  types?: QuizType[];
  badges?: Badge[];
  continents?: Continent[];
  isSubmitting?: boolean;
  error?: string;
  isLoading?: boolean;
  onSubmit?: (values: CreateQuizFormSubmit) => void;
}

const AdminCreateQuizForm: FC<Props> = ({
  types = [],
  badges = [],
  continents = [],
  isSubmitting = false,
  error = "",
  isLoading = false,
  onSubmit,
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
          badgeId: "",
          continentId: "",
          country: "",
          singular: "",
          name: "",
          maxScore: 0,
          time: 0,
          mapSVG: "",
          imageUrl: "",
          verb: "",
          apiPath: "",
          route: "",
          hasLeaderboard: false,
          hasGrouping: false,
          hasFlags: false,
          enabled: false,
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
                  <Field name="badgeId">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.badgeId && form.touched.badgeId}
                      >
                        <FormLabel htmlFor="badgeId" fontWeight="bold">
                          {"Badge"}
                        </FormLabel>
                        <Select {...field}>
                          <option value="">Select a badge...</option>
                          {badges.map((badge) => (
                            <option key={badge.id} value={badge.id}>
                              {badge.name}
                            </option>
                          ))}
                        </Select>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.badge}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="continentId">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.continentId && form.touched.continentId
                        }
                      >
                        <FormLabel htmlFor="continentId" fontWeight="bold">
                          {"Continent"}
                        </FormLabel>
                        <Select {...field}>
                          <option value="">Select a continent...</option>
                          {continents.map((continent) => (
                            <option key={continent.id} value={continent.id}>
                              {continent.name}
                            </option>
                          ))}
                        </Select>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.continentId}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="country">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.country && form.touched.country}
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
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
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

                <Flex marginY={3}>
                  <Field name="maxScore">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.maxScore && form.touched.maxScore
                        }
                      >
                        <FormLabel htmlFor="maxScore" fontWeight="bold">
                          {"Max Score"}
                        </FormLabel>
                        <NumberInput>
                          <NumberInputField {...field} id="maxScore" />
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
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.time && form.touched.time}
                      >
                        <FormLabel htmlFor="time" fontWeight="bold">
                          {"Time"}
                        </FormLabel>
                        <NumberInput>
                          <NumberInputField {...field} id="time" />
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
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="mapSVG">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.mapSVG && form.touched.mapSVG}
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
                  <Field name="verb">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.verb && form.touched.verb}
                      >
                        <FormLabel htmlFor="verb" fontWeight="bold">
                          {"Verb"}
                        </FormLabel>
                        <Input
                          {...field}
                          id="verb"
                          type="text"
                          placeholder="Enter verb..."
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
                            {form.errors.verb}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="apiPath">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.apiPath && form.touched.apiPath}
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
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="route">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.route && form.touched.route}
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
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="hasLeaderboard">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.hasLeaderboard &&
                          form.touched.hasLeaderboard
                        }
                      >
                        <FormLabel htmlFor="hasLeaderboard" fontWeight="bold">
                          {"Has leaderboard?"}
                        </FormLabel>
                        <Select {...field}>
                          <option value="" disabled>
                            Select an option...
                          </option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Select>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.hasLeaderboard}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="hasGrouping">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.hasGrouping && form.touched.hasGrouping
                        }
                      >
                        <FormLabel htmlFor="hasGrouping" fontWeight="bold">
                          {"Has grouping?"}
                        </FormLabel>
                        <Select {...field}>
                          <option value="" disabled>
                            Select an option...
                          </option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Select>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.hasGrouping}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="hasFlags">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={
                          form.errors.hasFlags && form.touched.hasFlags
                        }
                      >
                        <FormLabel htmlFor="hasFlags" fontWeight="bold">
                          {"Has flags?"}
                        </FormLabel>
                        <Select {...field}>
                          <option value="" disabled>
                            Select an option...
                          </option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Select>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.hasFlags}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
                    )}
                  </Field>
                </Flex>

                <Flex marginY={3}>
                  <Field name="enabled">
                    {({ field, form }): React.ReactNode => (
                      <FormControl
                        isInvalid={form.errors.enabled && form.touched.enabled}
                      >
                        <FormLabel htmlFor="enabled" fontWeight="bold">
                          {"Enabled?"}
                        </FormLabel>
                        <Select {...field}>
                          <option value="" disabled>
                            Select an option...
                          </option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Select>
                        <Box position="absolute" top="68px" left="2px">
                          <FormErrorMessage fontSize="11px">
                            {form.errors.enabled}
                          </FormErrorMessage>
                        </Box>
                      </FormControl>
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

export default AdminCreateQuizForm;
