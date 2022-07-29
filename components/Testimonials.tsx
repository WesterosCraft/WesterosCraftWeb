import { Box, Flex, StackDivider, Text, Spacer, Stack } from '@chakra-ui/react';
import { CloseQuoteIcon } from './Icons/CloseQuoteIcon';
import { OpenQuoteIcon } from './Icons/OpenQuoteIcon';
import { SquareTexture } from './SquareTexture';

export interface TestimonialGrid {
  testimonials: Testimonial[];
}

export interface Testimonial {
  _key: string;
  _type: string;
  author: string;
  position: string;
  quote: string;
}

export const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => (
  <Box bg="primaryRed" w="full" className="videoFeature" position="relative">
    <SquareTexture />
    <Box mx="auto" py={{ base: '10', md: '12' }} px={[2, null, 4]} className="container">
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        w="full"
        justify="space-between"
        align="center"
        divider={<StackDivider borderColor="white" />}
      >
        {testimonials.map(testi => (
          <Stack
            direction={{ base: 'row', md: 'column' }}
            spacing={10}
            key={testi.author}
            color="white"
            w="full"
            maxW="lg"
            px={6}
            py={4}
            position="relative"
            zIndex={2}
            align={{ base: 'center' }}
          >
            <Box position="relative">
              <OpenQuoteIcon fill="whiteAlpha.600" boxSize={8} />
              <Text textAlign="center">{testi.quote}</Text>
              <Flex w="full">
                <Spacer />
                <CloseQuoteIcon fill="whiteAlpha.600" boxSize={8} />
              </Flex>
            </Box>
            <Box textAlign="right" w="full">
              <Text fontWeight="semibold">{`- ${testi.author}`}</Text>
              <Text>{testi.position}</Text>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  </Box>
);
