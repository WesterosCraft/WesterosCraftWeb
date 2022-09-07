import type { ReactElement } from 'react';
import React from 'react';
import { GetStaticProps } from 'next';
import {
  Flex,
  VStack,
  Stack,
  Box,
  Heading,
  Stat,
  Img,
  StatNumber,
  StatHelpText,
  Text,
  HStack,
  StackDivider,
} from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { sanityClient } from '../lib/sanity.server';
import { useTable, useSortBy } from 'react-table';
import ProgressTable from '../components/ProgressTable';
import { ContainerBorder } from '../components/ContainerBorder';
import Shield from '../public/shield-logomark.png';

export default function AboutPage({ allLocations, pageData }: any) {
  console.log('🚀 ~ file: about.tsx ~ line 27 ~ AboutPage ~ pageData', pageData);
  return (
    <Flex flexDir="column" w="full">
      <ContainerBorder
        variant="light"
        as={VStack}
        w="full"
        mx="auto"
        py={{ base: '16', sm: '20' }}
        px="4"
      >
        <Stack direction={{ base: 'column', md: 'row' }} align="center" spacing={12}>
          <Img width={{ base: '100px', md: '120px' }} alt="Raven" src={Shield.src} />
          <Box maxW="2xl" textAlign={{ base: 'center', sm: 'left' }}>
            <Heading size={{ base: '2xl', sm: '3xl', lg: '4xl' }}>
              The story behind WesterosCraft
            </Heading>
            <Text fontSize={{ base: 'xl', sm: '2xl' }} maxW="3xl" mt="6">
              Our goal is to recreate the universe imagined by author George R. R. Martin in his
              fantasy series, A Song of Ice and Fire
            </Text>
          </Box>
        </Stack>
      </ContainerBorder>
      <Box w="full" bg="primaryDark">
        <ContainerBorder variant="dark" color="white" py="14" px="4">
          <Box maxW="2xl" mx="auto">
            <HStack textAlign="center" spacing={20}>
              <Stat width="120px">
                <StatNumber fontSize="7xl">
                  {pageData?.totalCompleted + pageData?.totalNotStarted + pageData?.totalInProgress}
                </StatNumber>
                <StatHelpText fontSize="2xl">Total Projects</StatHelpText>
              </Stat>
              <HStack spacing={10} textAlign="center" w="full" divider={<StackDivider />}>
                <Stat>
                  <StatNumber fontSize="5xl">{pageData?.totalCompleted}</StatNumber>
                  <StatHelpText fontSize="xl">Completed</StatHelpText>
                </Stat>
                <Stat>
                  <StatNumber fontSize="5xl">{pageData?.totalNotStarted}</StatNumber>
                  <StatHelpText fontSize="xl">Not Started</StatHelpText>
                </Stat>
                <Stat>
                  <StatNumber fontSize="5xl">{pageData?.totalInProgress}</StatNumber>
                  <StatHelpText fontSize="xl">In Progress</StatHelpText>
                </Stat>
              </HStack>
            </HStack>
          </Box>
        </ContainerBorder>
      </Box>
      <ContainerBorder>
        <Box maxW="5xl" mx="auto" w="full">
          <ProgressTable data={allLocations} />
        </Box>
      </ContainerBorder>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "page" && slug.current == "about"]{
    ...,
    "totalCompleted": count(*[_type == 'location' && defined(slug.current) && projectStatus == 'completed']),
    "totalNotStarted": count(*[_type == 'location' && defined(slug.current) && projectStatus == 'notStarted']) + count(*[_type == 'location' && defined(slug.current) && projectStatus == 'abandoned']),
    "totalInProgress": count(*[_type == 'location' && defined(slug.current) && projectStatus == 'inProgress']) + count(*[_type == 'location' && defined(slug.current) && projectStatus == 'redoInProgress']),
  }[0]`);
  const allLocations = await sanityClient.fetch(`*[_type == 'location' && defined(slug.current)]{
      slug,
      title,
      region->{ name },
      projectStatus,
      "buildType": buildCategory[0]-> { title }
    }`);

  return {
    props: {
      pageData,
      allLocations,
    },
  };
};

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
