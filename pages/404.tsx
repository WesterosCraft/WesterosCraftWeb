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
            'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
        }}
      >
        <Box
          maxW="7xl"
          mx="auto"
          px={{ base: '4', sm: '6', lg: '8' }}
          py={{ base: '16', sm: '24', lg: '48' }}
          textAlign="center"
        >
          <Text textTransform="uppercase" fontWeight="semibold" color="black" opacity={0.5}>
            404 error
          </Text>
          <Heading mt="2" size={{ base: '2xl', sm: '3xl' }} color="white">
            Uh oh! I think you’re lost.
          </Heading>
          <Text mt="6" color="black" fontSize="xl">
            {`It looks like the page you’re looking for doesn't exist.`}
          </Text>
          <Box mt="8" className="mt-6">
            <Button size="lg" onClick={() => router.back()}>
              Go back
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

FourOhFourPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
