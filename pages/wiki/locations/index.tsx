import type { ReactElement } from "react";
import { GetStaticProps } from "next";
import {
  Text,
  Stack,
  Heading,
  Container,
  Box,
  HStack,
  Grid,
  GridItem,
  Badge,
  chakra,
  VStack,
} from "@chakra-ui/react";
import { camelCase } from "lodash";
import NextLink from "next/link";
import { WikiLayout } from "../../../components";
import { sanityClient } from "../../../lib/sanity.server";
import { ArrowUpRightIcon } from "../../../components/Icons/ArrowUpRight";
import { LocationPageResponse } from "../../../types";
import { ChakraNextImage } from "../../../components/ChakraNextImage";
import { NextSeo } from "next-seo";

const myLoader = ({ src = "", width = 300 }) => {
  return `${src}?fit=crop&auto=format&crop=center&h=351&w=${width}&q=90`;
};

function LocationsPage({ pageData }: { pageData: LocationPageResponse }) {
  return (
    <Container maxW='container.lg' px={[5, 12]}>
      <NextSeo title={pageData?.title} description={pageData?.copy} />
      <Box mb={12} textAlign='center'>
        <Heading size='2xl' mb={5}>
          <chakra.span fontSize='3xl'>The</chakra.span> Regions{" "}
          <chakra.span fontSize='3xl'>of</chakra.span> WesterosCraft
        </Heading>

        <Text>{pageData?.copy}</Text>
      </Box>
      <Stack spacing={5}>
        {pageData?.regions
          .sort((a, b) => a.ordinal - b.ordinal)
          .map((region) => (
            <Grid
              key={region.name}
              borderTopWidth='1.5px'
              borderColor='black'
              pt={5}
              pb={8}
              templateColumns={[
                "1fr",
                "repeat(5, 1fr)",
                null,
                "repeat(5, 1fr)",
              ]}
            >
              <GridItem colSpan={[1, 2, null, 2]}>
                <VStack
                  spacing={5}
                  mb={[6, 0]}
                  align={["center", "flex-start"]}
                >
                  <Heading size='xl'>{region.name}</Heading>
                  <NextLink
                    passHref
                    href={`/wiki/locations/${region.slug.current}`}
                  >
                    <HStack as='a' spacing={1}>
                      <Text fontSize='sm' textTransform='uppercase'>
                        See All
                      </Text>
                      <ArrowUpRightIcon />
                    </HStack>
                  </NextLink>
                </VStack>
              </GridItem>
              <GridItem colStart={[1, 3, null, 3]} colEnd={[1, 6, null, 6]}>
                <Stack
                  pl={5}
                  spacing={3}
                  direction={["column", null, null, null, "row"]}
                  justify='flex-start'
                  align={["center", null, null, "start"]}
                >
                  <Box maxWidth='2xs'>
                    <Badge
                      mb={2}
                      variant='solid'
                      backgroundColor={`${camelCase(
                        region.slug.current
                      )}.default`}
                    >
                      {`${region.percentComplete}% Complete`}
                    </Badge>
                    <Text fontSize='sm' fontWeight='semibold'>
                      {region.heading}
                    </Text>
                    <Text fontSize='sm' mt={2} mb={4}>
                      {region.subheading}
                    </Text>
                    <VStack mt={2} justify='start' align='start'>
                      <NextLink
                        passHref
                        href={`/wiki/locations/${region.slug.current}/${region?.notableBuild?.slug?.current}`}
                      >
                        <HStack as='a' spacing={1}>
                          <Text
                            fontWeight='semibold'
                            fontSize='xs'
                            textTransform='uppercase'
                          >
                            {`Notable Build: ${region?.notableBuild?.title}`}
                          </Text>
                          <ArrowUpRightIcon />
                        </HStack>
                      </NextLink>
                      <NextLink
                        passHref
                        href={`/wiki/locations/${region.slug.current}/${region.recentlyUpdated?.slug?.current}`}
                      >
                        <HStack as='a' spacing={1}>
                          <Text
                            fontWeight='semibold'
                            fontSize='xs'
                            textTransform='uppercase'
                          >
                            {`Last Updated: ${region?.recentlyUpdated?.title}`}
                          </Text>
                          <ArrowUpRightIcon />
                        </HStack>
                      </NextLink>
                    </VStack>
                  </Box>
                  <Box>
                    <ChakraNextImage
                      src={
                        region?.image?.url ||
                        "https://via.placeholder.com/300x225"
                      }
                      alt={`${region?.name}`}
                      placeholder='blur'
                      blurDataURL={region?.image?.metadata.lqip!}
                      width={300}
                      height={225}
                      loader={myLoader}
                    />
                  </Box>
                </Stack>
              </GridItem>
            </Grid>
          ))}
      </Stack>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData =
    await sanityClient.fetch(`*[_type == "page" && slug.current == "locations"]{
    ...,
    "regions": *[_type == "region"]{
      slug,
      name,
      heading,
      subheading,
      ordinal,
      notableBuild->{title, slug},
      "percentComplete": round(count(*[_type == "location" && region._ref == ^._id && projectStatus == "completed"]) * 100 / count(*[_type == "location" && region._ref == ^._id])),
      "recentlyUpdated": *[ _type == "location" && region._ref == ^._id ] { title, _updatedAt, slug } | order(dateTime(_updatedAt) asc) [0] {...},
      "image": image.asset->{
        url,
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

LocationsPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};

export default LocationsPage;
