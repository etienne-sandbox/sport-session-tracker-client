import * as z from "zod";
import { memo } from "react";
import { FormTextInput } from "components/TextInput";
import { Button } from "components/Button";
import { FormLayout } from "components/FormLayout";
import { Link } from "react-router-dom";
import { styled } from "stitches.config";
import { Layout } from "./Layout";
import { useMutation } from "react-query";
import { actionSignup, SignupParams } from "logic/api";
import { ErrorBox } from "components/ErrorBox";
import { Spacer } from "components/Spacer";
import { useFetcherOrThrow } from "hooks/useFetcher";
import { useAlert } from "react-alert";
import { useTypedForm } from "hooks/useTypedForm";

const SignupFormData = z.object({
  username: z
    .string()
    .regex(
      /[a-z0-9_-]+/,
      'Must only contains lowercase letter, digit, "-" and "_"'
    ),
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

type Props = {
  setToken: (token: string) => void;
};

export const Signup = memo<Props>(({ setToken }) => {
  const alert = useAlert();

  const fetcher = useFetcherOrThrow();

  const { error, isLoading, mutate } = useMutation(
    (data: SignupParams) => actionSignup.queryFn(fetcher, data),
    {
      onSuccess: ({ token }) => {
        setToken(token);
        alert.success("Signup successful, you are now logged in !");
      },
    }
  );

  const { handleSubmit, access } = useTypedForm(SignupFormData, {
    mode: "onTouched",
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
            <FormTextInput
              access={access("firstName")}
              placeholder="First Name"
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <FormTextInput
              access={access("lastName")}
              placeholder="Last Name"
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <FormTextInput
              access={access("username")}
              type="text"
              placeholder="username"
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <FormTextInput
              access={access("password")}
              type="password"
              placeholder="password"
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <FormTextInput
              access={access("age")}
              type="text"
              placeholder="age"
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <FormTextInput
              access={access("height")}
              type="text"
              placeholder="height"
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <FormTextInput
              access={access("weight")}
              type="text"
              placeholder="weight"
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
