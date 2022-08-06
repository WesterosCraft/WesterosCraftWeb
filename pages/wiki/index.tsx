/* eslint-disable react/no-children-prop */
import {
  Button,
  Center,
  Container,
  Heading,
  useColorModeValue,
  Flex,
  Box,
  LinkBox,
  LinkOverlay,
  // Image,
  Divider,
  Text,
  HStack,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { sanityClient } from '../../lib/sanity.server';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { OneColumnLayout } from '../../components';
import { MagnifyingGlassIcon } from '../../components/Icons/MagnifyingGlass';
import { AlgoliaSearch } from '../../components/AlgoliaSearch';

export default function Home({ pageData }: any) {
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
    onToggle: onSearchToggle,
  } = useDisclosure();

  return (
    <Center width="full" flexDirection="column">
      <Container mt={20} maxW="container.sm" centerContent>
        <Heading size="2xl" fontWeight="bold" letterSpacing="3px">
          WesterosCraft Wiki
        </Heading>

        <Button
          height="full"
          mt={12}
          width="full"
          variant="unstyled"
          outline="1.5px solid"
          outlineColor="primaryDark"
          onClick={onSearchOpen}
        >
          <HStack pl={5} justifyContent="space-between">
            <HStack height={10} color="gray.400">
              <MagnifyingGlassIcon fill="gray.400" />
              <Text fontWeight="medium">Search the wiki</Text>
            </HStack>
            <Center px={4} height={10} color="white" bg="primaryDark">
              <Text letterSpacing={1.1}>SEARCH</Text>
            </Center>
          </HStack>
        </Button>
        <Modal isOpen={isSearchOpen} onClose={onSearchClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalBody p={4}>
              <AlgoliaSearch modalHandler={onSearchToggle} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
      <Container maxW="container.md" mt={8}>
        <Text textAlign="center">
          WesterosCraft is a Minecraft server dedicated to recreating the continent of Westeros.
          Westeros is part of the fictional world from the book series A Song of Ice and Fire ,
          which was adapted into a TV show by HBO and called Game of Thrones. In this Wiki you will
          find Information about our Projects, Rules, Guides and Tutorials. For the latest updates
          head to our homepage.
        </Text>
        <Text mt={4} textAlign="center">
          Join, explore, and enjoy!
        </Text>
      </Container>
      <Container maxW="container.xl" mt={20} mb={20}>
        <Cards />
      </Container>
    </Center>
  );
}

const Cards = () => (
  <SimpleGrid height="auto" gap={8} minChildWidth={['320px', '392px']}>
    {[
      {
        title: 'Guides',
        subtitle: 'View in depth guides on how to explore and play on our server.',
        href: '/wiki/guides',
        image:
          'https://cdn.sanity.io/images/1as7cn02/production/a1e3f84a67270e65cba4daee16005c5611639d65-1000x755.png',
      },
      {
        title: 'Locations',
        subtitle: 'View a single comprehensive list of every build we have to offer.',
        href: '/wiki/locations',
        image:
          'https://cdn.sanity.io/images/1as7cn02/production/6aa4f30c3b90f86ee2f16625f65531a0c041894d-1000x563.png',
      },
      {
        title: 'Blocks',
        subtitle: 'Check out a repository of all our custom designed blocks.',
        href: '/wiki/blocks',
        image:
          'https://cdn.sanity.io/images/1as7cn02/production/340028327aee54d8558a2ecfbfb364b68795f265-1457x759.png',
      },
    ].map((i, n) => (
      <Card key={n} {...i} />
    ))}
  </SimpleGrid>
);

const Card = ({ title = '', href = '', subtitle = '', image = '' }) => {
  const borderColor = useColorModeValue('primaryDark', 'primaryLight');

  return (
    <LinkBox
      as={Flex}
      borderColor={borderColor}
      outline="1.5px solid"
      outlineColor="primaryDark"
      flexDirection="column"
      justifyContent="space-between"
      cursor="pointer"
      p={4}
      transition="all .3s ease"
      _hover={{
        bg: 'primaryGlare',
        outline: '1.5px solid black',
        cursor: 'pointer',
      }}
    >
      <LinkOverlay as={Link} href={href}>
        <Box>
          <VStack textAlign="center" width="full">
            <Heading size="lg" color={borderColor}>
              {title}
            </Heading>
            <Text>{subtitle}</Text>
          </VStack>
          <Divider borderBottomColor="primaryDark" mt={2} />
          <Flex
            height="300px"
            width="full"
            outline="1.5px solid black"
            bgColor="#fff8e0"
            mt={3}
            mb={2}
            overflow="hidden"
          >
            <Box
              alignSelf="flex-end"
              position="relative"
              width={362}
              maxHeight="300px"
              height="full"
            >
              <Image layout="fill" src={image} alt={title} />
            </Box>
          </Flex>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "page" && slug.current == "wiki"]{
    ...
  }[0]`);

  return {
    props: {
      pageData,
    },
  };
};
Home.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
