import { Header } from "components/Header";
import { IconButton } from "components/IconButton";
import { useMe } from "hooks/useMe";
import { Fragment, memo } from "react";
import { Layout } from "./Layout";
import { UserMenu } from "./UserMenu";
import { CaretLeft, HouseLine } from "phosphor-react";
import { Spacer } from "components/Spacer";
import { ActionWrapper } from "components/ActionWrapper";

type Props = {
  content: React.ReactNode | null;
  footer?: React.ReactNode | null;
  back?: boolean;
  title?: string;
  homeAction?: boolean;
  rightAction?: React.ReactNode | null;
  loading?: boolean;
};

export const AuthenticatedLayout = memo<Props>(
  ({
    content,
    back,
    rightAction,
    title,
    loading = false,
    homeAction = true,
    footer = null,
  }) => {
    const me = useMe();

    return (
      <Layout
        header={
          <Header
            loading={loading}
            title={title}
            leftAction={
              <ActionWrapper>
                {back && (
                  <Fragment>
                    <IconButton to="/" icon={<CaretLeft />} />
                    <Spacer horizontal={2} />
                  </Fragment>
                )}
                {homeAction && (
                  <Fragment>
                    <IconButton to="/" icon={<HouseLine />} />
                    <Spacer horizontal={2} />
                  </Fragment>
                )}
                {me && <UserMenu me={me} />}
              </ActionWrapper>
            }
            rightAction={rightAction}
          />
        }
        content={content}
        footer={footer}
      />
    );
  }
);
