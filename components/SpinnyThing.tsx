import { Center, Img } from '@chakra-ui/react';
import Base from '../public/spinnythingbase.png';
import Spokes from '../public/spinnythingspokes.png';
import { motion } from 'framer-motion';

export const SpinnyThing = () => (
  <Center position="relative" w={232}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ ease: 'linear', duration: 8, loop: Infinity }}
    >
      <Img src={Spokes.src} />
    </motion.div>
    <Img
      maxW={175}
      src={Base.src}
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    />
  </Center>
);
