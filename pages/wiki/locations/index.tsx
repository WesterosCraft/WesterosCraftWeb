import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
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
} from '@chakra-ui/react';
import { camelCase } from 'lodash';
import NextLink from 'next/link';
import { WikiLayout } from '../../../components';
import { sanityClient } from '../../../lib/sanity.server';
import { ArrowUpRightIcon } from '../../../components/Icons/ArrowUpRight';
import { LocationPageResponse } from '../../../types';
import { ChakraNextImage } from '../../../components/ChakraNextImage';
import { NextSeo } from 'next-seo';
import { WikiLayoutNew } from '../../../components/Layout/WikiLayout/WikiLayout';
import { RegionCard } from '../../../components/RegionCard/RegionCard';

function LocationsPage({ pageData }: { pageData: LocationPageResponse }) {
  console.log('👾 ~ LocationsPage ~ pageData', pageData);
  return (
    <Container maxW="container.lg" px={[5, 12]}>
      <NextSeo title={pageData?.title} description={pageData?.copy} />
      <Box mb={12} textAlign="center">
        <Heading size="2xl" mb={5}>
          <chakra.span fontSize="3xl">The</chakra.span> Regions{' '}
          <chakra.span fontSize="3xl">of</chakra.span> WesterosCraft
        </Heading>

        <Text>{pageData?.copy}</Text>
      </Box>
      <Stack spacing={5}>
        {pageData?.regions
          .sort((a, b) => a.ordinal - b.ordinal)
          .map(region => (
            <RegionCard
              key={region.name}
              name={region.name}
              heading={region.heading}
              description={region.subheading}
              image={region?.image?.url}
              slug={region.slug.current}
              percentComplete={region.percentComplete}
              notableBuild={{
                link: `/wiki/locations/${region.slug.current}/${region?.notableBuild?.slug?.current}`,
                title: region?.notableBuild?.title,
              }}
              recentlyUpdated={{
                link: `/wiki/locations/${region.slug.current}/${region?.recentlyUpdated?.slug?.current}`,
                title: region?.recentlyUpdated?.title,
              }}
            />
          ))}
      </Stack>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await sanityClient.fetch(`*[_type == "page" && slug.current == "locations"]{
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
  return <WikiLayoutNew>{page}</WikiLayoutNew>;
};

export default LocationsPage;
