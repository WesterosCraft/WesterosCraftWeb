import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import SEO from "../next-seo.config";

export const Seo = ({ meta }: any) => {
  const router = useRouter();
  const title = meta?.metaTitle ?? SEO.title;
  const description = meta?.metaDescription ?? SEO.description;
  const url = `${SEO.openGraph.url}${router.asPath.replace("/", "")}`;
  const openGraphTitle = meta?.openGraphTitle ?? SEO.title;
  const openGraphDescription = meta?.openGraphDescription ?? SEO.description;
  const imageUrl =
    (meta?.openGraphImage &&
      `${meta?.openGraphImage}?format=auto&h=600&w=600`) ??
    SEO.openGraph.images[0].url;

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title: openGraphTitle,
        description: openGraphDescription,
        images: [
          {
            url: imageUrl,
            alt: description,
            width: 1280,
            height: 720,
          },
        ],
      }}
    />
  );
};
