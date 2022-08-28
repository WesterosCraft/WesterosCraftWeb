import type { ReactElement } from 'react';
import { OneColumnLayout } from '../components';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function FourOhFourPage() {
  const router = useRouter();
  return (
    <>
      <Box
        backgroundSize="cover"
        minH="full"
        minW="full"
        backgroundPosition="top"
        style={{
          backgroundImage:
            'url("https://cdn.sanity.io/images/1as7cn02/production/3e2bc743d2a8ced02f3087cc3fc265dea5050114-1440x847.jpg?auto=format")',
        }}
      >
        <Box
          maxW="7xl"
          mx="auto"
          px={{ base: '4', sm: '6', lg: '8' }}
          py={{ base: '16', sm: '24', lg: '48' }}
          textAlign="center"
        >
          <Box bg="blackAlpha.600" maxW="4xl" py="8" mx="auto">
            <Text textTransform="uppercase" fontWeight="semibold" color="white" opacity={0.8}>
              404 error
            </Text>
            <Heading mt="2" size={{ base: '2xl', sm: '3xl' }} color="white">
              Uh oh! I think you’re lost.
            </Heading>
            <Text mt="6" color="white" fontSize="xl">
              {`It looks like the page you’re looking for doesn't exist.`}
            </Text>
            <Box mt="8" className="mt-6">
              <Button size="lg" onClick={() => router.back()}>
                Go back
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

FourOhFourPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
