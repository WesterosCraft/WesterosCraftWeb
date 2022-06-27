import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { LOCATIONS } from "../../../constants/locations";
import { toLower, startCase } from "lodash";
import { useRouter } from "next/router";

interface LocationsAccordionProps {
  onNavigate?: () => void;
}

export const LocationsAccordion = ({ onNavigate }: LocationsAccordionProps) => {
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
    backgroundColor: "primaryGlare",
    color: "blackAlpha.800",
  };

  const focusStyles = {
    boxShadow: "none",
  };

  const hoverStyles = {
    backgroundColor: "primaryShade",
  };

  return (
    <>
      <Link passHref href={`/locations`}>
        <a>
          <Button
            _focus={focusStyles}
            pl={5}
            borderTopLeftRadius={0}
            borderBottomLeftRadius={0}
            borderTopRightRadius={[0, null, null, "md"]}
            borderBottomRightRadius={[0, null, null, "md"]}
            variant='ghost'
            display='flex'
            width='full'
            justifyContent='flex-start'
            isActive={router.pathname === "/locations"}
            _active={activeStyles}
            _hover={hoverStyles}
            onClick={isMobile ? () => onNavigate?.() : undefined}
          >
            Regions
          </Button>
        </a>
      </Link>
      <Accordion
        allowToggle
        index={
          !!isMobile
            ? Array.from(Array(sortedLocations.length).keys())
            : sortedLocations.findIndex((loc) =>
                router.asPath?.includes(loc?.[0])
              )
        }
      >
        {sortedLocations.map(([key, value], i) => (
          <AccordionItem key={i} border={0}>
            <Link passHref href={`/locations/${key}`}>
              <h2>
                <AccordionButton
                  pl={5}
                  borderTopLeftRadius={0}
                  borderBottomLeftRadius={0}
                  borderTopRightRadius={[0, null, null, "md"]}
                  borderBottomRightRadius={[0, null, null, "md"]}
                  as={Button}
                  variant='ghost'
                  isActive={router.asPath.split("/").pop() === key}
                  _focus={focusStyles}
                  _active={activeStyles}
                  _hover={hoverStyles}
                  onClick={isMobile ? () => onNavigate?.() : undefined}
                >
                  <Box flex='1' textAlign='left'>
                    {startCase(toLower(key))}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
            </Link>
            <AccordionPanel p={0}>
              {/* @ts-ignore */}
              {value?.map((loc: any, i) => (
                <Link
                  key={i}
                  passHref
                  href={`/locations/${key}/${loc?.slug?.current}`}
                >
                  <a>
                    <Button
                      _active={activeStyles}
                      _focus={focusStyles}
                      display='flex'
                      width='full'
                      justifyContent='flex-start'
                      pl={8}
                      borderTopLeftRadius={0}
                      borderBottomLeftRadius={0}
                      borderTopRightRadius={[0, null, null, "md"]}
                      borderBottomRightRadius={[0, null, null, "md"]}
                      variant='ghost'
                      _hover={hoverStyles}
                      onClick={isMobile ? () => onNavigate?.() : undefined}
                      isActive={
                        router.asPath.split("/").pop() === loc?.slug?.current
                      }
                    >
                      {loc.title}
                    </Button>
                  </a>
                </Link>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
