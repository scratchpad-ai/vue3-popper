<template>
  <div class="app-container">
    <div class="app-wrapper">
      <Popper
        class="app-popover"
        container=".app-container"
        placement="top-start"
        arrow
      >
        <button>Toggle popper with container</button>
        <template #content>
          <div>This is the content of popper with container</div>
        </template>
      </Popper>

      <Popper
        class="app-popover"
        placement="right-start"
      >
        <button>Toggle popper</button>
        <template #content>
          <div>This is the content of popper</div>
        </template>
      </Popper>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  import Popper from "@/component/Popper.vue";

  export default defineComponent({
    name: "ServeDev",
    components: {
      Popper,
    },
  });
</script>

<style>
  .app-container {
    color: #2c3e50;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
  }

  .app-popover {
    display: flex;
  }

  :root {
    --popper-theme-background-color: #ffffff;
    --popper-theme-background-color-hover: #ffffff;
    --popper-theme-text-color: #333333;
    --popper-theme-border-width: 1px;
    --popper-theme-border-style: solid;
    --popper-theme-border-color: #dadada;
    --popper-theme-border-radius: 6px;
    --popper-theme-padding: 32px;
    --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
  }
</style>
