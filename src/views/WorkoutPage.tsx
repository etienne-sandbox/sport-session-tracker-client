import { InProgress } from "components/InProgress";
import { memo } from "react";
import { Layout } from "./Layout";

type Props = {
  workoutId: string;
};

export const WorkoutPage = memo<Props>(({ workoutId }) => {
  return <Layout content={<InProgress />} />;
});
