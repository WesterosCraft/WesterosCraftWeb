import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import * as React from 'react';
import { ContainerBorder } from '../ContainerBorder';
import { PricingCard } from './PricingCard';

export const TwoTiers = () => {
  return (
    <ContainerBorder py="20">
      <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box maxW="2xl" mx="auto" textAlign={{ sm: 'center' }}>
          <Heading as="h1" size="3xl" fontWeight="extrabold" letterSpacing="tight">
            Other Ways To Join
          </Heading>
          <Text mt="6" fontSize="xl" color="gray.600">
            Don't want to download a third party program or for running into issues getting them to
            work? There are other options for you!
          </Text>
        </Box>
        <SimpleGrid alignItems="flex-start" mt="16" columns={{ base: 1, lg: 2 }} spacing="10">
          <PricingCard
            colorScheme="blue"
            name="Guide"
            price={29}
            duration="/ mo"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing."
            features={[
              '50 quod similique',
              '2000 libero doloribus modi nostru',
              'Unlimited basic esse repudiandae exceptur',
              '90 cupiditate adipisci quibusdam',
            ]}
          />
          <PricingCard
            colorScheme="teal"
            name="Guide"
            price={79}
            duration="/ mo"
            description="Lorem ipsum dolor sit amet consectetur, adipisicing."
            features={[
              '100 quod similique',
              '20K libero doloribus modi nostru',
              'Unlimited ipsa esse repudiandae exceptur',
              '9000 cupiditate adipisci quibusdam',
            ]}
          />
        </SimpleGrid>
      </Box>
    </ContainerBorder>
  );
};
