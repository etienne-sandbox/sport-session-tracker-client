import { memo } from "react";
import { AuthenticatedLayout } from "./AuthenticatedLayout";

export const NewWorkout = memo(() => {
  return <AuthenticatedLayout content={<p>TODO</p>} />;
});
