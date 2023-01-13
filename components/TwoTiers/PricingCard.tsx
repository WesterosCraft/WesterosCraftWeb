import * as React from 'react';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  FlexProps,
  HStack,
  Img,
  Spacer,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface PriceDisplayProps extends FlexProps {
  currency: string;
  price: number;
  duration: string;
}

interface PricingCardProps extends BoxProps {
  name: string;
  description: string;
  icon: string;
  onClick?: () => void;
  url: string;
}

export const PricingCard = (props: PricingCardProps) => {
  const { name, description, onClick, icon, url, ...rest } = props;
  return (
    <Flex
      direction="column"
      bg="white"
      border="1px solid"
      borderColor="primaryDark"
      w="full"
      maxW="lg"
      mx="auto"
      overflow="hidden"
      height="full"
      {...rest}
    >
      <HStack align="flex-start" px="8" py="8" spacing="4">
        <Img src={icon} alt="Guide icon" width="52px" height="52px" display={['none', 'block']} />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          <Text>{description}</Text>
        </Box>
      </HStack>
      <Spacer />
      <Box px="8" py="12">
        <NextLink href={url} passHref>
          <Button
            onClick={onClick}
            size="lg"
            w="full"
            bg="black"
            color="white"
            _hover={{ bg: 'blackAlpha.700' }}
          >
            View Guide
          </Button>
        </NextLink>
      </Box>
    </Flex>
  );
};
