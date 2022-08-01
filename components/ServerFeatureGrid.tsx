import { Box, SimpleGrid, Img } from '@chakra-ui/react';
import Longclaw from '../public/longclaw.png';

export const ServerFeatureGrid = () => {
  return (
    <Box w="full" className="serverFeatureGrid">
      <Box maxW="8xl" mx="auto" px={[2, null, 4]} className="container">
        <SimpleGrid w="full" columns={{ base: 1, lg: 2 }} gap={16}>
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
        </SimpleGrid>
      </Box>
    </Box>
  );
};

{
  /* <Box w="full" className="imageGridFeature">
<Box maxW="7xl" mx="auto" px={[2, null, 4]} className="container"> */
}
