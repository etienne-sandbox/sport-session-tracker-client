import { CSSProperties, memo, RefObject, useMemo, useRef } from "react";
import { styled, size } from "stitches.config";
import Scrollbar from "react-scrollbars-custom";
import useComponentSize from "@rehooks/component-size";

type Direction = "vertical" | "horizontal" | "both";

export type ScrollState = {
  clientHeight: number;
  clientWidth: number;
  contentScrollHeight: number;
  contentScrollWidth: number;
  scrollHeight: number;
  scrollWidth: number;
  scrollTop: number;
  scrollLeft: number;
  scrollYBlocked: boolean;
  scrollXBlocked: boolean;
  scrollYPossible: boolean;
  scrollXPossible: boolean;
  trackYVisible: boolean;
  trackXVisible: boolean;
  isRTL?: boolean;
  zoomLevel: number;
};

type Props = {
  children: JSX.Element | null;
  direction?: Direction;
  justifyContent?: "center" | "flex-start";
  scrollRef?: RefObject<Scrollbar | null>;
  onScroll?: (scrollValues: ScrollState, prevScrollState: ScrollState) => void;
};

export const ScrollFlex = memo<Props>(
  ({
    children,
    direction = "vertical",
    justifyContent = "flex-start",
    scrollRef,
    onScroll,
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
          onScroll={onScroll as any}
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
