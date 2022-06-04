import React from "react";
import {
  Link,
  Text,
  useColorModeValue,
  HStack,
  StackDivider,
} from "@chakra-ui/react";
import { YoutubeIcon } from "./Icons/YoutubeIcon";

export const SocialFooter = () => {
  const borderColor = useColorModeValue("primaryDark", "primaryLight");

  const links = [
    { title: "Discord", icon: YoutubeIcon },
    { title: "Twitter" },
    { title: "Instagram" },
    { title: "YouTube" },
    { title: "Reddit" },
  ];
  return (
    <HStack
      height='80px'
      className='social-footer'
      borderTopWidth={2}
      borderColor={borderColor}
      divider={<StackDivider borderLeftWidth={2} borderColor={borderColor} />}
    >
      {links.map((i, n) => (
        <SocialFooterLink key={n} title={i.title} />
      ))}
    </HStack>
  );
};

export const SocialFooterLink = ({ title = "" }) => (
  <Link
    display='flex'
    justifyContent='center'
    alignItems='center'
    flex={1}
    py={4}
    px={2}
  >
    <Text>{title}</Text>
    <YoutubeIcon />
  </Link>
);
