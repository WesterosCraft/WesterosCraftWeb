import { startCase, camelCase } from 'lodash';

export const nameFormatter = (arg: string) => {
  return startCase(camelCase(arg));
};

export const slugify = (input: string) =>
  input
    .toLowerCase()
    //Remove spaces
    .replace(/\s+/g, '-')
    //Remove special characters
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
