import { forwardRef, memo } from "react";
import { styled } from "stitches.config";
import { FormFieldAccess, useTypedController } from "hooks/useTypedForm";
import { FieldError } from "react-hook-form";
import { Colors } from "logic/Colors";

type Props = {
  type?: "text" | "password";
  error?: string | FieldError | undefined;
  placeholder?: string;
  disabled?: boolean;
  prefix?: string;

  value?: string;
  onChange?: (val: string | React.ChangeEvent<HTMLElement>) => void;
  onBlur?: () => void;
  name?: string;
};

export const TextInput = memo(
  forwardRef<HTMLInputElement, Props>(
    (
      {
        error,
        disabled,
        placeholder,
        prefix,
        type = "text",
        name,
        onBlur,
        onChange,
        value,
      },
      ref
    ) => {
      const errorMsg =
        error && (typeof error === "string" ? error : error.message);
      const hasError = errorMsg && errorMsg.length > 0;

      return (
        <Wrapper>
          <InputWrapper>
            {prefix && <Prefix>{prefix}</Prefix>}
            <Input
              {...{ name, onBlur, onChange, type, placeholder, value }}
              mode={hasError ? "error" : undefined}
              disabled={disabled}
              ref={ref}
            />
          </InputWrapper>
          {hasError && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Wrapper>
      );
    }
  )
);

type FormProps = {
  access: FormFieldAccess<string>;
  type?: "text" | "password";
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  prefix?: string;
};

export const FormTextInput = memo<FormProps>(
  ({
    access,
    placeholder,
    type = "text",
    disabled = false,
    prefix,
    defaultValue = "",
  }) => {
    const {
      field,
      fieldState: { error },
    } = useTypedController(access, defaultValue);

    return (
      <TextInput
        {...field}
        {...{ error, placeholder, type, disabled, prefix }}
      />
    );
  }
);

const Prefix = styled("span", {
  fontFamily: "$spaceGrotesk",
  fontHeight: "$12",
  paddingRight: "$04",
});

const InputWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

const Input = styled("input", {
  margin: 0,
  width: 1,
  flex: 1,
  fontHeight: "$10",
  fontFamily: "$spaceGrotesk",
  paddingLeft: "$02",
  paddingTop: "$02",
  paddingBottom: "$02",
  paddingRight: "$02",
  borderWidth: "$small",
  borderColor: Colors.blue(300),
  borderStyle: "solid",
  backgroundColor: Colors.indigo(50),
  borderRadius: "$medium",
  variants: {
    mode: {
      error: {
        borderColor: Colors.red(500),
      },
    },
  },
});

const ErrorMessage = styled("p", {
  fontHeight: "$10",
  color: Colors.red(500),
  paddingLeft: "$02",
  paddingRight: "$02",
});
