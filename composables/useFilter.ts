export interface Filter {
  filter: Record<string, string>;
}
export function useFilter() {
  let debounceTimeout: any = null;
  const state = reactive<Filter>({
    filter: {},
  });
  function onFilter(cb: () => void, immediate = true) {
    watch(
      () => state,
      () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(async () => {
          cb();
        }, 1000);
      },
      { immediate: immediate, deep: true }
    );
  }
  function updateSearch(
    value: string,
    items: any,
    key: string,
    cb?: (value: string) => void
  ) {
    const filter = items.filter((item: any) => {
      return item[key].toLowerCase().includes(value.toLowerCase());
    });
    console.log(filter, value);
    if (value && typeof cb === "function" && filter.length === 0) {
      cb(value);
    }
  }
  return { state, onFilter, updateSearch };
}
