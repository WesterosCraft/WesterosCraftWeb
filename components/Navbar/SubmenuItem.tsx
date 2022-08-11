import { Flex, HStack, Img, Link, Text, HTMLChakraProps } from '@chakra-ui/react';
import * as React from 'react';
import NextLink from 'next/link';
import PykeIcon from '../../public/icons/pyke96.png';
import NightsWatchIcon from '../../public/icons/nightswatch96.png';
import DreadfortIcon from '../../public/icons/dreadfort96.png';
import CasterlyRockIcon from '../../public/icons/casterlyrock96.png';
import StormsEndIcon from '../../public/icons/stormsend96.png';
import SummerhallIcon from '../../public/icons/summerhall96.png';
import HighgardenIcon from '../../public/icons/highgarden96.png';
import SunspearIcon from '../../public/icons/sunspear96.png';

interface SubmenuItemProps extends HTMLChakraProps<'a'> {
  title: string;
  icon?: 'pyke' | 'nightswatch' | 'dreadfort' | 'casterlyrock' | 'stormsend';
  isExternal: boolean;
  children: React.ReactNode;
  href: string;
}

export const SubmenuItem = ({
  title,
  icon,
  children,
  href,
  isExternal,
  ...rest
}: SubmenuItemProps) => {
  const iconMap = {
    pyke: PykeIcon.src,
    nightswatch: NightsWatchIcon.src,
    dreadfort: DreadfortIcon.src,
    casterlyrock: CasterlyRockIcon.src,
    stormsend: StormsEndIcon.src,
    summerhall: SummerhallIcon.src,
    highgarden: HighgardenIcon.src,
    sunspear: SunspearIcon.src,
    default: NightsWatchIcon.src,
  };

  return (
    <Link
      as={isExternal ? undefined : NextLink}
      _hover={{
        textDecor: 'none',
      }}
      className="group"
      href={href ?? `/${title}`}
      {...rest}
    >
      <HStack cursor="pointer" spacing={3} align="flex-start" p="3" _hover={{ bg: 'gray.100' }}>
        <Img width={9} height={9} src={iconMap[icon ?? 'default']} />

        <Flex
          display="flex"
          direction="column"
          transition="all 0.2s"
          _focus={{ shadow: 'outline' }}
        >
          <Text fontWeight="semibold" color="primaryDark">
            {title}
          </Text>

          <Text as="dd" color="gray.500">
            {children}
          </Text>
        </Flex>
      </HStack>
    </Link>
  );
};
