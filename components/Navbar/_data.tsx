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
  icon?: 'pyke' | 'nightswatch' | 'dreadfort' | 'casterlyrock';
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
        icon: 'pyke',
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
        icon: 'nightswatch',
      },
      {
        _key: 'db9bcffdd8c8',
        _type: 'externalLink',
        description: 'Where we plan all of our builds',
        link: {
          slug: {
            _type: 'slug',
            current: 'https://forum.westeroscraft.com/',
          },
        },
        title: 'Forums',
        icon: 'dreadfort',
      },
      {
        _key: 'db9bcffdd8c8',
        _type: 'externalLink',
        description: 'Help keep the server running',
        link: {
          slug: {
            _type: 'slug',
            current: 'https://ko-fi.com/westeroscraft',
          },
        },
        title: 'Donate',
        icon: 'casterlyrock',
      },
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
            current: 'join',
          },
        },
        icon: 'stormsend',
        title: 'Modpack',
      },
      {
        _key: '1bf1d695cb94',
        _type: 'internalLink',
        description: 'A knowledge base of all of our builds',
        link: {
          slug: {
            _type: 'slug',
            current: 'downloads',
          },
        },
        icon: 'summerhall',
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
        icon: 'highgarden',
        title: 'FAQ',
      },
      {
        _key: '0e2307ba6efd',
        _type: 'internalLink',
        description: 'All the guides to get you started',
        link: {
          _type: 'allGuides',
          slug: {
            _type: 'slug',
            current: 'wiki/guides',
          },
        },
        icon: 'sunspear',
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
    _type: 'internalLink',
    slug: {
      _type: 'slug',
      current: '/wiki',
    },
    title: 'Wiki',
  },

  {
    _key: '0fb3c9e302f5',
    _type: 'externalLink',
    slug: {
      _type: 'slug',
      current: 'https://discord.com/invite/pBS5TH4',
    },
    title: 'Discord',
  },
] as Links[];
