import { FunctionComponent, memo, useEffect, useRef, useState } from "react";
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
import { Distance } from "components/Distance";
import { Pagination } from "components/Pagination";
import Scrollbar from "react-scrollbars-custom";
import { Duration } from "../components/Duration";

const PAGE_SIZE = 30;

export const HomePage: FunctionComponent = memo(() => {
  const me = useMe();

  const [params, setParams] = useState<WorkoutsParams>({ limit: PAGE_SIZE });

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
          side={<p>Hello</p>}
          content={
            <ResourceHandler
              resource={workoutsRes}
              renderPending={() => {
                return (
                  <div style={{ flex: 1 }}>
                    <div style={{ flex: 1 }} />
                    <Pagination />
                  </div>
                );
              }}
              renderResolved={(workouts) => {
                const pageCount = Math.floor(workouts.total / PAGE_SIZE);
                const offset = params.offset ?? 0;
                const currentPage = Math.floor(offset / PAGE_SIZE);

                return (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <ScrollFlex scrollRef={scrollbarRef}>
                      <Cards>
                        {addBetween(
                          workouts.results.map((workout) => {
                            return (
                              <WorkoutCard
                                key={workout.id}
                                distance={workout.distance}
                                duration={workout.duration}
                              />
                            );
                          }),
                          (index) => (
                            <Spacer vertical={4} key={"spacer-" + index} />
                          )
                        )}
                      </Cards>
                    </ScrollFlex>
                    <PaginationWrapper>
                      <Pagination
                        page={currentPage}
                        pageCount={pageCount}
                        onChange={(page) => {
                          setParams((prev) => ({
                            ...prev,
                            offset: page * PAGE_SIZE,
                          }));
                        }}
                      />
                    </PaginationWrapper>
                    {/* <div>
                      <button
                        onClick={() => {
                          setParams((prev) => ({
                            ...prev,
                            offset: Math.max(0, (prev.offset ?? 0) - 30),
                          }));
                        }}
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => {
                          setParams((prev) => ({
                            ...prev,
                            offset: (prev.offset ?? 0) + 30,
                          }));
                        }}
                      >
                        Next
                      </button>
                    </div> */}
                  </div>
                );
              }}
            />
          }
        />
      }
    />
  );
});

type WorkoutCardProps = {
  distance: number;
  duration: number;
};

const WorkoutCard = memo<WorkoutCardProps>(({ distance, duration }) => {
  return (
    <CardWrapper>
      <CardHeader>
        <Distance distance={distance} />
        <Duration duration={duration} />
      </CardHeader>
    </CardWrapper>
  );
  // <div key={workout.id}>
  //  <Link to={`/workout/${workout.id}`}>
  //    {workout.distance}m / {workout.duration} minutes
  //  </Link>
  //  {" - "}
  //  <Link to={`/user/${workout.user}`}>
  //    {workout.user}
  //  </Link>
  //  {" - "}
  //  <Link to={`/place/${workout.place}`}>
  //    {workout.place}
  //  </Link>
  // </div>
});

const PaginationWrapper = styled("div", {
  padding: "$04",
  paddingTop: 0,
});

const Cards = styled("div", {
  padding: "$04",
  paddingRight: "$10",
});

const CardWrapper = styled("div", {
  backgroundColor: "$transparentBlue",
  borderRadius: "$big",
  minHeight: "$20",
});

const CardHeader = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
