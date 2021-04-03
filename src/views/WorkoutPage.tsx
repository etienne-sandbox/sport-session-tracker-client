import { memo } from "react";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

type Props = {
  workoutId: string;
};

export const WorkoutPage = memo<Props>(({ workoutId }) => {
  return <AuthenticatedLayout content={<p>TODO: {workoutId}</p>} />;
});
