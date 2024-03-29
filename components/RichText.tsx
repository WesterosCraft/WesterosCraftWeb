import {
  Box,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  AspectRatio,
  Container,
  HStack,
  UnorderedList,
  OrderedList,
} from '@chakra-ui/react';
import { PortableText } from '@portabletext/react';
import { getFile } from '@sanity/asset-utils';
import { ChakraNextImage } from './ChakraNextImage';
import { urlForImage } from '../lib/sanity.image';
import { ExclamationIcon } from './Icons/ExclamationIcon';

export const RichText = ({ value }: { value: any[] }) => {
  return (
    <PortableText
      value={value}
      components={{
        block: (props: any) => {
          const { style = 'normal' } = props.node;
          const center = /center/.test(style);
          const heading = /^h\d/.test(style) && style.match(/^h\d/)[0];
          const size = resolveSize(heading);

          if (heading !== false) {
            return (
              <Heading
                fontFamily="body"
                fontWeight="medium"
                mt={10}
                textAlign={center ? 'center' : 'left'}
                as={heading}
                size={size}
              >
                {props.children}
              </Heading>
            );
          }

          if (style === 'blockquote') {
            return (
              <Flex paddingY={1}>
                <Box as="blockquote" display="flex">
                  {/* <Box as={IoIosQuote} /> */}
                  <Text paddingLeft={2} fontSize="lg" fontWeight="medium">
                    {props.children}
                  </Text>
                </Box>
              </Flex>
            );
          }

          return (
            <Text position="relative" zIndex="base" mt={6} textAlign={center ? 'center' : 'left'}>
              {props.children}
            </Text>
          );
        },
        types: {
          figure: ({ value }) => {
            return (
              <Box>
                <Box
                  float={value?.float}
                  pr={value?.float === 'left' ? 4 : 0}
                  pl={value?.float === 'right' ? 4 : 0}
                  pt={4}
                >
                  <ChakraNextImage
                    alt={value?.alt}
                    src={urlForImage(value?.image?.asset).url()}
                    width={value?.width || 500}
                    height={value?.height || 350}
                  />
                  {value?.caption && (
                    <Text textAlign="center" fontSize="xs">
                      {value.caption}
                    </Text>
                  )}
                </Box>
              </Box>
            );
          },
          video: ({ value }) => {
            // const { url } = props.node;
            return (
              value?.url && (
                <AspectRatio my={4} ratio={16 / 9} maxW={['100%', null, '50%']}>
                  <iframe src={value?.url} allowFullScreen />
                </AspectRatio>
              )
            );
          },
          callout: (props: any) => {
            return (
              <Container
                position="relative"
                color="black"
                zIndex="base"
                maxW="container.md"
                borderRadius="lg"
                py={4}
                px={6}
                bg="orange.100"
              >
                <HStack width="full" display="flex" maxW="full">
                  <ExclamationIcon
                    display={['none', 'block']}
                    mr={4}
                    fill="orange.300"
                    boxSize={12}
                  />
                  <Text wordBreak="break-word">{props?.value?.text}</Text>
                </HStack>
              </Container>
            );
          },
          file: (props: any) => {
            const file = getFile(props?.value?.asset, {
              projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
              dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
            });
            return file?.asset?.url ? (
              <AspectRatio
                my={8}
                ratio={[4 / 3, null, 16 / 9]}
                maxH={550}
                sx={{
                  iframe: { height: ['calc(100% * 17 / 20)', null, '100%'] },
                }}
              >
                <iframe loading="lazy" src={file?.asset?.url} />
              </AspectRatio>
            ) : null;
          },
        },
        marks: {
          link: ({ children, value }) => {
            const rel = !value?.href?.startsWith?.('/') ? 'noreferrer noopener' : undefined;
            return (
              <Link
                textDecor="underline"
                textDecorationColor="primaryRed"
                textUnderlineOffset="3px"
                href={value.href}
                rel={rel}
              >
                {children}
              </Link>
            );
          },
        },
        list: (props: any) => {
          const { type } = props;
          const bullet = type === 'bullet';
          if (bullet) {
            return (
              <UnorderedList mt={6} spacing={4}>
                {props.children}
              </UnorderedList>
            );
          }
          return (
            <OrderedList mt={6} spacing={4}>
              {props.children}
            </OrderedList>
          );
        },
        listItem: (props: any) => <ListItem>{props.children}</ListItem>,
      }}
    />
  );
};

const resolveSize = (style: string | boolean) => {
  switch (style) {
    case 'h1':
      return '2xl';
    case 'h2':
      return 'xl';
    case 'h3':
      return 'lg';
    case 'h4':
      return 'md';
    case 'h5':
      return 'sm';
    case 'h6':
      return 'xs';
    default:
      return 'md';
  }
};
