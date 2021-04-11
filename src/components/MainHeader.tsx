import { useMe } from "hooks/useMe";
import { usePreviousLocation } from "hooks/usePreviousLocation";
import { CaretLeft } from "phosphor-react";
import { Fragment, memo } from "react";
import { useHistory } from "react-router";
import { UserMenu } from "views/UserMenu";
import { ActionWrapper } from "./ActionWrapper";
import { Header } from "./Header";
import { IconButton } from "./IconButton";
import { LoginButton } from "./LoginButton";
import { Spacer } from "./Spacer";

type Props = {
  back?: boolean;
  backFallback?: string;
  title?: string;
  authRightAction?: React.ReactNode | null;
  loading?: boolean;
};

export const MainHeader = memo<Props>(
  ({
    back = true,
    backFallback = "/",
    authRightAction,
    title,
    loading = false,
  }) => {
    const me = useMe();
    const history = useHistory();
    const previousLocation = usePreviousLocation((s) => s.previousLocation);

    return (
      <Header
        loading={loading}
        title={title}
        leftAction={
          <ActionWrapper>
            {back && (
              <Fragment>
                {previousLocation ? (
                  <IconButton
                    icon={<CaretLeft />}
                    onClick={() => history.goBack()}
                  />
                ) : (
                  <IconButton icon={<CaretLeft />} to={backFallback} />
                )}
                <Spacer horizontal={2} />
              </Fragment>
            )}
            {me && <UserMenu me={me} />}
          </ActionWrapper>
        }
        rightAction={
          me ? (
            authRightAction
          ) : (
            <ActionWrapper>
              <LoginButton />
            </ActionWrapper>
          )
        }
      />
    );
  }
);
