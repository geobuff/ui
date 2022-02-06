import React, { FC } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
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
});

export interface Props {
  types?: QuizType[];
  badges?: Badge[];
  continents?: Continent[];
  isSubmitting?: boolean;
  isLoading?: boolean;
  onSubmit?: (values: CreateQuizFormSubmit) => void;
}

const AdminCreateQuizForm: FC<Props> = ({
  types = [],
  badges = [],
  continents = [],
  isSubmitting = false,
  isLoading = false,
  onSubmit,
}) => (
  <Flex
    margin={6}
    padding={12}
    background="white"
    borderRadius={12}
    justifyContent="center"
  >
    <Formik
      initialValues={{
        typeId: 0,
        badgeId: 0,
        continentId: 0,
        country: "",
        singular: "",
        name: "",
        maxScore: 0,
        time: 0,
        mapSVG: "",
        imageURL: "",
        verb: "",
        apiPath: "",
        route: "",
        hasLeaderboard: false,
        hasGrouping: false,
        hasFlags: false,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ dirty, isValid }): React.ReactNode => (
        <Box minWidth="50%">
          <Form>
            <Flex direction="column" marginX={{ base: 1, md: 6 }}>
              <Flex my={6}>
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

              <Flex mt={3} mb={6}>
                <Field name="badgeId">
                  {({ field, form }): React.ReactNode => (
                    <FormControl
                      isInvalid={form.errors.badgeId && form.touched.badgeId}
                    >
                      <FormLabel htmlFor="badgeId" fontWeight="bold">
                        {"Badge"}
                      </FormLabel>
                      <Select {...field}>
                        <option value="0">Select a badge...</option>
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

              <Flex mt={3} mb={6}>
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
                        <option value="0">Select a continent...</option>
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
                    disabled={!dirty || !isValid || isLoading}
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
);

export default AdminCreateQuizForm;
