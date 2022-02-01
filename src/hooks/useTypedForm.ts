import { useCallback, useRef } from "react";
import {
  Control,
  FieldValues,
  UseFormProps,
  UseFormReturn,
  FieldPath,
  FieldPathValue,
  useForm,
  useController,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const TYPED_FORM_INTERNAL = Symbol("TYPED_FORM_INTERNAL");

export type FormFieldAccess<T> = {
  [TYPED_FORM_INTERNAL]: T;
  control: Control;
  path: string;
};

type UseTypedFormReturn<TFieldValues extends FieldValues> =
  UseFormReturn<TFieldValues> & {
    access: <TName extends FieldPath<TFieldValues>>(
      path: TName
    ) => FormFieldAccess<FieldPathValue<TFieldValues, TName>>;
  };

export function useTypedForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext extends object = object
>(
  schema: z.Schema<TFieldValues>,
  props: UseFormProps<TFieldValues, TContext>
): UseTypedFormReturn<TFieldValues> {
  const formResult = useForm({
    ...props,
    resolver: zodResolver(schema),
  });

  const control = formResult.control;

  const pathCache = useRef<{ [key: string]: FormFieldAccess<any> }>({});

  const access = useCallback(
    <TName extends FieldPath<TFieldValues>>(
      path: TName
    ): FormFieldAccess<FieldPathValue<TFieldValues, TName>> => {
      if (!pathCache.current[path]) {
        pathCache.current[path] = {
          path,
          control,
        } as any;
      }
      return pathCache.current[path];
    },
    [control]
  );

  return {
    ...formResult,
    access,
  } as any;
}

export type UseTypedControllerResult<T> = {
  field: {
    onChange: (val: T | React.ChangeEvent<HTMLElement>) => void;
    onBlur: () => void;
    value: T;
    name: string;
    ref: React.Ref<any>;
  };
  formState: UseFormStateReturn<FieldValues>;
  fieldState: ControllerFieldState;
};

export function useTypedController<T>(
  access: FormFieldAccess<T>,
  defaultValue?: T
): UseTypedControllerResult<T> {
  const controled = useController({
    name: access.path,
    control: access.control,
    defaultValue,
  });
  return controled;
}
