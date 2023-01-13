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
  chakra,
  Button,
} from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { sanityClient } from '../lib/sanity.server';
import ProgressTable from '../components/ProgressTable';
import { ContainerBorder } from '../components/ContainerBorder';
import { urlFor } from '../lib/sanity';
import NextLink from 'next/link';
import { Seo } from '../components/Seo';

export default function ProgressPage({ allLocations, pageData }: any) {
  const calcCompletionPercentage = (
    completedLevel: number,
    inProgressLevel: number,
    notStartedLevel: number,
  ) => {
    return Math.ceil(
      ((completedLevel + inProgressLevel / 2) /
        (completedLevel + inProgressLevel + notStartedLevel)) *
        100,
    );
  };

  return (
    <>
      <Seo title={pageData?.seo?.title || pageData?.title} />
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
            <Img
              width={{ base: '100px', md: '120px' }}
              alt="Banner"
              src={urlFor(pageData?.heroImage).url()}
            />
            <Box maxW="2xl" textAlign={{ base: 'center', sm: 'left' }}>
              <Heading size={{ base: '2xl', sm: '3xl', lg: '4xl' }}>Project Progress</Heading>
              <Text fontSize={{ base: 'xl', sm: '2xl' }} maxW="3xl" mt="6">
                Check in and see how far along the project is as we categorize, list and track all
                available projects across WesterosCraft
              </Text>
            </Box>
          </Stack>
        </ContainerBorder>
        <Box w="full" bg="primaryDark">
          <ContainerBorder variant="dark" color="white" py={{ base: '16', sm: '20' }} px="4">
            <Box maxW="5xl" mx="auto">
              <VStack spacing={12}>
                <Box textAlign="center">
                  <Text fontSize="2xl">
                    Westeros is an estimated
                    <chakra.span fontSize="7xl" color="primaryGold">
                      {' '}
                      {calcCompletionPercentage(
                        pageData?.totalCompleted,
                        pageData?.totalInProgress,
                        pageData?.totalNotStarted,
                      )}
                      %
                    </chakra.span>
                    {'  '}
                    complete
                  </Text>
                </Box>
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={10}
                  textAlign="center"
                  w="full"
                  divider={<StackDivider />}
                >
                  <Stat flex="none">
                    <StatNumber fontSize="5xl">
                      {pageData?.totalCompleted +
                        pageData?.totalNotStarted +
                        pageData?.totalInProgress}
                    </StatNumber>
                    <StatHelpText fontSize="xl">Total Projects</StatHelpText>
                  </Stat>
                  <Stat flex="none">
                    <StatNumber fontSize="5xl">{pageData?.totalCompleted}</StatNumber>
                    <StatHelpText fontSize="xl">Completed</StatHelpText>
                  </Stat>
                  <Stat flex="none">
                    <StatNumber fontSize="5xl">{pageData?.totalNotStarted}</StatNumber>
                    <StatHelpText fontSize="xl">Not Started</StatHelpText>
                  </Stat>
                  <Stat flex="none">
                    <StatNumber fontSize="5xl">{pageData?.totalInProgress}</StatNumber>
                    <StatHelpText fontSize="xl">In Progress</StatHelpText>
                  </Stat>
                </Stack>
              </VStack>
            </Box>
          </ContainerBorder>
        </Box>
        <ContainerBorder py={{ base: '16', sm: '20' }} px="4">
          <Box maxW="5xl" mx="auto" w="full">
            <ProgressTable data={allLocations} />
          </Box>
        </ContainerBorder>
        <ContainerBorder
          py={{ base: '16', sm: '20' }}
          px="4"
          borderTop="1px solid"
          borderColor="primaryDark"
        >
          <Box as="section">
            <Box
              maxW="2xl"
              mx="auto"
              px={{ base: '6', lg: '8' }}
              py={{ base: '16', sm: '20' }}
              textAlign="center"
            >
              <Heading as="h2" size="2xl" fontWeight="extrabold">
                Ready to see the progress in game?
              </Heading>
              <Text mt="4" fontSize="lg">
                Westeros is home to over 500 cities, castles, and landmarks. Our goal is to
                construct them all. With over 300 completed so far, our community is well on our way
                to having a fully explorable map.
              </Text>
              <NextLink href="/join">
                <Button
                  mt="8"
                  size="lg"
                  bg="primaryRed"
                  _hover={{ bg: 'red.800' }}
                  color="white"
                  height="14"
                  px="8"
                  fontSize="md"
                >
                  Join the Server
                </Button>
              </NextLink>
            </Box>
          </Box>
        </ContainerBorder>
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "progress"]{
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
    revalidate: 900,
  };
};

ProgressPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
