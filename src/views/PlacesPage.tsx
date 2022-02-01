import { FunctionComponent, memo, useEffect, useMemo, useRef } from "react";
import { Layout } from "./Layout";
import { Plus } from "phosphor-react";
import { useApiRoute } from "hooks/useApiRoute";
import { getPlaces, GetPlacesParams } from "logic/api";
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
import { MainHeader } from "components/MainHeader";
import { LeftMenu } from "components/LeftMenu";
import { Button } from "components/Button";

const PAGE_SIZE = 10;

const useRouterQuery = createUseRouterQuery(
  {
    page: Validators.optional(Validators.int),
  },
  z.object({
    page: z.number().int().positive().optional(),
  })
);

export const PlacesPage: FunctionComponent = memo(() => {
  const history = useHistory();

  const query = useRouterQuery();

  const params = useMemo((): GetPlacesParams => {
    const { page = 1 } = query;
    return {
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    };
  }, [query]);

  const scrollbarRef = useRef<Scrollbar | null>(null);

  const placesRes = useApiRoute(getPlaces, params, {
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
    <Layout
      leftMenu={<LeftMenu active="places" />}
      header={
        <MainHeader
          back={false}
          loading={placesRes.isFetching}
          authRightAction={
            <Button to="/create-place" leftIcon={<Plus />} text="Place" />
          }
        />
      }
      content={
        <ResourceHandler
          resource={placesRes}
          renderPending={() => {
            return null;
          }}
          renderResolved={(places) => {
            return (
              <Content>
                <ScrollFlex scrollRef={scrollbarRef}>
                  <Cards>
                    {addBetween(
                      places.results.map((place) => {
                        return (
                          <div key={place.slug}>
                            {place.name} - {place.workoutCount}
                          </div>
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
      footer={
        <FooterWrapper style={{ minWidth: 500, alignSelf: "center" }}>
          <ResourceHandler
            resource={placesRes}
            renderPending={() => <Pagination />}
            renderRejected={() => <Pagination />}
            renderResolved={(workouts) => {
              const pageCount = Math.ceil(workouts.total / PAGE_SIZE);
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
