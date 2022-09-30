import { unref } from "vue";
import useEventListener from "./useEventListener";

export default function useClickAway(targetContainer, targetContent, customMatcherFn, handler) {
  const event = "pointerdown";

  if (typeof window === "undefined" || !window) {
    return;
  }

  const isClickInsideElement = (event, element) => {
    return element === event.target || event.composedPath().includes(element);
  };

  const listener = (event) => {
    const targetContainerEl = unref(targetContainer);
    const targetContentEl = unref(targetContent);
    if (!targetContainerEl && !targetContentEl) {
      return;
    }

    if (
      isClickInsideElement(event, targetContainerEl) ||
      isClickInsideElement(event, targetContentEl) ||
      (customMatcherFn && customMatcherFn(event))
    ) {
      return;
    }

    handler(event);
  };

  return useEventListener(window, event, listener);
}
