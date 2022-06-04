import type { ReactElement } from "react";
import {
  Flex,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Box,
  Divider,
  LinkBox,
  HStack,
  LinkOverlay,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import { WikiLayout } from "../../../../components";
import { sanityClient } from "../../../../lib/sanity.server";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import {
  Location,
  RegionPageResponse,
  ExtendedImage,
  BuildCategory,
} from "../../../../types";
import { NextSeo } from "next-seo";
import { nameFormatter } from "../../../../utils";
import { ChakraNextImage } from "../../../../components/ChakraNextImage";

interface RegionPageProps extends RegionPageResponse {
  extendedImage: ExtendedImage;
  extendedBuildCategory: BuildCategory;
}

const RegionPage = ({ pageData }: { pageData: RegionPageProps }) => {
  return (
    <>
      <NextSeo title={pageData?.name} />
      <Container maxW='container.lg' px={[5, 12]}>
        <Breadcrumbs />
        <Heading size='2xl' mb={12}>
          {pageData?.name}
        </Heading>
        <SimpleGrid minChildWidth='292px' spacing='24px'>
          {pageData?.locations.map((loc) => (
            <LocationCard key={loc?.title} {...loc} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

interface LocationCardProps extends Location {
  extendedImage?: ExtendedImage;
  extendedBuildCategory?: BuildCategory;
}

function LocationCard(cardData: LocationCardProps) {
  const myLoader = ({ src = "" }) => {
    return `${src}?fit=crop&auto=format&crop=center&h=275&w=${352}&q=100`;
  };

  return (
    <LinkBox
      as={Flex}
      flexShrink={0}
      direction='column'
      maxW='sm'
      p={4}
      width='full'
      outline='1.5px solid black'
      _hover={{
        bg: "primaryGlare",
        outline: "1.5px solid black",
        cursor: "pointer",
      }}
    >
      <HStack>
        <Heading letterSpacing={1.1} fontSize='md' width='full'>
          {cardData?.title}
        </Heading>
        <Text fontSize='sm'>{cardData?.extendedBuildCategory?.title}</Text>
      </HStack>
      <Divider borderBottomColor='black' mt={2} />
      <LinkOverlay
        as={NextLink}
        passHref
        href={`${cardData?.region?.slug?.current}/${cardData?.slug?.current}`}
      >
        <a>
          <Flex
            mt={3}
            mb={2}
            width='full'
            height={275}
            outline='1.5px solid black'
            position='relative'
            bgColor='primaryGlare'
          >
            {cardData?.extendedImage?.url && (
              <ChakraNextImage
                src={cardData?.extendedImage?.url}
                blurDataURL={cardData?.extendedImage?.metadata?.lqip!}
                placeholder='blur'
                objectFit='cover'
                objectPosition='center'
                layout='fill'
                loader={myLoader}
              />
            )}
          </Flex>
        </a>
      </LinkOverlay>
      <HStack justify='space-between'>
        <Text fontSize='xs' color='gray.700'>
          {cardData?.house}
        </Text>
        <Text fontSize='xs' color='gray.700'>
          {nameFormatter(cardData?.projectStatus)}
        </Text>
      </HStack>
    </LinkBox>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await sanityClient.fetch(
    `*[_type=="region" && slug.current == $slug][0]{
        name,
        "locations": *[_type=='location' && references(^._id)] {
        title,
        house,
        projectStatus,
        slug,
        region->{ slug },
        "extendedImage": additionalImages.images[0].asset->{
        url,
        metadata {
          lqip
        }
      },
      "extendedBuildCategory": buildCategory[0]-> { title }
      }
    }`,
    { slug: params?.region }
  );

  return {
    props: {
      pageData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(
    `*[_type == "region"] {
        slug
     }`
  );

  return {
    paths: paths.map((item: any) => ({
      params: { region: item?.slug?.current },
    })),
    fallback: true,
  };
};

RegionPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};

export default RegionPage;
