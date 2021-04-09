import { FunctionComponent, memo, useEffect, useMemo, useRef } from "react";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { Plus, User } from "phosphor-react";
import { IconButton } from "components/IconButton";
import { useMe } from "hooks/useMe";
import { Button } from "components/Button";
import { ActionWrapper } from "components/ActionWrapper";
import { SplitLayout } from "components/SplitLayout";
import { useApiRoute } from "hooks/useApiRoute";
import { workouts, WorkoutsParams } from "logic/api";
import { ResourceHandler } from "components/ResourceHandler";
import { styled } from "stitches.config";
import { ScrollFlex } from "components/ScrollFlex";
import { addBetween } from "logic/Utils";
import { Spacer } from "components/Spacer";
import { Pagination } from "components/Pagination";
import Scrollbar from "react-scrollbars-custom";
import { FooterWrapper } from "components/FooterWrapper";
import { useHistory } from "react-router-dom";
import * as z from "zod";
import { createUseRouterQuery, Validators } from "hooks/useRouterQuery";
import { stringify } from "querystring";
import { WorkoutCard } from "./WorkoutCard";
import { WorkoutFilters } from "./WorkoutFilters";

const PAGE_SIZE = 20;

const useRouterQuery = createUseRouterQuery(
  {
    page: Validators.optional(Validators.int),
    order: Validators.optional(Validators.string),
    sort: Validators.optional(Validators.string),
  },
  z.object({
    page: z.number().int().positive().optional(),
    order: z.enum(["asc", "desc"]).optional(),
    sort: z
      .enum(["date", "place", "user", "distance", "duration", "speed"])
      .optional(),
  })
);

export const HomePage: FunctionComponent = memo(() => {
  const me = useMe();
  const history = useHistory();

  const query = useRouterQuery();

  const params = useMemo((): WorkoutsParams => {
    const { page = 1, ...other } = query;
    return {
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      ...other,
    };
  }, [query]);

  const scrollbarRef = useRef<Scrollbar | null>(null);

  const workoutsRes = useApiRoute(workouts, params, {
    keepPreviousData: true,
    onSuccess: () => {
      const scrollbar = scrollbarRef.current;
      if (scrollbar && paramsChanged.current) {
        paramsChanged.current = false;
        scrollbar.scrollToTop();
      }
    },
  });

  const paramsChanged = useRef(false);

  useEffect(() => {
    paramsChanged.current = true;
  }, [params]);

  return (
    <AuthenticatedLayout
      homeAction={false}
      loading={workoutsRes.isFetching}
      rightAction={
        <ActionWrapper>
          {me ? (
            <IconButton to="/new-workout" icon={<Plus />} />
          ) : (
            <Button to="/login" text="Login" leftIcon={<User />} />
          )}
        </ActionWrapper>
      }
      content={
        <SplitLayout
          side={
            <WorkoutFilters
              sortBy={params.sort ?? "date"}
              setSortBy={(v) => {
                history.push({
                  search: stringify({ ...query, sort: v, page: 1 }),
                });
              }}
              orderBy={params.order ?? "asc"}
              setOrderBy={(v) => {
                history.push({
                  search: stringify({ ...query, order: v, page: 1 }),
                });
              }}
            />
          }
          content={
            <ResourceHandler
              resource={workoutsRes}
              renderPending={() => {
                return null;
              }}
              renderResolved={(workouts) => {
                return (
                  <Content>
                    <ScrollFlex scrollRef={scrollbarRef}>
                      <Cards>
                        {addBetween(
                          workouts.results.map((workout) => {
                            return (
                              <WorkoutCard
                                key={workout.id}
                                distance={workout.distance}
                                duration={workout.duration}
                                speed={workout.speed}
                                date={workout.date}
                                place={workout.place}
                                placeName={workout.placeName}
                                userDisplayName={workout.userName}
                                username={workout.user}
                              />
                            );
                          }),
                          (index) => (
                            <Spacer vertical={4} key={"spacer-" + index} />
                          )
                        )}
                      </Cards>
                    </ScrollFlex>
                  </Content>
                );
              }}
            />
          }
        />
      }
      footer={
        <FooterWrapper
          css={{
            minWidth: 500,
            alignSelf: "center",
          }}
        >
          <ResourceHandler
            resource={workoutsRes}
            renderPending={() => <Pagination />}
            renderRejected={() => <Pagination />}
            renderResolved={(workouts) => {
              const pageCount = Math.floor(workouts.total / PAGE_SIZE);
              const currentPage = (query.page ?? 1) - 1;

              return (
                <Pagination
                  page={currentPage}
                  pageCount={pageCount}
                  onChange={(page) => {
                    history.push({
                      search: stringify({ ...query, page: page + 1 }),
                    });
                  }}
                />
              );
            }}
          />
        </FooterWrapper>
      }
    />
  );
});

const Cards = styled("div", {
  padding: "$04",
  paddingRight: "$10",
});

const Content = styled("div", {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});
