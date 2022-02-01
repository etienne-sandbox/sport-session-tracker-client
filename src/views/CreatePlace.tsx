import { memo } from "react";
import { Layout } from "./Layout";
import * as z from "zod";
import { ZodDateISOString } from "logic/Utils";
import { useTypedForm } from "hooks/useTypedForm";
import { MainHeader } from "components/MainHeader";
import { InProgress } from "components/InProgress";

const WorkoutFormData = z.object({
  date: ZodDateISOString,
  duration: z.number().int().positive(),
  distance: z.number().int().positive(),
  place: z.string(),
});

export const CreatePlace = memo(() => {
  useTypedForm(WorkoutFormData, {
    mode: "onTouched",
  });

  return (
    <Layout
      header={<MainHeader backFallback="/places" />}
      content={<InProgress />}
    />
  );
});
