import type { ReactElement } from 'react';
import { Text, Stack, VStack, Heading, Container, Box, SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { sanityClient } from '../../../lib/sanity.server';
import { WikiLayout } from '../../../components';
import { NextSeo } from 'next-seo';

export default function GuidesPage({ pageData }: any) {
  console.log('👾 ~ GuidesPage ~ pageData', pageData);
  return (
    <Container maxW="container.lg" px={[5, 12]}>
      {/* <NextSeo title={pageData?.title ??} description={pageData?.copy} /> */}
      <Box mb={12} textAlign="center">
        <Heading size="2xl" mb={5}>
          Guides
        </Heading>
      </Box>
      <SimpleGrid columns={3} spacing={4}>
        {pageData?.map((guide: any) => (
          <GuideCard key={guide?._id}>
            <Text>{guide?.title}</Text>
            <Text fontSize="sm">{guide?.description}</Text>
          </GuideCard>
        ))}
      </SimpleGrid>
    </Container>
  );
}

function GuideCard({ children }: any) {
  return (
    <VStack p={4} outline="1.5px solid black">
      {children}
    </VStack>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "guide"]{
      _id,
      title,
      description,
      guideCategory,
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
