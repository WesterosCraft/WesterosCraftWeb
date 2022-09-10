import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import SEO from '../next-seo.config';

export interface SEOProps {
  title?: string;
  description?: string;
}

export const Seo = ({ title, description }: SEOProps) => {
  const router = useRouter();
  // const metaTitle = title ?? SEO.title;
  // const metaDescription = description ?? SEO.description;
  const url = `${SEO.openGraph.url}${router.asPath.replace('/', '')}`;
  const openGraphTitle = title ?? SEO.title;
  const openGraphDescription = description ?? SEO.description;
  // const imageUrl =
  //   (meta?.openGraphImage && `${meta?.openGraphImage}?format=auto&h=600&w=600`) ??
  //   SEO.openGraph.images[0].url;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title: openGraphTitle,
        description: openGraphDescription,
        // images: [
        //   {
        //     url: imageUrl,
        //     alt: description,
        //     width: 1280,
        //     height: 720,
        //   },
        // ],
      }}
    />
  );
};
