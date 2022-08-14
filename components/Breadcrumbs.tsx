import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { startCase, toLower } from 'lodash';

const combineAccumulatively = (segments: string[]) => {
  const links = segments.reduce((acc, cur, curIndex) => {
    const last = curIndex > 1 ? acc[curIndex - 1] : '';
    const newPath = last + '/' + cur;
    acc.push(newPath);
    return acc;
  }, [] as string[]);
  return links;
};

export const Breadcrumbs = () => {
  const router = useRouter();

  const segments = router.asPath.split('/');
  const crumbLinks = combineAccumulatively(segments);

  return (
    <Breadcrumb mb={5}>
      {crumbLinks.map((crumb, i) =>
        segments[i] === '' ? (
          <BreadcrumbItem key={i} fontWeight="bold" fontSize="sm" color="primaryRed">
            <BreadcrumbLink as={NextLink} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={i} fontWeight="bold" fontSize="sm" color="primaryRed">
            <BreadcrumbLink as={NextLink} href={crumb}>
              {startCase(toLower(segments[i]))}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ),
      )}
    </Breadcrumb>
  );
};
