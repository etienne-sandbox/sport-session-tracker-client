import { ResourceHandler } from "components/ResourceHandler";
import { ScrollFlex } from "components/ScrollFlex";
import { Spacer } from "components/Spacer";
import { useApiRoute } from "hooks/useApiRoute";
import { usePublicUrl } from "hooks/usePublicUrl";
import { getPlace } from "logic/api";
import { Colors } from "logic/Colors";
import { memo, useRef } from "react";
import { styled } from "stitches.config";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

type Props = {
  placeSlug: string;
};

const HEADER_HEIGHT = 400;

export const PlacePage = memo<Props>(({ placeSlug }) => {
  const placeRes = useApiRoute(getPlace, placeSlug);
  const publicUrl = usePublicUrl();

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <AuthenticatedLayout
      content={
        <ResourceHandler
          resource={placeRes}
          renderResolved={(place) => (
            <Wrapper>
              <Header ref={headerRef}>
                <HeaderImage src={publicUrl + place.image} />
                <PlaceName>{place.name}</PlaceName>
              </Header>
              <ScrollFlex
                onScroll={(e) => {
                  const elem = headerRef.current;
                  if (elem) {
                    const translate = Math.min(HEADER_HEIGHT - 50, e.scrollTop);
                    elem.style.transform = `translateY(-${translate}px)`;
                  }
                }}
              >
                <div>
                  <div style={{ height: HEADER_HEIGHT }} />
                  <Spacer vertical={4} />
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Perspiciatis molestiae, consequatur quis id omnis delectus
                      eum, perferendis ullam odit aspernatur alias sed
                      asperiores cupiditate officia impedit illum necessitatibus
                      sit dignissimos?
                    </p>
                  </div>
                </div>
              </ScrollFlex>
            </Wrapper>
          )}
        />
      }
    />
  );
});

const Wrapper = styled("div", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

const Header = styled("div", {
  height: HEADER_HEIGHT,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  backgroundSize: "cover",
  overflow: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  pointerEvents: "none",
});

const HeaderImage = styled("img", {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
});

const PlaceName = styled("h2", {
  position: "relative",
  background:
    "linear-gradient(0deg, rgba(38,50,56,0.6) 0%, rgba(38,50,56,0) 100%)",
  color: Colors.white,
  fontHeight: "$20",
  fontWeight: "$600",
  paddingLeft: "$04",
  paddingTop: "$06",
  flex: 1,
});
