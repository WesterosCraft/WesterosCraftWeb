import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { ReactElement } from 'react';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { GuideCard } from '../../../../components/GuideCard';
import { WikiLayout } from '../../../../components/Layout/WikiLayout';
import { sanityClient } from '../../../../lib/sanity.server';

export interface GuidesPageData {
  _id: string;
  description: null;
  guideCategory: GuideCategory;
  icon: Icon;
  slug: Slug;
  title: string;
}

export interface GuideCategory {
  _type: string;
  title: string;
}

export interface Icon {
  _type: string;
  asset: Asset;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Slug {
  _type: string;
  current: string;
}

const GuideCategoryPage = ({ pageData }: { pageData: GuidesPageData[] }) => {
  return (
    <>
      <NextSeo title={pageData?.[0]?.guideCategory?.title} />
      <Box>
        <Breadcrumbs />
        <Heading size="2xl" mb={12}>
          {pageData?.[0]?.guideCategory?.title}
        </Heading>
        <SimpleGrid minChildWidth="292px" spacing="24px">
          {pageData?.map(guide => (
            // @ts-ignore
            <GuideCard key={guide?._id} {...guide} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

function unslugify(slug: string) {
  const result = slug.replace(/\-/g, ' ');
  return result.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await sanityClient.fetch(
    `*[_type == "guide" && guideCategory->title == $slug]{
      _id,
      title,
      description,
      guideCategory->{ title, _type },
      slug,
      icon
    }`,
    { slug: unslugify(params?.category as string) },
  );

  return {
    props: {
      pageData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(
    `*[_type == "category" && parent->title == $keyword] {
      title
   }`,
    { keyword: 'Guide Type' },
  );

  return {
    paths: paths.map((item: any) => ({
      params: { category: item?.title },
    })),
    fallback: true,
  };
};

GuideCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};

export default GuideCategoryPage;
