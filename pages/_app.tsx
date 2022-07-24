import * as React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { DefaultSeo } from 'next-seo';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
// @ts-ignore
import galite from 'ga-lite';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '../theme';
import SEO from '../next-seo.config';

import '../public/stylesheet.css';

// if (typeof window !== "undefined") {
//   if (process.env.NODE_ENV === "production") {
//     galite("create", process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? "", "auto");
//   }
//   const terminationEvent = "onpagehide" in window ? "pagehide" : "unload";
//   window.addEventListener(terminationEvent, function () {
//     galite("send", "timing", "JS Dependencies", "unload");
//   });
// }

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      // galite("set", "page", url);
      // galite("send", "pageview");
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider portalZIndex={1500} theme={extendTheme(theme)}>
      <DefaultSeo {...SEO} />

      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
