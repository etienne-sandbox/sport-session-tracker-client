import Ky from "ky";
import * as z from "zod";
import { stringify as stringifyQuerystring } from "querystring";

const UserSchema = z.object({
  username: z.string(),
  token: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export type Fetcher = typeof Ky;

export function createFetcher(port: string): Fetcher {
  return Ky.create({
    prefixUrl: `http://localhost:${port}`,
    hooks: {
      afterResponse: [
        async function parseJsonError(_request, _options, response) {
          if (response.ok) {
            return response;
          }
          const json = await response.json();
          (response as any).parsed = json;
          return response;
        },
      ],
    },
  });
}

export function createAuthFetcher(fetcher: Fetcher, token: string) {
  return fetcher.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

type CreateApiRouteOption<Params, Result> = {
  method: "GET" | "POST";
  getPath: (params: Params) => string;
  getKey: (params: Params) => any;
  schema: z.Schema<Result> | null;
  body?: (params: Params) => any;
  search?: (params: Params) => any;
};

type QueryFn<Params, Result> = Params extends null
  ? (fetcher: Fetcher) => Promise<Result>
  : (fetcher: Fetcher, params: Params) => Promise<Result>;

export type ApiRoute<Params, Result> = {
  queryFn: QueryFn<Params, Result>;
  getKey: (params: Params) => any;
};

function createApiRoute<Params = null, Result = null>({
  getKey,
  getPath,
  method,
  body,
  search,
  schema,
}: CreateApiRouteOption<Params, Result>): ApiRoute<Params, Result> {
  async function queryFn(fetcher: Fetcher, params: Params): Promise<Result> {
    const methodFn =
      method === "GET" ? fetcher.get : method === "POST" ? fetcher.post : null;
    if (methodFn === null) {
      throw new Error("Invalid Method");
    }
    const path = getPath(params);
    const res = await methodFn(path, {
      json: body ? body(params) : undefined,
      searchParams: search ? stringifyQuerystring(search(params)) : undefined,
    });
    if (schema === null) {
      if (!res.ok) {
        throw new Error("Response not OK");
      }
      return null as any;
    }
    const data = await res.json();
    const parsed = schema.safeParse(data);
    if (parsed.success === false) {
      console.error(parsed.error);
      throw parsed.error;
    }
    return parsed.data;
  }
  return {
    queryFn: queryFn as any,
    getKey,
  };
}

export const getMe = createApiRoute({
  method: "GET",
  getKey: () => "me",
  getPath: () => "me",
  schema: UserSchema,
});

export type SignupParams = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
};

export const actionSignup = createApiRoute({
  method: "POST",
  getPath: () => "action/signup",
  getKey: () => "signup",
  schema: z.object({ token: z.string() }),
  body: (data: SignupParams) => data,
});

export type LoginParams = {
  username: string;
  password: string;
};

export const actionLogin = createApiRoute({
  method: "POST",
  getPath: () => "action/login",
  getKey: () => "login",
  schema: z.object({ token: z.string() }),
  body: (data: LoginParams) => data,
});

export type GetWorkoutsParams = {
  offset?: number | undefined;
  limit?: number | undefined;
  places?: string[] | undefined;
  order?: "asc" | "desc" | undefined;
  sort?:
    | "date"
    | "place"
    | "user"
    | "distance"
    | "duration"
    | "speed"
    | undefined;
  users?: string[] | undefined;
};

export const getWorkouts = createApiRoute({
  method: "GET",
  getPath: () => "workouts",
  getKey: (params: GetWorkoutsParams) => ["workouts", params],
  schema: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        date: z.string(),
        place: z.string(),
        placeName: z.string(),
        distance: z.number(),
        duration: z.number(),
        user: z.string(),
        speed: z.number(),
        userName: z.string(),
      })
    ),
    total: z.number(),
  }),
  search: (params: GetWorkoutsParams) => params,
});

export type ActionCreateWorkoutParams = {
  date: string;
  duration: number;
  distance: number;
  place: string;
};

export const actionCreateWorkout = createApiRoute({
  method: "POST",
  getPath: () => "/action/create-workout",
  getKey: () => "create-workout",
  schema: z.object({
    id: z.string(),
  }),
  body: (params: ActionCreateWorkoutParams) => params,
});

export const getPlace = createApiRoute({
  method: "GET",
  getPath: (slug: string) => `place/${slug}`,
  getKey: (slug: string) => ["place", slug],
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    lng: z.number(),
    lat: z.number(),
    image: z.string(),
  }),
});

export type GetPlacesParams = {
  offset?: number | undefined;
  limit?: number | undefined;
};

export const getPlaces = createApiRoute({
  method: "GET",
  getPath: () => `places`,
  getKey: (params: GetPlacesParams) => ["places", params],
  search: (params: GetPlacesParams) => params,
  schema: z.object({
    results: z.array(
      z.object({
        slug: z.string(),
        name: z.string(),
        image: z.string(),
        workoutCount: z.number(),
      })
    ),
    total: z.number(),
  }),
});
