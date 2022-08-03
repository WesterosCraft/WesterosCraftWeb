import type { ReactElement } from "react";
import React from "react";
import { GetStaticProps } from "next";
import {
  Flex,
  Container,
  Table,
  Td,
  Thead,
  Th,
  chakra,
  Tbody,
  Tr,
} from "@chakra-ui/react";
import { OneColumnLayout } from "../components";
import { sanityClient } from "../lib/sanity.server";
import { useTable, useSortBy } from "react-table";
import ProgressTable from "../components/ProgressTable";
export default function Progress({ allLocations }: any) {
  return (
    <Container px={0} w='full' centerContent maxW='container.xl'>
      <Flex w='full' as='section' direction='row'>
        <ProgressTable data={allLocations} />
      </Flex>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData =
    await sanityClient.fetch(`*[_type == "page" && slug.current == "progress"]{
    ...,
    "regions": *[_type == "region"]{
      slug,
      name,
      ordinal,
      "numberOfBuilds": round(count(*[_type == "location" && region._ref == ^._id])),
    },
    "buildTypes": *[_type == "buildCategory"]{
      title,
    }
  }[0]`);
  const allLocations =
    await sanityClient.fetch(`*[_type == 'location' && defined(slug.current)]{
      slug,
      title,
      region->{ name },
      projectStatus,
      "buildType": buildCategory[0]-> { title }
    }`);

  return {
    props: {
      pageData,
      allLocations,
    },
  };
};

Progress.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
