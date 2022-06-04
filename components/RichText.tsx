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
  Icon,
  UnorderedList,
  OrderedList,
} from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import { getFileAsset } from "@sanity/asset-utils";
import { ChakraNextImage } from "./ChakraNextImage";
import { urlFor } from "../lib/sanity";

export const RichText = ({ value }: { value: any[] }) => {
  return (
    <PortableText
      value={value}
      components={{
        block: (props: any) => {
          const { style = "normal" } = props.node;
          const center = /center/.test(style);
          const heading = /^h\d/.test(style) && style.match(/^h\d/)[0];
          const size = resolveSize(heading);

          if (heading !== false) {
            return (
              <Heading
                mt={10}
                textAlign={center ? "center" : "left"}
                as={heading}
                size={size}
              >
                {props.children}
              </Heading>
            );
          }

          if (style === "blockquote") {
            return (
              <Flex paddingY={1}>
                <Box as='blockquote' display='flex'>
                  {/* <Box as={IoIosQuote} /> */}
                  <Text paddingLeft={2} fontSize='lg' fontWeight='semibold'>
                    {props.children}
                  </Text>
                </Box>
              </Flex>
            );
          }

          return (
            <Text
              position='relative'
              zIndex='base'
              mt={6}
              textAlign={center ? "center" : "left"}
            >
              {props.children}
            </Text>
          );
        },
        types: {
          figure: ({ value }) => {
            return (
              <Box
                float={value?.float}
                pr={value?.float === "left" ? 4 : 0}
                pl={value?.float === "right" ? 4 : 0}
                pt={4}
              >
                <Box p={2} border='1.5px solid black'>
                  <ChakraNextImage
                    alt={value?.alt}
                    src={urlFor(value?.image?.asset).url()}
                    width={value?.width || 500}
                    height={value?.height || 350}
                  />
                  {value?.caption && (
                    <Text textAlign='center' fontSize='xs'>
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
                <AspectRatio my={4} ratio={16 / 9} maxW={["100%", null, "50%"]}>
                  <iframe src={value?.url} allowFullScreen />
                </AspectRatio>
              )
            );
          },
          callout: (props: any) => {
            return (
              <Container
                position='relative'
                color='black'
                zIndex='base'
                maxW='container.md'
                borderRadius='lg'
                py={4}
                px={6}
                bg='orange.100'
              >
                <HStack width='full' display='flex' maxW='full'>
                  <Icon
                    display={["none", "block"]}
                    mr={4}
                    color='orange.300'
                    boxSize={12}
                  />
                  <Text wordBreak='break-word'>{props?.node?.text}</Text>
                </HStack>
              </Container>
            );
          },
          videoFile: (props: any) => {
            const file = getFileAsset(props?.node?.asset?._ref);
            return (
              file && (
                <AspectRatio
                  my={8}
                  ratio={[4 / 3, null, 16 / 9]}
                  maxH={550}
                  sx={{
                    iframe: { height: ["calc(100% * 17 / 20)", null, "100%"] },
                  }}
                >
                  <iframe src={file.url} />
                </AspectRatio>
              )
            );
          },
        },
        marks: {
          link: ({ children, value }) => {
            const rel = !value?.href?.startsWith?.("/")
              ? "noreferrer noopener"
              : undefined;
            return (
              <Link
                textDecor='underline'
                textDecorationColor='red'
                textDecorationThickness='1.5px'
                textUnderlineOffset='1px'
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
          const bullet = type === "bullet";
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
    case "h1":
      return "2xl";
    case "h2":
      return "xl";
    case "h3":
      return "lg";
    case "h4":
      return "md";
    case "h5":
      return "sm";
    case "h6":
      return "xs";
    default:
      return "md";
  }
};
