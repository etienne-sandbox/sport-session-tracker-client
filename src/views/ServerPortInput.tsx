import { Fragment, memo } from "react";
import { Layout } from "./Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { styled } from "stitches.config";
import { ErrorBox } from "components/ErrorBox";
import { TextInput } from "components/TextInput";
import { Button } from "components/Button";
import { Spacer } from "components/Spacer";
import { FormLayout } from "components/FormLayout";
import { InfoBox } from "components/InfoBox";

const ServerPortFormData = z.object({
  port: z
    .string()
    .nonempty()
    .refine((val) => {
      const num = parseInt(val, 10);
      if (Number.isNaN(num)) {
        return false;
      }
      if (num < 1) {
        return false;
      }
      if (num.toFixed() !== val) {
        return false;
      }
      return true;
    }, "Please enter a valid port number"),
});

type TServerPortFormData = z.infer<typeof ServerPortFormData>;

type Props = {
  onChange: (v: string) => void;
  initialPort: string;
  isFetching: boolean;
};

export const ServerPortInput = memo<Props>(
  ({ onChange, initialPort, isFetching }) => {
    const { control, handleSubmit } = useForm({
      resolver: zodResolver(ServerPortFormData),
      defaultValues: {
        port: initialPort,
      },
      mode: "onTouched",
    });

    const onSubmit = handleSubmit((values) => {
      console.log(onChange);
      onChange(values.port);
    });

    return (
      <Layout
        content={
          <FormLayout title="Cannot connect">
            <Form onSubmit={onSubmit}>
              <ErrorBox error="Cannot connect to the API, please enter the port of the API" />
              <Spacer vertical={[0, 4]} />
              <InfoBox
                info={
                  <Fragment>
                    Visit the{" "}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://github.com/instant-api/todo-multi-user"
                    >
                      @instant-api/todo-multi-user
                    </a>{" "}
                    docs for more informations.
                  </Fragment>
                }
              />
              <Spacer vertical={[1, 0]} />
              <TextInput<TServerPortFormData>
                name="port"
                placeholder="port"
                control={control}
                disabled={isFetching}
                prefix="http://localhost:"
              />
              <Spacer vertical={[1, 0]} />
              <Button
                type="submit"
                text={isFetching ? "Connecting..." : "Connect"}
                disabled={isFetching}
              />
            </Form>
          </FormLayout>
        }
      />
    );
  }
);

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "center",
  alignSelf: "center",
  maxWidth: 300,
  width: "100%",
});
