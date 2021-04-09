import { useLocation } from "react-router";
import * as z from "zod";
import { parse } from "querystring";
import { useMemo } from "react";

export type Validator<Out> = (key: string, val: unknown) => Out;

function optional<T>(validator: Validator<T>): Validator<T | undefined> {
  return (key, val) => {
    if (val === undefined || val === null) {
      return undefined;
    }
    return validator(key, val);
  };
}

function arrayValidator<T>(validator: Validator<T>): Validator<Array<T>> {
  return (key, val) => {
    if (Array.isArray(val)) {
      return val.map((v) => validator(key, v));
    }
    try {
      const single = validator(key, val);
      return [single];
    } catch (error) {
      throw new Error(`Invalid ${key} search param: expecting array`);
    }
  };
}

const stringValidator: Validator<string> = (key, val) => {
  if (typeof val !== "string") {
    throw new Error(`Invalid ${key} search param: expecting string`);
  }
  return val;
};

const intValidator: Validator<number> = (key, val) => {
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "string") {
    const num = parseInt(val, 10);
    if (Number.isNaN(num)) {
      throw new Error(`Invalid ${key} search param: expecting number, got NaN`);
    }
    return num;
  }
  throw new Error(`Invalid ${key} search param: expecting number`);
};

export const Validators = {
  optional,
  string: stringValidator,
  int: intValidator,
  array: arrayValidator,
};

export function createUseRouterQuery<T>(
  validators: { [K in keyof T]: Validator<any> },
  schema: z.Schema<T>
) {
  return function useRouterQuery(): T {
    const location = useLocation();

    const search = location.search.replace(/^\?/, "");

    const query = useMemo((): T => {
      const obj = parse(search);
      const raw: any = {};
      const allKeys = new Set([
        ...Object.keys(obj),
        ...Object.keys(validators),
      ]);
      allKeys.forEach((key) => {
        const value = obj[key];
        const validator = (validators as any)[key];
        if (!validator) {
          console.warn(`Invalid search params ${key}`);
          return;
        }
        let validated = undefined;
        try {
          validated = validator(key, value);
        } catch (error) {
          console.warn(`Invalid ${key}: ${error}`);
        }
        if (validated !== undefined) {
          raw[key] = validated;
        }
      });
      const parsed = schema.safeParse(raw);
      if (parsed.success === false) {
        const message = parsed.error.errors.map(
          (err) => `${err.path.join(".")}: ${err.message}`
        );
        console.warn(`Schema validation failed:\n${message}`);
        return {} as any;
      }
      return parsed.data;
    }, [search]);

    return query;
  };
}
