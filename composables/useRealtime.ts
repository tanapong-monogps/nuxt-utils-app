export function useRealTime(seconds?: number) {
  const state = reactive<{
    isRunning: boolean;
    interval: number;
    index: number;
    isVisibility: boolean;
    timer: any;
  }>({
    isRunning: false,
    interval: (seconds || 1) * 1000,
    index: 0,
    isVisibility: true,
    timer: null,
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      state.isVisibility = true;
      start();
    } else {
      state.isVisibility = false;
      stop();
    }
  });

  onBeforeUnmount(() => {
    clearInterval(state.timer);
  });
  function onVisibilityChange(cb: (isVisibility: boolean) => void) {
    watch(
      () => state.isVisibility,
      (value) => {
        cb(value);
      }
    );
  }
  function onRealtime(cb: () => void) {
    watch(
      () => state.index,
      () => {
        cb();
      }
    );
  }

  function start() {
    if (state.isRunning) return;
    state.isRunning = true;
    state.timer = setInterval(() => {
      state.index++;
    }, state.interval);
  }

  function stop() {
    state.index = 0;
    state.isRunning = false;
    clearInterval(state.timer);
  }
  return {
    start,
    stop,
    onRealtime,
    onVisibilityChange,
  };
}
