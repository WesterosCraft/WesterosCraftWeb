import Image, { ImageProps } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '../lib/sanity';

interface MyImageProps extends Omit<ImageProps, 'src'> {
  src: SanityImageSource;
  width: number;
  alt: string;
  quality?: number;
  blur?: number;
  fit?: 'crop' | 'clip' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  crop?: any;
}

export default function SanityImage({
  quality = 80,
  blur = 0,
  src,
  fit,
  crop,
  alt,
  ...props
}: MyImageProps) {
  const baseURL = 'https://cdn.sanity.io/images/';

  return (
    <Image
      {...props}
      alt={alt}
      loader={() => {
        let url =
          urlFor(src)
            .width(props.width)
            .height(Number(props.height) || 256)
            .auto('format')
            .quality(quality)
            .fit(fit || 'clip')
            .crop(crop ?? undefined)
            .url() ?? '';

        if (blur) {
          url += `&blur=${blur}`;
        }

        return url;
      }}
      src={urlFor(src).url()?.toString().replace(baseURL, '') ?? ''}
    />
  );
}
