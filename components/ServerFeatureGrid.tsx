import { Box, SimpleGrid, Img, Center, VStack } from '@chakra-ui/react';
import Longclaw from '../public/longclaw.png';

export const ServerFeatureGrid = () => {
  return (
    <Box w="full" className="serverFeatureGrid">
      <Box maxW="8xl" mx="auto" px={[2, null, 4]} className="container">
        <SimpleGrid columns={2} gap={16}>
          <Center mx="auto" maxW="7xl" p="4">
            <Img
              width={700}
              src={
                'https://cdn.sanity.io/images/1as7cn02/production/a8ec46b4bc30aba0ab00e5bd889c369d215ef6e7-1920x1200.png'
              }
            />
          </Center>
          <VStack>
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
        </SimpleGrid>
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

{
  /* <Box w="full" className="imageGridFeature">
<Box maxW="7xl" mx="auto" px={[2, null, 4]} className="container"> */
}
