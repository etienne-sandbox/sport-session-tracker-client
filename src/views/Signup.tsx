import { memo } from "react";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { FormLayout } from "components/FormLayout";
import { Link } from "react-router-dom";
import { styled } from "stitches.config";
import { Layout } from "./Layout";
import { useMutation } from "react-query";
import { actionSignup, SignupParams } from "logic/api";
import { ErrorBox } from "components/ErrorBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Spacer } from "components/Spacer";
import { useFetcherOrThrow } from "hooks/useFetcher";

const SignupFormData = z.object({
  username: z
    .string()
    .regex(/[A-Za-z0-9_-]+/, 'Must only conatins letter, digit, "-" and "_"'),
  password: z.string().min(6),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  age: z
    .string()
    .nonempty()
    .regex(/^[1-9]+[0-9]*$/, "Must be a valid number"),
  weight: z
    .string()
    .nonempty()
    .regex(/^[1-9]+[0-9]*((\.|,)[0-9]{0,2})?$/, "Must be a valid number"),
  height: z
    .string()
    .nonempty()
    .regex(/^[1-9]+[0-9]*((\.|,)[0-9]{0,2})?$/, "Must be a valid number"),
});

type TSignupFormData = z.infer<typeof SignupFormData>;

type Props = {
  setToken: (token: string) => void;
};

export const Signup = memo<Props>(({ setToken }) => {
  const fetcher = useFetcherOrThrow();

  const { error, isLoading, mutate } = useMutation(
    (data: SignupParams) => actionSignup.queryFn(fetcher, data),
    {
      onSuccess: ({ token }) => {
        setToken(token);
      },
    }
  );

  const { handleSubmit, control } = useForm<z.infer<typeof SignupFormData>>({
    mode: "onTouched",
    resolver: zodResolver(SignupFormData),
  });

  const onSubmit = handleSubmit(({ age, height, weight, ...other }) => {
    mutate({
      ...other,
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
    });
  });

  return (
    <Layout
      content={
        <FormLayout title="Signup">
          <Form onSubmit={onSubmit}>
            {error && (
              <>
                <ErrorBox error={error} />
                <Spacer vertical={2} />
              </>
            )}
            <TextInput<TSignupFormData>
              name="firstName"
              placeholder="First Name"
              control={control}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput<TSignupFormData>
              name="lastName"
              placeholder="Last Name"
              control={control}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput<TSignupFormData>
              type="text"
              name="username"
              placeholder="username"
              control={control}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput<TSignupFormData>
              type="password"
              name="password"
              placeholder="password"
              control={control}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput<TSignupFormData>
              type="text"
              name="age"
              placeholder="age"
              control={control}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput<TSignupFormData>
              type="text"
              name="height"
              placeholder="height"
              control={control}
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput<TSignupFormData>
              type="text"
              name="weight"
              placeholder="weight"
              control={control}
              disabled={isLoading}
            />
            <Spacer vertical={[1, 0]} />
            <Button type="submit" text="Signup" disabled={isLoading} />
          </Form>
          <Spacer vertical={[1, 0]} />
          <InfoText>
            Already have an account ? <Link to="/login">Login here</Link>
          </InfoText>
        </FormLayout>
      }
    />
  );
});

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  alignSelf: "center",
  maxWidth: 300,
  width: "100%",
});

const InfoText = styled("p", {
  textAlign: "center",
  fontWeight: "$300",
  lineHeight: "$10",
});
