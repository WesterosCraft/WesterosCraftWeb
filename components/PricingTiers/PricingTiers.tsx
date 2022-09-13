import { Button, SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import { Guide } from '../../pages/join';
import { ContainerBorder } from '../ContainerBorder';
import { PricingCard } from './PricingCard';
import NextLink from 'next/link';
import { slugify } from '../../utils';

export const PricingTiers = ({ data }: { data: Guide[] }) => (
  <ContainerBorder variant="dark" pb={{ base: '32' }}>
    <SimpleGrid
      columns={{ base: 1, lg: 3 }}
      spacing={{ base: '8', lg: '0' }}
      mx={['0', null, null, null, '-6']}
      justifyItems="center"
      alignItems="center"
    >
      {data.map(card => (
        <PricingCard
          key={card.name}
          isRecommended={card?.isRecommended ?? false}
          transform={{ lg: card?.isRecommended ? 'scale(1.05)' : undefined }}
          zIndex={card?.isRecommended ? '1' : undefined}
          data={{
            description: card.description,
            name: card.name,
            features: card.features.split(','),
          }}
          button={
            <NextLink
              href={`wiki/guides/${slugify(card?.guideRef?.guideCategory?.title)}/${
                card?.guideRef?.slug?.current
              }`}
              passHref
            >
              <a>
                <Button
                  bg="primaryRed"
                  size="lg"
                  w="full"
                  fontWeight="extrabold"
                  py={{ md: '8' }}
                  borderWidth="1.5px"
                  _hover={{
                    color: 'primaryRed',
                    bg: 'white',
                  }}
                >
                  View Guide
                </Button>
              </a>
            </NextLink>
          }
        />
      ))}
    </SimpleGrid>
  </ContainerBorder>
);
