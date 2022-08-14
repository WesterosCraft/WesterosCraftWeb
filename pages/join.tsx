import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Text, Box, Heading, Flex, Center, VStack, Img, HStack } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { sanityClient } from '../lib/sanity.server';
import { Seo } from '../components/Seo';
import Longclaw from '../public/longclaw.png';
import { ContainerBorder } from '../components/ContainerBorder';
import { PricingTiers } from '../components/PricingTiers/PricingTiers';
import { TwoTiers } from '../components/TwoTiers/TwoTiers';

export default function JoinPage({ pageData }) {
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
        >
          <HStack spacing={12}>
            <Img mt="12" width="80px" alt="Longclaw" src={Longclaw.src} />
            <Box maxW="2xl">
              <Heading size={{ base: '2xl', sm: '3xl', lg: '4xl' }}>Join the Watch</Heading>
              <Text fontSize="2xl" maxW="3xl" mt="6">
                We have several different ways to start exploring the server and have compiled
                guides on all the suggested ways below! Be sure to read the guides in full.
              </Text>
            </Box>
          </HStack>
        </ContainerBorder>
        <Box w="full" bg="primaryDark">
          <ContainerBorder variant="dark" py={{ base: '24', sm: '32' }}>
            <Center textAlign="center" flexDirection="column" color="white" maxW="2xl" mx="auto">
              <Heading size={{ base: 'xl', sm: '3xl' }} color="primaryGold">
                Getting Started
              </Heading>
              <Text mt="6" fontSize="xl">
                WesterosCraft uses several mods and plugins to aid our realistic and book accurate
                version of Westeros. In order to get you in the server and exploring what we've
                built so far as easy as possible, we've compiled several ways you can get the mods
                and plugins you need to be able to connect below.
              </Text>
              <Text mt="4" fontSize="xl">
                Be sure to read the guides thoroughly, and if you need any help, feel free to check
                out the tech support forum or the #techsupport Discord channel!
              </Text>
            </Center>
          </ContainerBorder>
          <PricingTiers />
        </Box>
        <TwoTiers />
        {/* <ManualModpackTiers /> */}
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "join"]{
    ...,
    mainImage {
      asset->{
        _id,
        _rev,
        metadata {
          lqip
        }
      }
    }
  }[0]`);

  return {
    props: {
      pageData,
    },
  };
};

JoinPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
