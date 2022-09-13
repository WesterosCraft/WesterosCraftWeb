import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import * as React from 'react';
import { OtherGuides } from '../../pages/join';
import { slugify } from '../../utils';
import { ContainerBorder } from '../ContainerBorder';
import { PricingCard } from './PricingCard';

export const TwoTiers = ({ data }: { data: OtherGuides[] }) => {
  return (
    <ContainerBorder py="20">
      <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box maxW="2xl" mx="auto" textAlign={{ sm: 'center' }}>
          <Heading as="h1" size="3xl" fontWeight="extrabold" letterSpacing="tight">
            Other Ways To Join
          </Heading>
          <Text mt="6" fontSize="xl" color="gray.600">
            {`Don't want to download a third party program or for running into issues getting them to
            work? There are other options for you!`}
          </Text>
        </Box>
        <SimpleGrid
          alignItems="flex-start"
          mt="16"
          columns={{ base: 1, lg: 2 }}
          spacing="10"
          gridTemplateRows="1fr"
        >
          {data?.map(guide => (
            <PricingCard
              key={guide?.title}
              name={guide?.title}
              description={guide?.description}
              icon={guide?.icon?.asset?.url}
              url={`/wiki/guides/${slugify(guide?.guideCategory?.title)}/${guide?.slug?.current}`}
            />
          ))}
        </SimpleGrid>
      </Box>
    </ContainerBorder>
  );
};
