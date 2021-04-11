import { memo } from "react";
import { Layout } from "./Layout";
import * as z from "zod";
import { ZodDateISOString } from "logic/Utils";
import { DateTimeInput } from "components/DateTimeInput";
import { useTypedForm } from "hooks/useTypedForm";
import { MainHeader } from "components/MainHeader";

const WorkoutFormData = z.object({
  date: ZodDateISOString,
  duration: z.number().int().positive(),
  distance: z.number().int().positive(),
  place: z.string(),
});

export const CreateWorkout = memo(() => {
  const {} = useTypedForm(WorkoutFormData, {
    mode: "onTouched",
  });

  return (
    <Layout
      content={
        <div style={{ display: "flex" }}>
          <DateTimeInput
            value={new Date()}
            onChange={(val) => {
              console.log(val);
            }}
          />
        </div>
      }
    />
  );
});
