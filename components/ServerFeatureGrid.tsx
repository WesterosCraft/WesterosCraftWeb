import { Box, SimpleGrid, Img, Center, VStack, Stack } from '@chakra-ui/react';
import Longclaw from '../public/longclaw.png';

export const ServerFeatureGrid = () => {
  return (
    <Box w="full" className="serverFeatureGrid">
      <Box position="relative" maxW="7xl" mx="auto" px={[2, null, 4]} className="container">
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor="primaryGold"
          spacing={12}
          mx="auto"
          w="full"
        >
          <Center ml={-24}>
            <Img
              minW={750}
              src={
                'https://cdn.sanity.io/images/1as7cn02/production/a8ec46b4bc30aba0ab00e5bd889c369d215ef6e7-1920x1200.png'
              }
            />
          </Center>
          <VStack w="full" spacing={12}>
            <Box
              w="full"
              height={200}
              border="1px solid"
              borderColor="primaryGold"
              position="relative"
            >
              {/* <Img position="absolute" top={-10} left={4} width={85} src={Longclaw.src} /> */}
            </Box>
            <Box
              w="full"
              height={200}
              border="1px solid"
              borderColor="primaryGold"
              position="relative"
            >
              {/* <Img position="absolute" top={-10} left={4} width={85} src={Longclaw.src} /> */}
            </Box>
          </VStack>
        </Stack>
        {/* <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} gap={16}>
          <Box
            w="full"
            height={200}
            border="1px solid"
            borderColor="primaryGold"
            position="relative"
          >
            <Img position="absolute" top={-10} left={4} width={85} src={Longclaw.src} />
          </Box>
          <Box
            w="full"
            height={200}
            border="1px solid"
            borderColor="primaryGold"
            position="relative"
          >
            <Img position="absolute" top={-10} left={4} width={85} src={Longclaw.src} />
          </Box>
        </SimpleGrid> */}
      </Box>
    </Box>
  );
};
