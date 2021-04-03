import { memo } from "react";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

type Props = {
  username: string;
};

export const UserPage = memo<Props>(({ username }) => {
  return <AuthenticatedLayout content={<p>TODO: {username}</p>} />;
});
