import type { ReactElement } from "react";
import { Text, Stack, Heading, Container, Box } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { sanityClient } from "../../../lib/sanity.server";
import { WikiLayout } from "../../../components";
import { NextSeo } from "next-seo";

export default function GuidesPage({ pageData }: any) {
  console.log("👾 ~ GuidesPage ~ pageData", pageData);
  return (
    <Container maxW='container.lg' px={[5, 12]}>
      {/* <NextSeo title={pageData?.title ??} description={pageData?.copy} /> */}
      <Box mb={12} textAlign='center'>
        <Heading size='2xl' mb={5}>
          Guides
        </Heading>
      </Box>
      <Stack>
        {pageData?.map((guide: any) => (
          <Text key={guide?._key}>{guide?.title}</Text>
        ))}
      </Stack>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "guide"]{
      ...
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
