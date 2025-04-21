export function useDeepRoute() {
  const router = useRouter();
  const route = useRoute();
  const state = reactive<{
    beforeRoute: boolean;
    queries: string[];
    isPageChange: boolean;
  }>({
    beforeRoute: true,
    isPageChange: false,
    queries: [],
  });
  watch(
    () => route.query.page,
    () => {
      if (route.query.page) {
        localStorage.setItem("page", route.query.page as string);
        state.isPageChange = true;
      }
    }
  );
  function onRouteValueChange(callback: () => void) {
    let debounceTimeout: any = null;
    watch(
      () => route.query,
      (query) => {
        console.log("query", query);
        clearTimeout(debounceTimeout);
        // debounceTimeout = setTimeout(() => {
        if (!state.isPageChange) {
          callback();
        } else {
          state.isPageChange = false;
        }
        // }, 1000);
      }
    );
  }

  function setRoute(query: { name: string; value: string }, page?: number) {
    if (page) {
      router.replace({
        query: {
          ...route.query,
          [query.name]: query.value,
          page,
        },
      });
    } else {
      router.replace({
        query: {
          ...route.query,
          [query.name]: query.value,
        },
      });
    }
  }
  function setMultipleRoute(queries: { name: string; value: string }[]) {
    let query = route.query;
    queries.forEach((q) => {
      query = { ...query, [q.name]: q.value };
    });
    console.log(query);
    router.replace({
      query,
    });
  }
  function clearRoute() {
    setTimeout(() => {
      router.replace({
        name: route.name as string,
        query: {
          page: 1,
        },
      });
    }, 300);
    state.isPageChange = false;
  }
  return { setRoute, setMultipleRoute, state, onRouteValueChange, clearRoute };
}
