import { memo } from "react";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

type Props = {};

export const PlacesPage = memo<Props>(() => {
  return <AuthenticatedLayout content={<p>TODO</p>} />;
});
