import { ButtonGroup, ButtonGroupProps, IconButton } from '@chakra-ui/react';
import * as React from 'react';
import { DiscordIcon } from '../Icons/DsicordIcon';
import { InstagramIcon } from '../Icons/InstagramIcon';
import { TwitterIcon } from '../Icons/TwitterIcon';
import { YoutubeIcon } from '../Icons/YoutubeIcon';

export const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton as="a" href="#" aria-label="LinkedIn" icon={<DiscordIcon />} />
    <IconButton as="a" href="#" aria-label="GitHub" icon={<TwitterIcon />} />
    <IconButton as="a" href="#" aria-label="Twitter" icon={<InstagramIcon />} />
    <IconButton as="a" href="#" aria-label="Twitter" icon={<YoutubeIcon />} />
  </ButtonGroup>
);
