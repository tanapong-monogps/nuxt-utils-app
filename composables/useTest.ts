interface Test {
  test: string;
}
export function useTest() {
  const state = reactive<Test>({
    test: "test",
  });
  function test() {
    return state.test;
  }
  return {
    state,
    test,
  };
}
