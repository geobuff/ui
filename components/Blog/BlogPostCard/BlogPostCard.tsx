import React, { FC } from "react";
import Link from "next/link";
import { Flex, Heading, Tag, Text } from "@chakra-ui/react";
import Card from "../../Card";

export interface Props {
  slug?: string;
  date?: string;
  title?: string;
  description?: string;
}

const BlogPostCard: FC<Props> = ({
  slug = "",
  date = "",
  title = "",
  description = "",
}) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Card
        padding={6}
        cursor="pointer"
        transition="0.3s"
        _hover={{ transform: "scale(1.02)" }}
        mb={6}
      >
        <Flex justifyContent="space-between" mb={3}>
          <Heading>{title}</Heading>
          <Tag>{date}</Tag>
        </Flex>
        <Text>{description}</Text>
      </Card>
    </Link>
  );
};

export default BlogPostCard;
