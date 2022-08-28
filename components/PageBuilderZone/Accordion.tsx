import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from '@chakra-ui/react';
import { RichText } from '../RichText';

export interface Accordion {
  _key: string;
  _type: 'accordion';
  accordionContent: AccordionContent[];
  title: string;
}

export interface AccordionContent {
  _key: string;
  copy: Copy[];
  heading: string;
}

export interface Copy {
  _key: string;
  _type: CopyType;
  children: Child[];
  markDefs: MarkDef[];
  style: Style;
  level?: number;
  listItem?: string;
}

export enum CopyType {
  Block = 'block',
}

export interface Child {
  _key: string;
  _type: ChildType;
  marks: string[];
  text: string;
}

export enum ChildType {
  Span = 'span',
}

export interface MarkDef {
  _key: string;
  _type: MarkDefType;
  href: string;
}

export enum MarkDefType {
  Link = 'link',
}

export enum Style {
  Normal = 'normal',
}

export const PageBuilderAccordion = (props: Accordion) => {
  return (
    <Box mt="8">
      <Text mb="4" fontSize="lg" fontWeight="medium">
        {props?.title}
      </Text>
      <Accordion allowToggle>
        {props?.accordionContent?.map(i => (
          <AccordionItem key={i?._key}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {i?.heading}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <RichText value={i?.copy} />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
