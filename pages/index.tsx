import { Center, useDisclosure } from "@chakra-ui/react";

import type { ReactElement } from "react";
import { Nav, OneColumnLayout } from "../components";

export default function Home() {
  return (
    <Center width='full' flexDirection='column'>
      <Nav />
      home
    </Center>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
