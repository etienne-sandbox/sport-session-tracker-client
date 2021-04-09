import { memo } from "react";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import * as z from "zod";
import { ZodDateISOString } from "logic/Utils";
import { DateTimeInput } from "components/DateTimeInput";
import { TextInput } from "components/TextInput";
import { Spacer } from "components/Spacer";
import { useTypedForm } from "hooks/useTypedForm";

const WorkoutFormData = z.object({
  date: ZodDateISOString,
  duration: z.number().int().positive(),
  distance: z.number().int().positive(),
  place: z.string(),
});

export const NewWorkout = memo(() => {
  const { handleSubmit, access } = useTypedForm(WorkoutFormData, {
    mode: "onTouched",
  });

  console.log(handleSubmit, access);

  return (
    <AuthenticatedLayout
      content={
        <div style={{ display: "flex" }}>
          <DateTimeInput
            value={new Date()}
            onChange={(val) => {
              console.log(val);
            }}
          />
          <Spacer horizontal={2} />
          <div style={{ width: 200 }}>
            <TextInput value="Hello" />
          </div>
        </div>
      }
    />
  );
});
