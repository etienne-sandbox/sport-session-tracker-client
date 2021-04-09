import { Select } from "components/Select";
import { Spacer } from "components/Spacer";
import { WorkoutsParams } from "logic/api";
import { Colors } from "logic/Colors";
import { memo } from "react";
import { styled } from "stitches.config";

const SORT_ITEMS: Array<Required<WorkoutsParams>["sort"]> = [
  "date",
  "place",
  "user",
  "distance",
  "duration",
  "speed",
];

const ORDER_ITEMS: Array<Required<WorkoutsParams>["order"]> = ["asc", "desc"];

type WorkoutFiltersProps = {
  sortBy: Required<WorkoutsParams>["sort"];
  setSortBy: (val: Required<WorkoutsParams>["sort"]) => void;
  orderBy: Required<WorkoutsParams>["order"];
  setOrderBy: (val: Required<WorkoutsParams>["order"]) => void;
};

export const WorkoutFilters = memo<WorkoutFiltersProps>(
  ({ sortBy, setSortBy, orderBy, setOrderBy }) => {
    return (
      <Filters>
        <FilterTitle>Filters</FilterTitle>
        <FilterHorizontalBlock>
          <FilterName>Sort by</FilterName>
          <Select
            selected={sortBy}
            items={SORT_ITEMS}
            renderItem={(item) => {
              return item[0].toUpperCase() + item.slice(1);
            }}
            onChange={setSortBy}
          />
        </FilterHorizontalBlock>
        <Spacer vertical={4} />
        <FilterHorizontalBlock>
          <FilterName>Order</FilterName>
          <Select
            selected={orderBy}
            items={ORDER_ITEMS}
            renderItem={(item) => {
              return item === "asc" ? "Ascendant" : "Descendant";
            }}
            onChange={setOrderBy}
          />
        </FilterHorizontalBlock>
      </Filters>
    );
  }
);

const FilterTitle = styled("h2", {
  textAlign: "center",
  fontHeight: "$14",
  paddingTop: "$04",
  paddingBottom: "$02",
});

const Filters = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  overflow: "hidden",
  minWidth: 250,
});

const FilterName = styled("p", {
  paddingRight: "$02",
  paddingLeft: "$02",
  fontHeight: "$10",
  flex: 1,
  fontWeight: "$500",
});

const FilterHorizontalBlock = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "$02",
  marginLeft: "$04",
  backgroundColor: Colors.indigo(50),
  borderRadius: "$medium",
});
