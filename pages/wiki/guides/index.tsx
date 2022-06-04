import type { ReactElement } from "react";
import { WikiLayout } from "../../../components";

export default function GuidesPage() {
  return <div>guides</div>;
}
GuidesPage.getLayout = function getLayout(page: ReactElement) {
  return <WikiLayout>{page}</WikiLayout>;
};
