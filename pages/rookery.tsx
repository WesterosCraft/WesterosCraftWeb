import type { ReactElement } from 'react';
import { Flex, Container } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';
import { WikiLayoutNew } from '../components/Layout/WikiLayout/WikiLayout';

export default function Rookery() {
  return (
    <WikiLayoutNew />
    // <Container px={0} w="full" centerContent maxW="container.xl">
    //   <Flex w="full" as="section" direction="row">
    //     rookery
    //   </Flex>
    // </Container>
  );
}

// Rookery.getLayout = function getLayout(page: ReactElement) {
//   return <OneColumnLayout>{page}</OneColumnLayout>;
// };
