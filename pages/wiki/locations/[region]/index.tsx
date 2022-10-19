import type { ReactElement } from 'react';
import { Heading, Box, SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { sanityClient } from '../../../../lib/sanity.server';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { NextSeo } from 'next-seo';
import { WikiLayout } from '../../../../components/Layout/WikiLayout';
import { LocationCard } from '../../../../components/LocationCard';
import { urlFor } from '../../../../lib/sanity';
export interface RegionPageData {
  locations: Location[];
  name: string;
}

export interface Location {
  extendedBuildCategory: ExtendedBuildCategory;
  extendedImage: ExtendedImage | null;
  house: string;
  projectStatus: string;
  region: Region;
  slug: Slug;
  title: string;
}

export interface ExtendedBuildCategory {
  title: string;
}

export interface ExtendedImage {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export interface Region {
  slug: Slug;
}

export interface Slug {
  _type: Type;
  current: string;
}

export enum Type {
  Slug = 'slug',
}

const RegionPage = ({ pageData }: { pageData: RegionPageData }) => {
  return (
    <>
      <NextSeo title={pageData?.name} />
      <Box>
        <Breadcrumbs />
        <Heading size="2xl" mb={12}>
          {pageData?.name}
        </Heading>
        <SimpleGrid minChildWidth="292px" spacing="24px">
          {pageData?.locations?.map(loc => (
            <LocationCard
              key={loc?.title}
              title={loc?.title}
              category={loc?.extendedBuildCategory?.title}
              image={loc.extendedImage?._rev ? urlFor(loc.extendedImage).url() : undefined}
              blurDataURL={loc.extendedImage?._rev ? loc.extendedImage.metadata.lqip : undefined}
              link={`${loc?.region?.slug?.current}/${loc?.slug?.current}`}
              projectStatus={loc?.projectStatus}
              house={loc?.house}
            />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

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
        _rev,
        _id,
        metadata {
          lqip
        }
      },
      "extendedBuildCategory": buildCategory[0]-> { title }
      }
    }`,
    { slug: params?.region },
  );

  return {
    props: {
      pageData,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(
    `*[_type == "region"] {
        slug
     }`,
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
