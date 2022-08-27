import { Box } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { WikiLayout } from '../../../../components/Layout/WikiLayout';

const GuideCategoryPage = () => {
  return (
    <>
      <Box>laskdlkasd</Box>
    </>
  );
};

GuideCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};

export default GuideCategoryPage;
