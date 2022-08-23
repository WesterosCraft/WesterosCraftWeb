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
              links: guides?.map(i => ({
                ...i,
                link: { slug: { current: `/wiki/guides/${i?.slug?.current}` } },
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
  const guidesByCategory = Object.entries(groupBy(GUIDES, o => o.guideCategory?.title));

  return (
    <Accordion>
      {guidesByCategory.map(([title, guides], i) => (
        <AccordionItem key={i} border={0}>
          <AccordionButton _hover={{ bg: 'primaryDarkGlare' }}>
            <NavGroup label={startCase(toLower(title))} />
          </AccordionButton>

          <AccordionPanel px={4}>
            <Stack spacing="1">
              {guides?.map((guide, i) => (
                <NextLink key={i} href={`/wiki/guides/${guide?.slug?.current}`}>
                  <a>
                    <NavItem label={guide.title} />
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
