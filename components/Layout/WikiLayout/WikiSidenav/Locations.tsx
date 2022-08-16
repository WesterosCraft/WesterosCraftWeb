import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  useBreakpointValue,
  Text,
  HStack,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { LOCATIONS } from '../../../../constants/locations';
import { toLower, startCase } from 'lodash';
import { useRouter } from 'next/router';
import { NavItem } from '../NavItem';
import { NavGroup } from '../NavGroup';

export const LocationsAccordion = () => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const locationsByRegion = LOCATIONS.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.region.slug.current]) {
      acc[value.region.slug.current] = [];
    }

    // Grouping
    acc[value.region.slug.current].push(value);

    return acc;
  }, {} as any);

  const sortedLocations = Object.entries(locationsByRegion).sort();

  const activeStyles = {
    backgroundColor: 'primaryGlare',
    color: 'blackAlpha.800',
  };

  const focusStyles = {
    boxShadow: 'none',
  };

  const hoverStyles = {
    backgroundColor: 'primaryShade',
  };

  return (
    <Accordion
      allowToggle
      //   index={
      //     !!isMobile
      //       ? Array.from(Array(sortedLocations.length).keys())
      //       : sortedLocations.findIndex(loc => router.asPath?.includes(loc?.[0]))
      //   }
    >
      {sortedLocations.map(([key, value], i) => (
        <AccordionItem key={i} border={0}>
          <AccordionButton _hover={{ bg: 'primaryDarkGlare' }}>
            <NavGroup label={startCase(toLower(key))} />
          </AccordionButton>

          <AccordionPanel px={4}>
            <Stack spacing="1">
              {/* @ts-ignore */}
              {value?.map((loc: any, i) => (
                <NavItem key={i} label={loc.title} />
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
