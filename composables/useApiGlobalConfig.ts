interface Header {
  key: string;
  value: string;
}
interface State {
  baseUrl: string;
  onResponse: boolean;
  onResponseError: boolean;
  responseError: any;
  response: any;
  headers: Header[];
}

import type { FetchContext, FetchResponse, ResponseType } from "ofetch";
export const useApiGlobalConfig = defineStore("useApiGlobalConfig", () => {
  const state = reactive<State>({
    baseUrl: "",
    onResponse: false,
    response: null,
    onResponseError: false,
    responseError: null,
    headers: [],
  });
  function setBaseUrl(url: string) {
    state.baseUrl = url;
  }
  function headers() {
    function add(key: string, value: string) {
      state.headers.push({ key, value });
    }
    function remove(key: string) {
      state.headers = state.headers.filter((header) => header.key !== key);
    }
    function get() {
      return state.headers;
    }
    return {
      add,
      remove,
      get,
    };
  }
  function setResponse(
    response: FetchContext<any, ResponseType> & { response: FetchResponse<any> }
  ) {
    state.response = response;
  }
  function setErrorResponse(
    response: FetchContext<any, ResponseType> & { response: FetchResponse<any> }
  ) {
    state.responseError = response;
  }
  function onResponseError(
    callback: (
      response: FetchContext<any, ResponseType> & {
        response: FetchResponse<any>;
      }
    ) => void
  ) {
    watch(
      () => state.onResponseError,
      (newVal) => {
        if (newVal) {
          callback(state.responseError);
        }
      }
    );
  }
  function onResponse(
    callback: (
      response: FetchContext<any, ResponseType> & {
        response: FetchResponse<any>;
      }
    ) => void
  ) {
    watch(
      () => state.onResponse,
      (newVal) => {
        if (newVal) {
          callback(state.response);
        }
      }
    );
  }
  function getBaseUrl() {
    return state.baseUrl;
  }
  return {
    state,
    setResponse,
    onResponse,
    setBaseUrl,
    getBaseUrl,
    onResponseError,
    setErrorResponse,
    headers,
  };
});
