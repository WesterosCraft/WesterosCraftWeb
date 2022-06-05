import { Center } from "@chakra-ui/react";
import type { ReactElement } from "react";
import { OneColumnLayout } from "../components";

export default function Home() {
  return (
    <Center width='full' flexDirection='column'>
      home
    </Center>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <OneColumnLayout>{page}</OneColumnLayout>;
};
