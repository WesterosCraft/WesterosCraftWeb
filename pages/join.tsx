import type { ReactElement } from 'react';
import { Flex, Container } from '@chakra-ui/react';
import { OneColumnLayout } from '../components';

export default function JoinPage() {
  return (
    <Container px={0} w="full" centerContent maxW="container.xl">
      <Flex w="full" as="section" direction="row">
        join
      </Flex>
    </Container>
  );
}

JoinPage.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
