import { Flex } from "@chakra-ui/react";
import { SocialFooter } from "../SocialFooter";
import { Navbar } from "../Navbar";

export const OneColumnLayout = ({ children }: any) => {
  return (
    <>
      <Flex direction='column' minHeight='100vh' className='one-column-layout'>
        <Navbar />
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
