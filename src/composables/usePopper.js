import { toRefs, watch, nextTick, onBeforeUnmount, reactive } from "vue";
import { createPopper } from "@popperjs/core/lib/popper-lite.js";
import popperPreventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
import flip from "@popperjs/core/lib/modifiers/flip.js";
import offset from "@popperjs/core/lib/modifiers/offset";
import arrow from "@popperjs/core/lib/modifiers/arrow";

const toInt = x => parseInt(x, 10);

export default function usePopper({
  arrowPadding,
  emit,
  locked,
  offsetDistance,
  offsetSkid,
  placement,
  popperNode,
  triggerNode,
  preventOverflow = {},
}) {
  const state = reactive({
    isOpen: false,
    popperInstance: null,
  });

  // Enable or disable event listeners to optimize performance.
  const setPopperEventListeners = enabled => {
    state.popperInstance?.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: "eventListeners", enabled }],
    }));
  };

  const enablePopperEventListeners = () => setPopperEventListeners(true);
  const disablePopperEventListeners = () => setPopperEventListeners(false);

  const close = () => {
    if (!state.isOpen) {
      return;
    }

    state.isOpen = false;
    emit("close:popper");
  };

  const open = () => {
    if (state.isOpen) {
      return;
    }

    state.isOpen = true;
    emit("open:popper");
  };

  const update = () => {
    state.popperInstance ? state.popperInstance.update() : initializePopper();
  }

  // When isOpen or placement change
  watch([() => state.isOpen, placement], async ([isOpen]) => {
    if (isOpen) {
      await initializePopper();
      enablePopperEventListeners();
    } else {
      disablePopperEventListeners();
    }
  });

  const initializePopper = async () => {
    await nextTick();
    state.popperInstance = createPopper(triggerNode.value, popperNode.value, {
      placement: placement.value,
      modifiers: [
        popperPreventOverflow,
        {
          name: "preventOverflow",
          options: {
            boundary: typeof preventOverflow.boundary === 'string' ? document.querySelector(preventOverflow.boundary) : preventOverflow.boundary,
            padding: preventOverflow.padding,
          },
        },
        flip,
        {
          name: "flip",
          enabled: !locked.value,
        },
        arrow,
        {
          name: "arrow",
          options: {
            padding: toInt(arrowPadding.value),
          },
        },
        offset,
        {
          name: "offset",
          options: {
            offset: [toInt(offsetSkid.value), toInt(offsetDistance.value)],
          },
        },
      ],
    });

    // Update its position
    await state.popperInstance.update();
  };

  onBeforeUnmount(() => {
    state.popperInstance?.destroy();
  });

  return {
    ...toRefs(state),
    open,
    close,
    update,
  };
}
