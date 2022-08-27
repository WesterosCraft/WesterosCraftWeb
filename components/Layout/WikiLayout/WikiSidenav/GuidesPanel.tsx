import { Stack, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Submenu } from '../../../Navbar/Submenu';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import { NavLink } from '../../../Navbar/NavLink';
import { NavItem } from '../NavItem';
import { NavGroup } from '../NavGroup';
import { GUIDES } from '../../../../constants/guides';
import groupBy from 'lodash/groupBy';
import { slugify } from '../../../../utils';
import { useRouter } from 'next/router';

const MobileGuidesPanel = () => {
  const guidesByCategory = Object.entries(groupBy(GUIDES, o => o.guideCategory?.title));

  return (
    <>
      {guidesByCategory.map(([title, guides], idx) =>
        guides ? (
          <Submenu.Mobile
            key={idx}
            link={{
              title: startCase(toLower(title)),
              // @ts-ignore
              links: guides?.map(i => ({
                ...i,
                link: {
                  slug: {
                    current: `/wiki/guides/${slugify(i?.guideCategory?.title)}/${i?.slug?.current}`,
                  },
                },
              })),
            }}
          />
        ) : (
          <NextLink key={idx} href={`/wiki/guides`}>
            <NavLink.Mobile>{startCase(toLower(title))}</NavLink.Mobile>
          </NextLink>
        ),
      )}
    </>
  );
};

const DesktopGuidesPanel = () => {
  const router = useRouter();
  const guidesByCategory = Object.entries(groupBy(GUIDES, o => o.guideCategory?.title));

  return (
    <Accordion
      index={guidesByCategory.findIndex(guide => router.asPath?.includes(slugify(guide?.[0])))}
    >
      {guidesByCategory.map(([title, guides], i) => (
        <AccordionItem key={i} border={0}>
          <NextLink href={`/wiki/guides/${slugify(title)}`}>
            <a>
              <AccordionButton
                _hover={{ bg: 'primaryDarkGlare' }}
                _activeLink={{ bg: 'primaryDarkGlare' }}
                aria-current={router.query?.category === slugify(title) ? 'page' : undefined}
              >
                <NavGroup label={title} />
              </AccordionButton>
            </a>
          </NextLink>

          <AccordionPanel px={4}>
            <Stack spacing="1">
              {guides?.map((guide, i) => (
                <NextLink
                  key={i}
                  href={`/wiki/guides/${slugify(guide?.guideCategory?.title)}/${
                    guide?.slug?.current
                  }`}
                >
                  <a>
                    <NavItem
                      active={router.query?.slug === guide?.slug?.current}
                      label={guide.title}
                    />
                  </a>
                </NextLink>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export const GuidesPanel = {
  Mobile: MobileGuidesPanel,
  Desktop: DesktopGuidesPanel,
};
