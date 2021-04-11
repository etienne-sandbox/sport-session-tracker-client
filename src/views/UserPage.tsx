import { InProgress } from "components/InProgress";
import { memo } from "react";
import { Layout } from "./Layout";

type Props = {
  username: string;
};

export const UserPage = memo<Props>(({ username }) => {
  return <Layout content={<InProgress />} />;
});
