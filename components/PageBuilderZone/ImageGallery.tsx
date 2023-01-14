import { SimpleGrid, Box, HStack, Text, Divider, Heading, Button, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { urlForImage } from '../../lib/sanity.image';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export interface ImageGallery {
  _key: string;
  _type: 'imageGallery';
  images: Image[];
  metadata: string;
  title: string;
}

export interface Image {
  _key: string;
  _type: ImageType;
  alt: string;
  asset: Asset;
  description: null;
  heading: string;
  title: string;
}

export enum ImageType {
  Image = 'image',
}

export interface Asset {
  _ref: string;
  _type: AssetType;
}

export enum AssetType {
  Reference = 'reference',
}

export const PageBuilderImageGallery = (props: ImageGallery) => {
  return (
    <Box mt="12">
      <Heading size="2xl" mb={5}>
        {props?.title}
      </Heading>
      <Divider borderColor="primaryDark" />
      <Box w="full">
        <SimpleGrid mt="8" columns={{ base: 1, md: 2, xl: 3 }} gap="2">
          {props?.images?.map(image => (
            <Box key={image._key} p="4" border="1px solid black">
              <HStack align="center" justify="space-between">
                <VStack>
                  <Text>{image?.title}</Text>
                  <CopyToClipboard
                    text={`${props.metadata?.replace('<ID>', image.alt.replace(/\s/g, ''))}`}
                  >
                    <Button size="xs">Copy</Button>
                  </CopyToClipboard>
                </VStack>
                {image?.asset && (
                  <Image
                    src={urlForImage(image?.asset).url()}
                    width={96}
                    height={96}
                    alt={image?.title}
                    sizes="10vw"
                    style={{ width: '100%', height: 'auto', maxWidth: 200 }}
                  />
                )}
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
