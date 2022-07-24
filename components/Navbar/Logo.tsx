import { chakra, HTMLChakraProps, useToken, Heading, HeadingProps } from '@chakra-ui/react'
import * as React from 'react'
import NextLink from "next/link";

export const Logo = (props: HeadingProps) => {
  return (
    <NextLink href='/'>
    <Heading cursor='pointer' fontSize='2xl' color='white' {...props}>
      WesterosCraft
    </Heading>
  </NextLink>

  )
}
