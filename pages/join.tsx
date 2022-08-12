import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Text, Box, Heading, Flex, Center, VStack, Img } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { sanityClient } from '../lib/sanity.server';
import { urlFor } from '../lib/sanity';
import { Seo } from '../components/Seo';
import Longclaw from '../public/longclaw.png';

export default function JoinPage({ pageData }) {
  console.log('🚀 ~ file: join.tsx ~ line 8 ~ JoinPage ~ pageData', pageData);
  return (
    <>
      <Seo title={pageData?.seo?.title || pageData?.title} />
      <Flex flexDir="column" w="full">
        <Box w="full">
          <Box maxW="7xl" mx="auto" px={[2, null, 4]}>
            <VStack
              borderColor="black"
              borderLeftWidth="1px"
              borderRightWidth="1px"
              w="full"
              mx="auto"
              pt={{ base: '24', sm: '32' }}
            >
              <Center flexDir="column">
                <Heading size={{ base: '2xl', sm: '3xl', lg: '4xl' }}>Join the Watch</Heading>
                <Text fontSize="xl" maxW="3xl" mt="6">
                  We have several different ways to start exploring the server and have compiled
                  guides on all the suggested ways below! Be sure to read the guides in full.
                </Text>
                <Img mt="12" width="80px" alt="Longclaw" src={Longclaw.src} />
              </Center>
            </VStack>
          </Box>
        </Box>
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
