import { InProgress } from "components/InProgress";
import { LeftMenu } from "components/LeftMenu";
import { MainHeader } from "components/MainHeader";
import { memo } from "react";
import { Layout } from "./Layout";

type Props = {};

export const UsersPage = memo<Props>(() => {
  return (
    <Layout
      header={<MainHeader back={false} />}
      leftMenu={<LeftMenu active="users" />}
      content={<InProgress />}
    />
  );
});
