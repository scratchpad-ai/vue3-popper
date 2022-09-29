<template>
  <Teleport v-if="to" :to="to" :disabled="disabled">
    <slot />
  </Teleport>
  <template v-else>
    <slot />
  </template>
</template>

<script>
  import { Teleport } from "vue";

  export default {
    props: {
      to: String,
      disabled: Boolean,
    },

    components: {
      Teleport,
    },
  }
</script>
