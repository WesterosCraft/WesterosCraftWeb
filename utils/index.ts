import { startCase, camelCase, kebabCase } from "lodash";

export const nameFormatter = (arg: string) => {
  return startCase(camelCase(arg));
};
