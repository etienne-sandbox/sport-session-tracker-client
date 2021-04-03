import { Fragment } from "react";

type Props<T> = {
  list: Array<T>;
  spacer?: JSX.Element | null | false;
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => JSX.Element;
  renderEmpty?: () => JSX.Element;
};

export function ListHandler<T>({
  list,
  renderEmpty,
  renderItem,
  spacer,
  getKey,
}: Props<T>): JSX.Element | null {
  if (list.length === 0) {
    if (renderEmpty) {
      return renderEmpty();
    }
    return null;
  }

  return (
    <Fragment>
      {list.map((item, index) => {
        const key = getKey(item, index);
        const isLast = index === list.length - 1;
        return (
          <Fragment key={key}>
            {renderItem(item, index)}
            {spacer && isLast ? spacer : null}
          </Fragment>
        );
      })}
    </Fragment>
  );
}
