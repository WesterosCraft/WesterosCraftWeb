import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { WikiLayout } from '../../../../components/Layout/WikiLayout';
import { sanityClient } from '../../../../lib/sanity.server';
import { NextSeo } from 'next-seo';
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import { RichText } from '../../../../components/RichText';
import { slugify } from '../../../../utils';
import { isEmpty } from 'lodash';
import { PageBuilderZone } from '../../../../components/PageBuilderZone';

export interface GuidePage {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  body: Body[];
  description: string;
  guideCategory: GuideCategory;
  icon: Icon;
  pageBuilder: any[];
  slug: Slug;
  title: string;
}

export interface Body {
  _key: string;
  _type: BodyType;
  children?: Child[];
  markDefs?: MarkDef[];
  style?: Style;
  text?: string;
  asset?: GuideCategory;
}

export enum BodyType {
  Block = 'block',
  Callout = 'callout',
  File = 'file',
}

export interface GuideCategory {
  _ref: string;
  _type: string;
}

export interface Child {
  _key: string;
  _type: ChildType;
  marks: string[];
  text: string;
}

export enum ChildType {
  Span = 'span',
}

export interface MarkDef {
  _key: string;
  _type: string;
  href: string;
}

export enum Style {
  H4 = 'h4',
  Normal = 'normal',
}

export interface Icon {
  _type: string;
  asset: GuideCategory;
}

export interface Slug {
  _type: string;
  current: string;
}

export default function GuidePage({ pageData }: { pageData: GuidePage }) {
  return (
    <>
      <NextSeo title={pageData?.title} />
      <Box>
        <Breadcrumbs />
        <Heading size="2xl" mb={12}>
          {pageData?.title}
        </Heading>
      </Box>
      <Container px={0} maxW="container.xl" className="rich-text-container">
        {pageData?.body ? (
          <RichText value={pageData?.body} />
        ) : (
          isEmpty(pageData?.pageBuilder) && (
            <>
              <Text>Guide content coming soon!</Text>
            </>
          )
        )}
        {pageData?.pageBuilder.map((item, i) => (
          <PageBuilderZone key={i} {...item} />
        ))}
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageData = await sanityClient.fetch(
    `*[_type=="guide" && slug.current == $slug][0]{
        ...
      }`,
    {
      slug: params?.slug,
    },
  );

  return {
    props: {
      pageData,
    },
  };
};

export const getStaticPaths = async () => {
  const allGuides = await sanityClient.fetch(`*[_type=="guide"] {
    slug,
    guideCategory->{
      title, _type
    }
   }`);

  const paths = allGuides?.map((guide: any) => ({
    params: {
      slug: guide?.slug?.current,
      category: slugify(guide?.guideCategory?.title),
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

GuidePage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};
