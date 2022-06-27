import type { ReactElement } from "react";
import { GetStaticProps } from "next";
import {
  Box,
  Center,
  Flex,
  Container,
  VStack,
  Text,
  Checkbox,
  HStack,
} from "@chakra-ui/react";
import { OneColumnLayout } from "../components";
import { sanityClient } from "../lib/sanity.server";
import { ProgressTable } from "../components/ProgressTable";

export default function Progress({ pageData, allLocations }) {
  console.log("👾 ~ Progress ~ allLocations", allLocations);
  return (
    <Container px={0} w='full' centerContent maxW='container.xl'>
      <Flex w='full' as='section' direction='row'>
        <ProgressTable />
        {/* <ProgressSidebar />
        <ProgressContent /> */}
      </Flex>
    </Container>
  );
}

function ProgressSidebar() {
  return (
    <Flex as='section' minHeight='full'>
      <Flex px={6} py={8} bg='blackAlpha.500' maxW='xs'>
        <VStack>
          <VStack align='flex-start'>
            <Text fontSize='sm' fontWeight='semibold'>
              Regions
            </Text>
            <VStack>
              <HStack spacing={8}>
                <Checkbox size='sm'>The North</Checkbox>
                <Box bg='gray.600' p={1}>
                  <Text fontSize='sm'>23</Text>
                </Box>
              </HStack>
              <HStack spacing={8}>
                <Checkbox size='sm'>The Vale</Checkbox>
                <Box bg='gray.600' p={1}>
                  <Text fontSize='sm'>23</Text>
                </Box>
              </HStack>
              <HStack spacing={8}>
                <Checkbox size='sm'>Dorne</Checkbox>
                <Box bg='gray.600' p={1}>
                  <Text fontSize='sm'>23</Text>
                </Box>
              </HStack>
              <HStack spacing={8}>
                <Checkbox size='sm'>The Wall</Checkbox>
                <Box bg='gray.600' p={1}>
                  <Text fontSize='sm'>23</Text>
                </Box>
              </HStack>
              <HStack spacing={8}>
                <Checkbox size='sm'>Beyond The Wall</Checkbox>
                <Box bg='gray.600' p={1}>
                  <Text fontSize='sm'>23</Text>
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </Flex>
    </Flex>
  );
}

function ProgressContent() {
  return (
    <Container maxW='7xl' w='full' p={8} flex='1 1 0'>
      main content
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData =
    await sanityClient.fetch(`*[_type == "page" && slug.current == "progress"]{
    ...,
    "regions": *[_type == "region"]{
      slug,
      name,
      ordinal,
      "numberOfBuilds": round(count(*[_type == "location" && region._ref == ^._id])),
    },
    "buildTypes": *[_type == "buildCategory"]{
      title,
    }
  }[0]`);
  const allLocations =
    await sanityClient.fetch(`*[_type == 'location' && defined(slug.current)]{
      slug,
      title
    }`);

  return {
    props: {
      pageData,
      allLocations,
    },
  };
};

Progress.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
