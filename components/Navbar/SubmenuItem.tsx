import { Flex, HStack, Text, StackProps } from '@chakra-ui/react';
import * as React from 'react';
import NextImage from 'next/image';
import PykeIcon from '../../public/icons/pyke96.png';
import NightsWatchIcon from '../../public/icons/nightswatch96.png';
import DreadfortIcon from '../../public/icons/dreadfort96.png';
import CasterlyRockIcon from '../../public/icons/casterlyrock96.png';
import StormsEndIcon from '../../public/icons/stormsend96.png';
import SummerhallIcon from '../../public/icons/summerhall96.png';
import HighgardenIcon from '../../public/icons/highgarden96.png';
import SunspearIcon from '../../public/icons/sunspear96.png';

interface SubmenuItemProps extends StackProps {
  title: string;
  icon?: 'pyke' | 'nightswatch' | 'dreadfort' | 'casterlyrock' | 'stormsend';
  children: React.ReactNode;
}

export const SubmenuItem = ({ title, icon, children, ...rest }: SubmenuItemProps) => {
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
    <HStack
      cursor="pointer"
      spacing={3}
      align="flex-start"
      p="3"
      _hover={{ bg: 'primaryDarkGlare2' }}
      {...rest}
    >
      <NextImage width="36px" height="36px" src={iconMap[icon ?? 'default']} />

      <Flex display="flex" direction="column" transition="all 0.2s" _focus={{ shadow: 'outline' }}>
        <Text fontWeight="semibold" color="white">
          {title}
        </Text>

        <Text color="gray.300">{children}</Text>
      </Flex>
    </HStack>
  );
};
