interface State {
  baseUrl: string;
  onResponse: boolean;
  onResponseError: boolean;
  responseError: any;
  response: any;
}
import type { FetchContext, FetchResponse, ResponseType } from "ofetch";
export const useApiGlobalConfig = defineStore("useApiGlobalConfig", () => {
  const state = reactive<State>({
    baseUrl: "",
    onResponse: false,
    response: null,
    onResponseError: false,
    responseError: null,
  });
  function setBaseUrl(url: string) {
    state.baseUrl = url;
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
          console.log("onResponseError", newVal);
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
          console.log("onResponse", newVal);
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
  };
});
