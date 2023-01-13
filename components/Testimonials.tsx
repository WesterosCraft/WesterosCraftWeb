import { Box, Flex, StackDivider, Text, Spacer, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { child, container } from '../constants/animation';
import { CloseQuoteIcon } from './Icons/CloseQuoteIcon';
import { OpenQuoteIcon } from './Icons/OpenQuoteIcon';
import { SquareTexture } from './SquareTexture';

export interface TestimonialsProps {
  testimonials: Testimonial[];
}

export interface Testimonial {
  _key: string;
  _type: string;
  author: string;
  position: string;
  quote: string;
}

export const Testimonials = ({ testimonials }: TestimonialsProps) => (
  <Box bg="primaryRed" w="full" className="videoFeature" position="relative">
    <SquareTexture />
    <Box mx="auto" py={{ base: '10', md: '12' }} px={[2, null, 4]} className="container">
      <Stack
        as={motion.div}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        // @ts-ignore
        transition={{ delay: 0.3 }}
        direction={{ base: 'column', lg: 'row' }}
        w="full"
        justify="space-between"
        align="center"
        divider={<StackDivider borderColor="white" />}
      >
        {testimonials.map((testi, i) => (
          <Stack
            as={motion.div}
            variants={child}
            viewport={{ once: true, margin: '-100px' }}
            mx="auto"
            direction={{ base: 'column' }}
            spacing={{ base: 6, lg: 10 }}
            key={i}
            color="white"
            w="full"
            maxW="xl"
            px={6}
            py={4}
            position="relative"
            zIndex={2}
            alignItems="center"
            justifyItems="center"
          >
            <Box position="relative">
              <OpenQuoteIcon fill="whiteAlpha.600" boxSize={8} />
              <Text textAlign="center">{testi.quote}</Text>
              <Flex w="full">
                <Spacer />
                <CloseQuoteIcon fill="whiteAlpha.600" boxSize={8} />
              </Flex>
            </Box>
            <Box textAlign={{ base: 'center', lg: 'right' }} w="full">
              <Text fontWeight="medium">{`- ${testi.author}`}</Text>
              <Text>{testi.position}</Text>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  </Box>
);
