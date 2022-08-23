import { Stack, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LOCATIONS } from '../../../../constants/locations';
import { Submenu } from '../../../Navbar/Submenu';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import { NavLink } from '../../../Navbar/NavLink';
import { NavItem } from '../NavItem';
import { NavGroup } from '../NavGroup';

export interface Location {
  region: Region;
  slug: Slug;
  title: string;
}

export interface Region {
  name: string;
  slug: Slug;
}

export interface Slug {
  current: string;
}

const MobileLocationsPanel = () => {
  const locationsByRegion = LOCATIONS.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.region.slug.current]) {
      acc[value.region.slug.current] = [];
    }

    // Grouping
    acc[value.region.slug.current].push(value);

    return acc;
  }, {} as any);

  const sortedLocations = Object.entries(locationsByRegion).sort() as [string, Location[]][];

  return (
    <>
      {sortedLocations.map(([key, value], idx) =>
        value ? (
          <Submenu.Mobile
            key={idx}
            link={{
              title: startCase(toLower(key)),
              links: value?.map(i => ({
                ...i,
                link: { slug: { current: `/wiki/locations/${key}/${i?.slug?.current}` } },
              })),
            }}
          />
        ) : (
          <NextLink key={idx} href={`/wiki/locations/${key}`}>
            <NavLink.Mobile>{startCase(toLower(key))}</NavLink.Mobile>
          </NextLink>
        ),
      )}
    </>
  );
};

const DesktopLocationsPanel = () => {
  const router = useRouter();
  const locationsByRegion = LOCATIONS.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.region.slug.current]) {
      acc[value.region.slug.current] = [];
    }

    // Grouping
    acc[value.region.slug.current].push(value);

    return acc;
  }, {} as any);

  const sortedLocations = Object.entries(locationsByRegion).sort() as [string, Location[]][];

  return (
    <Accordion index={sortedLocations.findIndex(loc => router.asPath?.includes(loc?.[0]))}>
      {sortedLocations.map(([key, value], i) => (
        <AccordionItem key={i} border={0}>
          <NextLink href={`/wiki/locations/${key}`}>
            <a>
              <AccordionButton
                _hover={{ bg: 'primaryDarkGlare' }}
                _activeLink={{ bg: 'primaryDarkGlare' }}
                aria-current={router.query?.region === key ? 'page' : undefined}
              >
                <NavGroup active={router.query?.region === key} label={startCase(toLower(key))} />
              </AccordionButton>
            </a>
          </NextLink>
          <AccordionPanel px={4}>
            <Stack spacing="1">
              {value?.map((loc, i) => (
                <NextLink key={i} href={`/wiki/locations/${key}/${loc?.slug?.current}`}>
                  <a>
                    <NavItem active={router.query?.slug === loc?.slug?.current} label={loc.title} />
                  </a>
                </NextLink>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const LocationsPanel = {
  Mobile: MobileLocationsPanel,
  Desktop: DesktopLocationsPanel,
};
