import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import * as React from 'react';
import { ContainerBorder } from '../ContainerBorder';
import { PricingCard } from './PricingCard';

const data = [
  {
    name: 'GDLauncher',
    description:
      'GDLauncher is a simple Minecraft custom launcher with a strong focus on the user experience.',
    features: [
      'Modern and easy to use UI',
      `Browse and Download CurseForge's Modpacks`,
      'Support for Vanilla, Forge and Fabric',
    ],
    buttonText: 'View Guide',
  },
  {
    isRecommended: true,
    name: 'CurseForge/Twitch',
    description:
      'Dedicated app for handling mods and addons, not just for Minecraft but other games as well.',
    features: [
      'Quick and responsive',
      `Supports mod authors`,
      'Connected to central modpack repository',
      'Built in mods manager',
      'Auto java setup',
    ],
    buttonText: 'View Guide',
  },
  {
    name: 'MultiMC',
    description:
      'MultiMC allows for multiple, separated instances of Minecraft and helps you manage them.',
    features: [
      'Extremely lightweight',
      `Easy installation of common mod loaders`,
      'Import modpacks from many platforms',
    ],
    buttonText: 'View Guide',
  },
];

export const PricingTiers = () => (
  <ContainerBorder variant="dark" pb={{ base: '32' }}>
    <SimpleGrid
      columns={{ base: 1, lg: 3 }}
      spacing={{ base: '8', lg: '0' }}
      mx="-6"
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
            features: card.features,
          }}
          button={
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
              {card.buttonText}
            </Button>
          }
        />
      ))}
    </SimpleGrid>
  </ContainerBorder>
);
