import { Center, Text } from '@chakra-ui/react';
import { SquareTexture } from './SquareTexture';

export interface BannerProps {
  _type: string;
  linkText: string;
}

export const Banner = ({ linkText }: BannerProps) => {
  return (
    <Center w="full" bg="primaryRed" px={4} py={6} position="relative">
      <SquareTexture />
      <Text color="white" fontSize="xl">
        {linkText}
      </Text>
    </Center>
  );
};
