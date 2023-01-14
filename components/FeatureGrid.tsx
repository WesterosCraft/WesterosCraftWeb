import { Box, Text, Center, chakra } from '@chakra-ui/react';
import NextImage from 'next/image';
import { container, child } from '../constants/animation';
import { urlForImage } from '../lib/sanity.image';
import { ContainerBorder } from './ContainerBorder';
import { MotionBox } from './MotionBox';

export interface FeatureGridProps {
  features: Feature[];
}

export interface Feature {
  _key: string;
  _type: string;
  banner: Banner;
  heading: string;
  subheading: string;
}

export interface Banner {
  _id: string;
  _rev: string;
  metadata: Metadata;
}

export interface Metadata {
  lqip: string;
}

export const FeatureGrid = ({ features }: FeatureGridProps) => {
  return (
    <ContainerBorder variant="dark" pt={['20', '24']} pb={['24', '32']} px="4">
      <MotionBox
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <Center textAlign="center" maxW="2xl" mx="auto" mb="24" px="4">
          <Text color="white" fontSize={['lg', null, 'xl']}>
            <chakra.span color="primaryGold">WesterosCraft</chakra.span> is a modded server where
            visitors can explore the entire continent of Westeros and are free to join the community
            of builders bringing it to life. Wander the streets of King’s Landing or the fields of
            Highgarden. Take a flight through the deadly Moon Door, or even retrace the steps of
            your favorite character.
          </Text>
        </Center>
      </MotionBox>
      <MotionBox
        display="grid"
        gridTemplateColumns={{
          base: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
        }}
        gridRowGap="10"
        gridColumnGap="8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((feature, index) => (
          <MotionBox
            key={index}
            variants={child}
            p={6}
            viewport={{ once: true, margin: '-100px' }}
            textAlign="center"
          >
            <Center>
              <NextImage
                src={urlForImage(feature?.banner).url()}
                alt="Banner"
                blurDataURL={feature?.banner?.metadata.lqip!}
                width={75}
                height={150}
              />
            </Center>
            <Box maxW="md" color="white" mt={['0', '4', '6']} mx="auto">
              <Text fontWeight="medium" color="primaryGold" fontSize="lg">
                {feature.heading}
              </Text>
              <Text mt={2}>{feature.subheading}</Text>
            </Box>
          </MotionBox>
        ))}
      </MotionBox>
    </ContainerBorder>
  );
};
