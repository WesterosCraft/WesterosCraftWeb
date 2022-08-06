import Side1 from '../public/leaves/leaves_1.png';
import Side2 from '../public/leaves/leaves_2.png';
import Side3 from '../public/leaves/leaves_3.png';
import { HStack, Img } from '@chakra-ui/react';

export const LeafGrid = () => (
  <HStack justify="center" spacing={8} mx="auto">
    <Img boxSize={'64px'} src={Side2.src} />
    <Img boxSize={'64px'} src={Side1.src} />
    <Img boxSize={'64px'} src={Side3.src} />
  </HStack>
);
