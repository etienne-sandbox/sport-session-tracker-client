import Ky from "ky";
import * as z from "zod";

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
      searchParams: search ? search(params) : undefined,
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
      console.log(parsed.error);
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

export type WorkoutsParams = {
  offset?: number | undefined;
  limit?: number | undefined;
  places?: string[] | undefined;
  order?: "asc" | "desc" | undefined;
  sort?: "date" | "place" | "user" | undefined;
};

export const workouts = createApiRoute({
  method: "GET",
  getPath: () => "workouts",
  getKey: (params: WorkoutsParams) => ["workouts", params],
  schema: z.object({
    results: z.array(
      z.object({
        id: z.string(),
        date: z.string(),
        place: z.string(),
        distance: z.number(),
        duration: z.number(),
        user: z.string(),
      })
    ),
    total: z.number(),
  }),
  search: (params: WorkoutsParams) => params,
});

// export async function login(
//   fetcher: Fetcher,
//   data: { username: string; password: string }
// ) {
//   return fetcher
//     .post("action/login", {
//       json: data,
//     })
//     .json<{ token: string }>();
// }

// export async function createList(authFetcher: Fetcher, data: { name: string }) {
//   return authFetcher
//     .post("action/create-list", {
//       json: data,
//     })
//     .json<{ id: string }>();
// }

// export interface Todo {
//   id: string;
//   name: string;
//   done: boolean;
// }

// export interface TodoList {
//   id: string;
//   name: string;
//   todos: Array<Todo>;
//   userIds: Array<string>;
// }

// export async function getList(authFetcher: Fetcher, listId: string) {
//   return authFetcher.get(`list/${listId}`).json<TodoList>();
// }

// export async function addTodo(
//   authFetcher: Fetcher,
//   data: { listId: string; name: string; done?: boolean }
// ) {
//   return authFetcher
//     .post("action/add-todo", {
//       json: data,
//     })
//     .json<{ id: string }>();
// }

// export async function setTodoDone(
//   authFetcher: Fetcher,
//   data: { listId: string; todoId: string; done: boolean }
// ) {
//   const res = await authFetcher.post("action/set-todo-done", {
//     json: data,
//   });
//   if (res.status !== 204) {
//     throw new Error("Invalid response status");
//   }
//   return;
// }
