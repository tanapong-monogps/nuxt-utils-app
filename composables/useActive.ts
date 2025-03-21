export function useActive(seconds?: number) {
  const state = reactive<{
    isActive: boolean;
    interval: number;
    index: number;
    isVisibility: boolean;
    timer: any;
  }>({
    isActive: true,
    interval: (seconds || 1) * 1000,
    index: 0,
    isVisibility: true,
    timer: null,
  });
  const active = ref(false);
  const x = ref(0);
  const y = ref(0);

  function update(event: any) {
    state.index = 0;
    state.isActive = true;
  }

  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));
  setInterval(() => {
    state.index++;
    if (state.index === seconds) {
      state.isActive = false;
    }
  }, 1000);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      state.isVisibility = true;
    } else {
      state.isVisibility = false;
    }
  });
  function onActiveChange(cb: (isActive: boolean) => void) {
    watch(
      () => state.isActive,
      (value) => {
        cb(value);
      }
    );
  }
  function onVisibilityChange(cb: (isVisibility: boolean) => void) {
    watch(
      () => state.isVisibility,
      (value) => {
        cb(value);
      }
    );
  }
  return { active, onVisibilityChange, onActiveChange };
}
