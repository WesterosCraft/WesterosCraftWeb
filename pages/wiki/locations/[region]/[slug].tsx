import type { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import { Heading, Box, Text, Container, Spacer } from '@chakra-ui/react';
import { sanityClient } from '../../../../lib/sanity.server';
import { ChakraNextImage } from '../../../../components/ChakraNextImage';
import { ProjectDetails } from '../../../../components/ProjectDetails';
import { RichText } from '../../../../components/RichText';
import BrightSquares from '../../../../public/bright-squares.png';
import { isEmpty } from 'lodash';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { WikiLayout } from '../../../../components/Layout/WikiLayout';
import { NextSeo } from 'next-seo';

export interface LocationPageProps {
  pageData: any;
}

const LocationPage = ({ pageData }: LocationPageProps) => {
  return (
    <>
      <NextSeo title={pageData?.title} />
      <Box>
        <Breadcrumbs />
        <Heading mb={4}>{pageData?.title}</Heading>
        <WikiHero pageData={pageData} />
      </Box>
      <Box className="content-wrapper">
        <ProjectDetails
          pageData={pageData}
          display={['inline-flex', null, null, null, null]}
          className="page-project-details"
          ml={[0, null, 3]}
          float={['none', null, 'right']}
          mb={3}
          width={['full', null, 'auto']}
        />
        <Container px={0} maxW="container.xl" className="rich-text-container">
          {pageData?.body ? (
            <RichText value={pageData?.body} />
          ) : (
            <Text>Wiki content coming soon!</Text>
          )}
          <Spacer display={{ base: 'none', xl: 'flex', '2xl': 'none' }} h="10" />
        </Container>
      </Box>
    </>
  );
};

const myLoader = ({ src = '', width = 976 }) => {
  return `${src}?fit=crop&auto=format&crop=center&h=350&w=${width}&q=90`;
};

const WikiHero = ({ pageData }: LocationPageProps) => {
  const hasImage = !isEmpty(pageData?.additionalImages);

  if (!hasImage) {
    return null;
  }

  return (
    <Box
      position="relative"
      backgroundImage={!hasImage ? `url(${BrightSquares.src})` : undefined}
      maxHeight="350px"
      width="100%"
      overflow="hidden"
    >
      {pageData?.bannerImage?.url && (
        <Box
          zIndex="1"
          color="white"
          position="absolute"
          bottom={[2, null, 5]}
          left={[2, null, 5]}
          filter="drop-shadow(15px 11px 6px rgb(41, 41, 43, .80))"
          maxW={[45, 65, null, 75]}
        >
          <ChakraNextImage
            src={pageData?.bannerImage?.url}
            alt={`${pageData?.title} Banner`}
            placeholder="blur"
            blurDataURL={pageData?.bannerImage?.metadata.lqip!}
            width={75}
            height={150}
          />
        </Box>
      )}
      {pageData?.additionalImages?.[0]?.url && (
        <ChakraNextImage
          src={pageData?.additionalImages?.[0]?.url}
          alt={pageData?.title}
          placeholder="blur"
          blurDataURL={pageData?.additionalImages?.[0]?.metadata?.lqip!}
          width={976}
          height={350}
          loader={myLoader}
        />
      )}
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await sanityClient.fetch(
    `*[_type=="location" && slug.current == $slug][0]{
      ...,
      region->{ name },
      "additionalImages": additionalImages.images[].asset->{
        url,
        metadata {
          lqip
        }
      },
      "bannerImage": bannerImage.asset->{
        url,
        metadata {
          lqip
        }
      }
    }`,
    {
      slug: params?.slug,
    },
  );

  return {
    props: {
      pageData,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const allLocations = await sanityClient.fetch(`*[_type=="location"] { slug, region->{ slug } }`);
  const paths = allLocations?.map((location: any) => ({
    params: {
      slug: location?.slug?.current,
      region: location?.region?.slug?.current,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

LocationPage.getLayout = function getLayout(page: ReactElement) {
  const { pageData } = page?.props as LocationPageProps;
  return (
    <WikiLayout
      rightNav={
        <ProjectDetails
          pageData={pageData}
          as="nav"
          role="navigation"
          position="fixed"
          right={0}
          top={12}
          pt={10}
          pr={5}
          maxW={96}
        />
      }
    >
      {page}
    </WikiLayout>
  );
};

export default LocationPage;
