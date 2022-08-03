import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { DiscordIcon } from '../Icons/DsicordIcon';
import { InstagramIcon } from '../Icons/InstagramIcon';
import { TwitterIcon } from '../Icons/TwitterIcon';
import { YoutubeIcon } from '../Icons/YoutubeIcon';

export const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" colorScheme="whiteAlpha" {...props}>
    <IconButton as="a" href="#" aria-label="Discord" icon={<DiscordIcon fill="whiteAlpha.900" />} />
    <IconButton as="a" href="#" aria-label="Twitter" icon={<TwitterIcon fill="whiteAlpha.900" />} />
    <IconButton
      as="a"
      href="#"
      aria-label="Instagram"
      icon={<InstagramIcon fill="whiteAlpha.900" />}
    />
    <IconButton as="a" href="#" aria-label="Youtube" icon={<YoutubeIcon fill="whiteAlpha.900" />} />
  </ButtonGroup>
);
