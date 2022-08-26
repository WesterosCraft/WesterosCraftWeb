import { Box, BoxProps } from '@chakra-ui/react';
import BrightSquares from '../public/bright-squares.png';

export const SquareTexture = (props: BoxProps) => (
  <Box
    userSelect="none"
    position="absolute"
    top="0"
    left="0"
    width="full"
    height="full"
    opacity={0.6}
    backgroundImage={`url(${BrightSquares.src})`}
    {...props}
  />
);
