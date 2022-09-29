import { ref, onMounted, onBeforeUnmount, watch } from "vue";
export default function useContent(slots, popperNode, content) {
  let observer = null;
  const hasContent = ref(false);

  onMounted(() => {
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  });

  watch(popperNode, popperNode => {
    if (!observer) {
      observer = new MutationObserver(checkContent);
      observer.observe(popperNode, {
        childList: true,
        subtree: true,
      });
    }
  });

  /**
   * Watch the content prop
   */
  watch(content, content => {
    if (content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  });

  /**
   * Check the content slot
   */
  const checkContent = () => {
    if (slots.content) {
      hasContent.value = true;
    } else {
      hasContent.value = false;
    }
  };

  return {
    hasContent,
  };
}
