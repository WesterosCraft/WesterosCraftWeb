import * as React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      </Head>
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
