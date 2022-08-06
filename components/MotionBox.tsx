import { BoxProps, chakra } from '@chakra-ui/react';
import { motion, HTMLMotionProps, isValidMotionProp } from 'framer-motion';

export const MotionBox = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: prop => isValidMotionProp(prop) || prop === 'children',
});

export type MotionBoxProps = BoxProps & HTMLMotionProps<'div'>;
