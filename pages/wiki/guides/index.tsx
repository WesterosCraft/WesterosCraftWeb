import type { ReactElement } from "react";
import {
  Text,
  Stack,
  VStack,
  Heading,
  Container,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { sanityClient } from "../../../lib/sanity.server";
import { WikiLayout } from "../../../components";
import groupBy from "lodash/groupBy";

export default function GuidesPage({ pageData }: any) {
  return (
    <Container maxW='container.lg' px={[5, 12]}>
      {/* <NextSeo title={pageData?.title ??} description={pageData?.copy} /> */}
      <Box mb={12} textAlign='center'>
        <Heading size='2xl' mb={5}>
          Guides
        </Heading>
      </Box>
      <VStack spacing={12}>
        {Object.entries(groupBy(pageData, (o) => o.guideCategory?.title))?.map(
          ([title, guides]) => (
            <VStack key={title}>
              <Heading>{title}</Heading>
              <SimpleGrid columns={3} spacing={4}>
                {guides.map((guide) => (
                  <GuideCard key={guide?._id}>
                    <Text>{guide?.title}</Text>
                    <Text fontSize='sm'>{guide?.description}</Text>
                  </GuideCard>
                ))}
              </SimpleGrid>
            </VStack>
          )
        )}
      </VStack>
    </Container>
  );
}

function GuideCard({ children }: any) {
  return (
    <VStack p={4} outline='1.5px solid black'>
      {children}
    </VStack>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "guide"]{
      _id,
      title,
      description,
      guideCategory->{ title, _type },
      slug
    }`);

  return {
    props: {
      pageData,
    },
  };
};

GuidesPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};
