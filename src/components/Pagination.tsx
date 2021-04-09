import { memo, useCallback } from "react";
import { styled } from "stitches.config";
import { IconButton } from "./IconButton";
import { CaretLeft, CaretRight } from "phosphor-react";
import { NumberInput } from "./NumberInput";
import { clamp } from "logic/Utils";
import { Spacer } from "./Spacer";
import { Button } from "./Button";

type Props = {
  page?: number | null;
  pageCount?: number | null;
  onChange?: (page: number) => void;
  disabled?: boolean;
};

export const Pagination = memo<Props>(
  ({ page = null, pageCount = null, onChange, disabled = false }) => {
    const lastPage = pageCount === null ? null : pageCount - 1;

    const formatPage = useCallback(
      (num: number) =>
        clamp(num, 1, lastPage ? lastPage + 1 : Infinity).toFixed(0),
      [lastPage]
    );

    const onPageChange = useCallback(
      (page: number) => {
        if (onChange && lastPage !== null) {
          onChange(clamp(page, 0, lastPage));
        }
      },
      [lastPage, onChange]
    );

    if (page === null || lastPage === null) {
      return (
        <Wrapper>
          <IconButton disabled icon={<CaretLeft />} />
          <Pages />
          <IconButton disabled icon={<CaretRight />} />
        </Wrapper>
      );
    }

    const pageDisplay = page + 1;

    return (
      <Wrapper>
        <Button
          disabled={page === 0}
          leftIcon={<CaretLeft />}
          compact
          text={
            <ButtonPageText>
              {page > 0 ? `Page ${pageDisplay - 1}` : null}
            </ButtonPageText>
          }
          onClick={() => onPageChange(page - 1)}
        />
        <Spacer horizontal={4} />
        <Pages>
          Page
          <Spacer horizontal={4} />
          <PageInput>
            <NumberInput
              value={pageDisplay}
              precision={0}
              format={formatPage}
              onChange={(page) => onPageChange(page - 1)}
            />
          </PageInput>
          <Spacer horizontal={4} />/ {lastPage + 1}
        </Pages>
        <Spacer horizontal={4} />
        <Button
          disabled={page === lastPage}
          rightIcon={<CaretRight />}
          compact
          text={
            <ButtonPageText>
              {page < lastPage ? `Page ${pageDisplay + 1}` : null}
            </ButtonPageText>
          }
          onClick={() => onPageChange(page + 1)}
        />
      </Wrapper>
    );
  }
);

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  flex: 1,
});

const Pages = styled("div", {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontHeight: "$12",
});

const PageInput = styled("div", {
  minWidth: "$30",
  display: "flex",
});

const ButtonPageText = styled("span", {
  width: "$34",
  display: "inline-block",
});
