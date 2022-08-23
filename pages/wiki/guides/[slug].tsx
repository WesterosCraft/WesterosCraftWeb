import { Box, Heading } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { WikiLayout } from '../../../components/Layout/WikiLayout';
import { sanityClient } from '../../../lib/sanity.server';

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
    <Box>
      <Heading>{pageData?.title}</Heading>
    </Box>
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
  const allGuides = await sanityClient.fetch(`*[_type=="guide"] { slug, region->{ slug } }`);
  const paths = allGuides?.map((guide: any) => ({
    params: {
      slug: guide?.slug?.current,
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
