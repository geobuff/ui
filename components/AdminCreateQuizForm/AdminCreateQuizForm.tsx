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
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  useRadioGroup,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { CreateQuizFormSubmit } from "../../types/create-quiz-form-submit";
import { QuizType } from "../../types/quiz-type";
import { Continent } from "../../types/continent";
import { Badge } from "../../types/badge";
import RadioButton from "../RadioButton";
import { QuizTypes } from "../../types/quiz-types";

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
  onSubmit?: (
    values: CreateQuizFormSubmit,
    helpers: FormikHelpers<CreateQuizFormSubmit>
  ) => void;
  onClose?: () => void;
}

const AdminCreateQuizForm: FC<Props> = ({
  types = [],
  badges = [],
  continents = [],
  isSubmitting = false,
  error = "",
  isLoading = false,
  onSubmit = (): void => {},
  onClose = () => {},
}) => (
  <>
    {error && (
      <Alert status="error" borderRadius={6} marginBottom={3}>
        <AlertIcon />
        {error}
      </Alert>
    )}

    <Flex justifyContent="center" width="100%">
      <Formik
        initialValues={{
          typeId: "",
          badgeId: "",
          continentId: "",
          country: "",
          singular: "",
          name: "",
          maxScore: "",
          time: "",
          mapSVG: "",
          imageUrl: "",
          verb: "",
          apiPath: "",
          route: "",
          hasLeaderboard: "false",
          hasGrouping: "false",
          hasFlags: "false",
          enabled: "false",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ dirty, values, setFieldValue }): React.ReactNode => {
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

          const {
            getRootProps: getBadgeRootProps,
            getRadioProps: getBadgeRadioProps,
          } = useRadioGroup({
            name: "badgeId",
            value: values.badgeId,
            onChange: (value: number) =>
              setFieldValue("badgeId", value.toString()),
          });

          const badgeRadioGroup = getBadgeRootProps();

          const {
            getRootProps: getContinentRootProps,
            getRadioProps: getContinentRadioProps,
          } = useRadioGroup({
            name: "continentId",
            value: values.continentId,
            onChange: (value: number) =>
              setFieldValue("continentId", value.toString()),
          });

          const continentRadioGroup = getContinentRootProps();

          const {
            getRootProps: getHasLeaderboardRootProps,
            getRadioProps: getHasLeaderboardRadioProps,
          } = useRadioGroup({
            name: "hasLeaderboard",
            value: values.hasLeaderboard,
            onChange: (value: string) => setFieldValue("hasLeaderboard", value),
          });

          const hasLeaderboardRadioGroup = getHasLeaderboardRootProps();

          const {
            getRootProps: getHasGroupingRootProps,
            getRadioProps: getHasGroupingRadioProps,
          } = useRadioGroup({
            name: "hasGrouping",
            value: values.hasGrouping,
            onChange: (value: string) => setFieldValue("hasGrouping", value),
          });

          const hasGroupingRadioGroup = getHasGroupingRootProps();

          const {
            getRootProps: getHasFlagsRootProps,
            getRadioProps: getHasFlagsRadioProps,
          } = useRadioGroup({
            name: "hasFlags",
            value: values.hasFlags,
            onChange: (value: string) => setFieldValue("hasFlags", value),
          });

          const hasFlagsRadioGroup = getHasFlagsRootProps();

          const {
            getRootProps: getEnabledRootProps,
            getRadioProps: getEnabledRadioProps,
          } = useRadioGroup({
            name: "enabled",
            value: values.enabled,
            onChange: (value: string) => setFieldValue("enabled", value),
          });

          const enabledRadioGroup = getEnabledRootProps();

          return (
            <Box maxWidth="600px" width="100%">
              <Heading fontSize="22px">{"Create Quiz"}</Heading>
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
                        <HStack
                          name="typeId"
                          spacing={3}
                          minHeight="50px"
                          {...typeRadioGroup}
                        >
                          {types.map((type) => {
                            //@ts-expect-error
                            const radio = getTypeRadioProps({
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
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                  )}

                  <Divider marginY={5} />

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
                          <SimpleGrid
                            columns={4}
                            name="badgeId"
                            spacing={3}
                            {...badgeRadioGroup}
                          >
                            {badges.map((badge) => {
                              //@ts-expect-error
                              const radio = getBadgeRadioProps({
                                value: badge.id.toString(),
                              });

                              return (
                                <RadioButton key={badge.id} radioProps={radio}>
                                  {badge.name}
                                </RadioButton>
                              );
                            })}
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
                            form.errors.continentId && form.touched.continentId
                          }
                        >
                          <FormLabel htmlFor="continentId" fontWeight="bold">
                            {"Continent"}
                          </FormLabel>
                          <SimpleGrid
                            columns={4}
                            name="continentId"
                            spacing={3}
                            {...continentRadioGroup}
                          >
                            {continents.map((continent) => {
                              //@ts-expect-error
                              const radio = getContinentRadioProps({
                                value: continent.id.toString(),
                              });

                              return (
                                <RadioButton
                                  key={continent.id}
                                  radioProps={radio}
                                >
                                  {continent.name}
                                </RadioButton>
                              );
                            })}
                          </SimpleGrid>
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
                      {({ form }): React.ReactNode => (
                        <FormControl
                          isInvalid={
                            form.errors.hasLeaderboard &&
                            form.touched.hasLeaderboard
                          }
                        >
                          <FormLabel htmlFor="hasLeaderboard" fontWeight="bold">
                            {"Has leaderboard?"}
                          </FormLabel>
                          <HStack
                            name="hasLeaderboard"
                            spacing={3}
                            minHeight="50px"
                            {...hasLeaderboardRadioGroup}
                          >
                            {[
                              { name: "True", value: "true" },
                              { name: "False", value: "false" },
                            ].map((entry, index) => {
                              //@ts-expect-error
                              const radio = getHasLeaderboardRadioProps({
                                value: entry.value,
                              });

                              return (
                                <RadioButton key={index} radioProps={radio}>
                                  {entry.name}
                                </RadioButton>
                              );
                            })}
                          </HStack>
                        </FormControl>
                      )}
                    </Field>
                  </Flex>

                  <Flex marginY={3}>
                    <Field name="hasGrouping">
                      {({ form }): React.ReactNode => (
                        <FormControl
                          isInvalid={
                            form.errors.hasGrouping && form.touched.hasGrouping
                          }
                        >
                          <FormLabel htmlFor="hasGrouping" fontWeight="bold">
                            {"Has grouping?"}
                          </FormLabel>
                          <HStack
                            name="hasGrouping"
                            spacing={3}
                            minHeight="50px"
                            {...hasGroupingRadioGroup}
                          >
                            {[
                              { name: "True", value: "true" },
                              { name: "False", value: "false" },
                            ].map((entry, index) => {
                              //@ts-expect-error
                              const radio = getHasGroupingRadioProps({
                                value: entry.value,
                              });

                              return (
                                <RadioButton key={index} radioProps={radio}>
                                  {entry.name}
                                </RadioButton>
                              );
                            })}
                          </HStack>
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
                          <FormLabel htmlFor="hasFlags" fontWeight="bold">
                            {"Has flags?"}
                          </FormLabel>
                          <HStack
                            name="hasFlags"
                            spacing={3}
                            minHeight="50px"
                            {...hasFlagsRadioGroup}
                          >
                            {[
                              { name: "True", value: "true" },
                              { name: "False", value: "false" },
                            ].map((entry, index) => {
                              //@ts-expect-error
                              const radio = getHasFlagsRadioProps({
                                value: entry.value,
                              });

                              return (
                                <RadioButton key={index} radioProps={radio}>
                                  {entry.name}
                                </RadioButton>
                              );
                            })}
                          </HStack>
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
                          <FormLabel htmlFor="enabled" fontWeight="bold">
                            {"Enabled?"}
                          </FormLabel>
                          <HStack
                            name="enabled"
                            spacing={3}
                            minHeight="50px"
                            {...enabledRadioGroup}
                          >
                            {[
                              { name: "True", value: "true" },
                              { name: "False", value: "false" },
                            ].map((entry, index) => {
                              //@ts-expect-error
                              const radio = getEnabledRadioProps({
                                value: entry.value,
                              });

                              return (
                                <RadioButton key={index} radioProps={radio}>
                                  {entry.name}
                                </RadioButton>
                              );
                            })}
                          </HStack>
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

export default AdminCreateQuizForm;
