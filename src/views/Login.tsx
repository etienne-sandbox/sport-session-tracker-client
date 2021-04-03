import { memo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "./Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { actionLogin, LoginParams } from "logic/api";
import { useMutation } from "react-query";
import { styled } from "stitches.config";
import { ErrorBox } from "components/ErrorBox";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { Spacer } from "components/Spacer";
import { FormLayout } from "components/FormLayout";
import { useFetcherOrThrow } from "hooks/useFetcher";

const LoginFormData = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

type TLoginFormData = z.infer<typeof LoginFormData>;

type Props = {
  setToken: (token: string) => void;
};

export const Login = memo<Props>(({ setToken }) => {
  const fetcher = useFetcherOrThrow();

  const { error, isLoading, mutate } = useMutation(
    (data: LoginParams) => actionLogin.queryFn(fetcher, data),
    {
      onSuccess: ({ token }) => {
        setToken(token);
      },
    }
  );

  const { handleSubmit, control } = useForm<z.infer<typeof LoginFormData>>({
    resolver: zodResolver(LoginFormData),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((values) => {
    mutate(values);
  });

  return (
    <Layout
      content={
        <FormLayout title="Login">
          <Form onSubmit={onSubmit}>
            {error && (
              <>
                <ErrorBox error={error} />
                <Spacer vertical={2} />
              </>
            )}
            <TextInput<TLoginFormData>
              control={control}
              name="username"
              placeholder="username"
              disabled={isLoading}
            />
            <Spacer vertical={2} />
            <TextInput<TLoginFormData>
              control={control}
              type="password"
              name="password"
              placeholder="password"
              disabled={isLoading}
            />
            <Spacer vertical={[1, 0]} />
            <Button type="submit" disabled={isLoading} text="Login" />
          </Form>
          <Spacer vertical={[1, 0]} />
          <InfoText>
            Don't have an account ? <Link to="/signup">Signup here</Link>
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
