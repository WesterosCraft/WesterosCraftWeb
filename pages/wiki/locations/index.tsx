import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Text, Heading, Box, chakra, SimpleGrid } from '@chakra-ui/react';
import { sanityClient } from '../../../lib/sanity.server';
import { NextSeo } from 'next-seo';
import { RegionCard } from '../../../components/RegionCard/RegionCard';
import { WikiLayout } from '../../../components/Layout/WikiLayout';
import { urlForImage } from '../../../lib/sanity.image';

export interface RegionsPage {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  copy: string;
  regions: Region[];
  slug: Slug;
  title: string;
}

export interface Region {
  heading: string;
  image: Image;
  icon: Image;
  name: string;
  notableBuild: NotableBuild;
  ordinal: number;
  percentComplete: number;
  recentlyUpdated: RecentlyUpdated;
  slug: Slug;
  subheading: string;
}

export interface Image {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export interface NotableBuild {
  slug: Slug;
  title: string;
}

export interface Slug {
  _type: Type;
  current: string;
}

export enum Type {
  Slug = 'slug',
}

export interface RecentlyUpdated {
  _updatedAt: Date;
  slug: Slug;
  title: string;
}

function LocationsPage({ pageData }: { pageData: RegionsPage }) {
  return (
    <>
      <NextSeo title={pageData?.title} description={pageData?.copy} />
      <Box>
        <Box textAlign={{ base: 'center', md: 'left' }} mx="auto" mb={12}>
          <Heading size="2xl" mb={5}>
            <chakra.span fontSize="3xl">The</chakra.span> Regions{' '}
            <chakra.span fontSize="3xl">of</chakra.span> WesterosCraft
          </Heading>

          <Text maxW="2xl">{pageData?.copy}</Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} gridAutoRows="1fr" gap="12">
          {pageData?.regions
            .sort((a, b) => a.ordinal - b.ordinal)
            .map(region => (
              <RegionCard
                key={region.name}
                name={region.name}
                heading={region.heading}
                description={region.subheading}
                image={urlForImage(region?.image).url()}
                icon={region?.icon ? urlForImage(region?.icon).url() : undefined}
                slug={region.slug.current}
                percentComplete={region.percentComplete}
                blurDataURL={region.image.metadata.lqip}
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
        </SimpleGrid>
      </Box>
    </>
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
        _id,
        _rev,
        metadata {
          lqip
        }
      },
      "icon": icon.asset->{
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
    revalidate: 60,
  };
};

LocationsPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};

export default LocationsPage;
