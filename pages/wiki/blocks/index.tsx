import type { ReactElement } from 'react';
import { WikiLayout } from '../../../components/Layout/WikiLayout';

export default function BlocksPage() {
  return <div>blocks</div>;
}
BlocksPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};
