import * as React from 'react';
// import { IoCalendar, IoGrid, IoHelpBuoy } from 'react-icons/io5'
// import { MdWeb } from 'react-icons/md'

export interface Links {
  _key?: string;
  _type?: string;
  links?: LinkElement[];
  title?: string;
  slug?: Slug;
}

export interface LinkElement {
  _key: string;
  _type: LinkType;
  description: string;
  link?: LinkLink;
  title: string;
  slug?: Slug;
}

export enum LinkType {
  ExternalLink = 'externalLink',
  InternalLink = 'internalLink',
}

export interface LinkLink {
  _type: string;
  slug: Slug;
}

export interface Slug {
  _type: SlugType;
  current: string;
}

export enum SlugType {
  Slug = 'slug',
}

export const links = [
  // {
  //   _key: '6ffa819f1469',
  //   _type: 'navigation.section',
  //   links: [
  //     {
  //       _key: 'a695e1d2b0e0',
  //       _type: 'internalLink',
  //       description: 'Learn more about the project',
  //       link: {
  //         _type: 'about',
  //         slug: {
  //           _type: 'slug',
  //           current: 'about',
  //         },
  //       },
  //       title: 'About Us',
  //     },
  //     {
  //       _key: '86d12d05e6cc',
  //       _type: 'internalLink',
  //       description: 'Check up on our progress',
  //       link: {
  //         _type: 'progress',
  //         slug: {
  //           _type: 'slug',
  //           current: 'progress',
  //         },
  //       },
  //       title: 'Progress',
  //     },
  //     {
  //       _key: 'b4bc4c9e15c1',
  //       _type: 'internalLink',
  //       description: 'Our quarterly newsletter',
  //       link: {
  //         _type: 'rookery',
  //         slug: {
  //           _type: 'slug',
  //           current: 'rookery',
  //         },
  //       },
  //       title: 'Rookery',
  //     },
  //   ],
  //   title: 'About',
  // },
  {
    _key: 'f5af68f6384b',
    _type: 'navigation.section',
    links: [
      {
        _key: '86d12d05e6cc',
        _type: 'internalLink',
        description: 'Check up on our progress',
        link: {
          _type: 'progress',
          slug: {
            _type: 'slug',
            current: 'progress',
          },
        },
        title: 'Progress',
      },
      {
        _key: 'b4bc4c9e15c1',
        _type: 'internalLink',
        description: 'Our quarterly newsletter',
        link: {
          _type: 'rookery',
          slug: {
            _type: 'slug',
            current: 'rookery',
          },
        },
        title: 'Rookery',
      },
      {
        _key: 'db9bcffdd8c8',
        _type: 'externalLink',
        description: 'Where we plan all of our builds',
        slug: {
          _type: 'slug',
          current: 'https://forum.westeroscraft.com/',
        },
        title: 'Forums',
      },
      // {
      //   _key: '7d3fa5a7d122',
      //   _type: 'externalLink',
      //   description: 'Chat and hang out with the community',
      //   slug: {
      //     _type: 'slug',
      //     current: 'https://discord.com/invite/pBS5TH4',
      //   },
      //   title: 'Discord',
      // },
      // {
      //   _key: 'acc44cb59aa6',
      //   _type: 'externalLink',
      //   description: 'Swag courtesy of our creative community',
      //   slug: {
      //     _type: 'slug',
      //     current: 'https://www.redbubble.com/people/westeroscraft/shop?asc=u',
      //   },
      //   title: 'Merch',
      // },
      // {
      //   _key: '1fef25524647',
      //   _type: 'externalLink',
      //   description: 'If you think you got the skills, help us build',
      //   slug: {
      //     _type: 'slug',
      //     current: 'https://forum.westeroscraft.com/form/builder-application.3/select',
      //   },
      //   title: 'Apply',
      // },
    ],
    title: 'Community',
  },
  {
    _key: '092d9a812c5b',
    _type: 'navigation.section',
    links: [
      {
        _key: 'bebbff59bca9',
        _type: 'internalLink',
        description: 'Everything you need to join the server',
        link: {
          _type: 'modpack',
          slug: {
            _type: 'slug',
            current: 'modpack',
          },
        },
        title: 'Modpack',
      },
      {
        _key: '1bf1d695cb94',
        _type: 'internalLink',
        description: 'A knowledge base of all of our builds',
        link: {
          _type: 'wiki',
          slug: {
            _type: 'slug',
            current: 'wiki',
          },
        },
        title: 'Downloads',
      },
      {
        _key: '2ee753e4caec',
        _type: 'internalLink',
        description: "If you got a question, it's probably answered",
        link: {
          _type: 'guide',
          slug: {
            _type: 'slug',
            current: 'frequently-asked-questions',
          },
        },
        title: 'FAQ',
      },
      {
        _key: '0e2307ba6efd',
        _type: 'internalLink',
        description: 'All the guides to get you started.',
        link: {
          _type: 'allGuides',
          slug: {
            _type: 'slug',
            current: 'guides',
          },
        },
        title: 'Rules & Guides',
      },
    ],
    title: 'Resources',
  },

  {
    _key: '0fb3c9e302f5',
    _type: 'externalLink',
    slug: {
      _type: 'slug',
      current: 'http://mc.westeroscraft.com/',
    },
    title: 'Map',
  },
  {
    _key: '0fb3c9e302f5',
    _type: 'externalLink',
    slug: {
      _type: 'slug',
      current: 'http://mc.westeroscraft.com/',
    },
    title: 'Wiki',
  },

  {
    _key: '0fb3c9e302f5',
    _type: 'externalLink',
    slug: {
      _type: 'slug',
      current: 'http://mc.westeroscraft.com/',
    },
    title: 'Discord',
  },
] as Links[];
