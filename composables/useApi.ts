import type { UseFetchOptions } from "#app";
import type { NitroFetchRequest } from "nitropack";
import type { FetchContext, FetchResponse, ResponseType } from "ofetch";
interface MyOptions {
  lazy?: boolean;
  handleLoading?: boolean;
}
export function useApi<T>(
  request: NitroFetchRequest,
  opts?:
    | UseFetchOptions<
        T extends void ? unknown : T,
        (res: T extends void ? unknown : T) => T extends void ? unknown : T
      >
    | undefined,
  options?: MyOptions
) {
  const fetch = options?.lazy ? useLazyFetch : useFetch;
  const config = useRuntimeConfig();
  const { getBaseUrl, setResponse, setErrorResponse, state } =
    useApiGlobalConfig();
  const accessToken = useCookie("access_token");
  const isLoading =
    options?.handleLoading !== undefined ? options.handleLoading : true;
  return fetch<T>(request, {
    ...(opts as any),
    onRequest: (req) => {
      req.options.baseURL = getBaseUrl();
      req.options.headers = {
        ...req.options.headers,
        Accept: "application/json",
      } as any;
      state.headers.forEach((header) => {
        req.options.headers = {
          ...req.options.headers,
          ...{ [header.key]: header.value },
        };
      });
    },
    onResponse: (
      res: FetchContext<any, ResponseType> & { response: FetchResponse<any> }
    ) => {
      state.onResponse = true;
      setResponse(res);
      setTimeout(() => {
        state.onResponse = false;
        state.response = null;
      }, 1000);
    },
    onResponseError: (
      error: FetchContext<any, ResponseType> & {
        response: FetchResponse<any>;
      }
    ) => {
      state.onResponseError = true;
      setErrorResponse(error);
      setTimeout(() => {
        state.onResponseError = false;
        state.responseError = null;
      }, 1000);
    },
  });
}
