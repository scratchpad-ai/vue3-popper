import { unref } from "vue";
import useEventListener from "./useEventListener";

export default function useClickAway(targetContainer, targetContent, handler) {
  const event = "pointerdown";

  if (typeof window === "undefined" || !window) {
    return;
  }

  const listener = event => {
    const targetContainerEl = unref(targetContainer);
    const targetContentEl = unref(targetContent);
    if (!targetContainerEl && !targetContentEl) {
      return;
    }

    if (
      targetContainerEl === event.target ||
      targetContentEl === event.target ||
      event.composedPath().includes(targetContainerEl) ||
      event.composedPath().includes(targetContentEl)
    ) {
      return;
    }

    handler(event);
  };

  return useEventListener(window, event, listener);
}
