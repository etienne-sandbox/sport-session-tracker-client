import { CSSProperties, memo, RefObject, useMemo, useRef } from "react";
import { styled, size } from "stitches.config";
import Scrollbar from "react-scrollbars-custom";
import useComponentSize from "@rehooks/component-size";

type Direction = "vertical" | "horizontal" | "both";

type Props = {
  children: JSX.Element | null;
  direction?: Direction;
  justifyContent?: "center" | "flex-start";
  scrollRef?: RefObject<Scrollbar | null>;
};

export const ScrollFlex = memo<Props>(
  ({
    children,
    direction = "vertical",
    justifyContent = "flex-start",
    scrollRef,
  }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const compSize = useComponentSize(contentRef);

    const innerStyle = useMemo((): CSSProperties => {
      const styles: CSSProperties = {
        minWidth: compSize.width || 100,
        minHeight: compSize.height || 100,
        justifyContent,
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      };
      if (direction === "vertical") {
        styles.width = compSize.width;
      }
      if (direction === "horizontal") {
        styles.height = compSize.height;
      }
      return styles;
    }, [direction, justifyContent, compSize.height, compSize.width]);

    return (
      <Content ref={contentRef}>
        <Scrollbar
          noScrollX={direction === "vertical"}
          noScrollY={direction === "horizontal"}
          style={{
            width: compSize.width,
            height: compSize.height,
            position: "relative",
          }}
          scrollbarWidth={size(0, 4)}
          ref={scrollRef as any}
          disableTracksWidthCompensation={true}
        >
          <div style={innerStyle}>{children}</div>
        </Scrollbar>
      </Content>
    );
  }
);

const Content = styled("div", {
  flex: 1,
  position: "relative",
  minWidth: 1,
  minHeight: 1,
  alignSelf: "stretch",
});

// import { memo, useRef } from "react";
// import { styled } from "stitches.config";
// import useComponentSize from "@rehooks/component-size";
// import Scrollbar from "react-scrollbars-custom";

// type Props = {
//   children: JSX.Element | null;
//   horizontal?: boolean;
// };

// export const ScrollFlex = memo<Props>(({ children, horizontal = false }) => {
//   const contentRef = useRef<HTMLDivElement>(null);
//   const size = useComponentSize(contentRef);

//   return (
//     <Content
//       ref={contentRef}
//       css={
//         horizontal ? { width: 1, height: "100%" } : { height: 1, width: "100%" }
//       }
//     >
//       <Scrollbar style={{ ...size, position: "relative" }}>
//         <ContentInner style={{ minHeight: size.height }}>
//           {children}
//         </ContentInner>
//       </Scrollbar>
//     </Content>
//   );
// });

// const Content = styled("div", {
//   flex: 1,
//   position: "relative",
// });

// const ContentInner = styled("div", {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "stretch",
// });
