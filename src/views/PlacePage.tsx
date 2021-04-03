import { memo } from "react";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

type Props = {
  placeSlug: string;
};

export const PlacePage = memo<Props>(({ placeSlug }) => {
  return <AuthenticatedLayout content={<p>TODO: {placeSlug}</p>} />;
});
