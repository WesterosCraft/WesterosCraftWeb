import { Flex } from "@chakra-ui/react";
import { Nav } from "./Nav";
import { SocialFooter } from "../SocialFooter";

export const OneColumnLayout = ({ children }: any) => {
  return (
    <>
      <Flex direction='column' minHeight='100vh' className='one-column-layout'>
        <Nav position='inherit' />
        <Flex
          flex='1 1'
          width='full'
          height='full'
          alignSelf='stretch'
          as='main'
        >
          {children}
        </Flex>
      </Flex>
      <SocialFooter />
    </>
  );
};
