import { Box, BoxProps, chakra } from "@chakra-ui/react";
import NextImage, { ImageProps, ImageLoaderProps } from "next/image";

const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "layout",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
    ].includes(prop),
});

const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${
    resolverProps.quality || 90
  }`;
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const ChakraNextImage = (props: ImageProps & BoxProps) => {
  const {
    src,
    alt,
    width,
    quality,
    height,
    layout,
    objectFit,
    blurDataURL,
    loader,
    ...rest
  } = props;
  return (
    <Box
      pos='relative'
      className='chakra-next-image'
      width={layout === "fill" ? "100%" : "inherit"}
      {...rest}
    >
      <ChakraNextUnwrappedImage
        w='auto'
        h='auto'
        loader={loader || myLoader}
        layout={layout}
        width={width}
        quality={quality}
        height={height}
        placeholder='blur'
        objectFit={objectFit}
        blurDataURL={
          blurDataURL ||
          `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`
        }
        src={src}
        alt={alt}
        transition='all 0.2s'
      />
    </Box>
  );
};
