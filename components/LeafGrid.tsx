import Side1 from '../public/side1.png';
import Side2 from '../public/side2.png';
import Side3 from '../public/side3.png';
import { HStack, Img } from '@chakra-ui/react';

export const LeafGrid = () => (
  <HStack spacing={8} mx="auto">
    <Img boxSize={'64px'} src={Side2.src} />
    <Img boxSize={'64px'} src={Side1.src} />
    <Img boxSize={'64px'} src={Side3.src} />
  </HStack>
);
