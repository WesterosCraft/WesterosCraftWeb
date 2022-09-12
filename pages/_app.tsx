import * as React from 'react';
import type { ReactElement, ReactNode } from 'react';
import { DefaultSeo } from 'next-seo';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '../theme';
import SEO from '../next-seo.config';
import * as ga from '../lib/ga';

import '../public/stylesheet.css';

import '@fontsource/karla/400.css';
import '@fontsource/karla/500.css';

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
      ga?.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
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
