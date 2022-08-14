import { Flex, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { SquareCheckIcon } from '../Icons/SquareCheckIcon';
import { Card, CardProps } from './Card';

export interface PricingCardData {
  features: string[];
  name: string;
  description: string;
}

interface PricingCardProps extends CardProps {
  data: PricingCardData;
  button: React.ReactElement;
}

export const PricingCard = (props: PricingCardProps) => {
  const { data, button, ...rest } = props;
  const { features, description, name } = data;

  return (
    <Card {...rest}>
      <VStack spacing={6}>
        <Text color="primaryGold" fontSize="2xl" fontWeight="extrabold">
          {name}
        </Text>
      </VStack>
      <Flex textAlign="center" align="flex-end" justify="center" fontWeight="medium" my="8">
        <Text size="md">{description}</Text>
      </Flex>
      <List spacing="4" mb="8" maxW="28ch" mx="auto">
        {features.map((feature, index) => (
          <ListItem key={index}>
            <ListIcon fontSize="xl" as={SquareCheckIcon} marginEnd={2} fill="primaryGold" />
            {feature}
          </ListItem>
        ))}
      </List>
      {button}
    </Card>
  );
};
