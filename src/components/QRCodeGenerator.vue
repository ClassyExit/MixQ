<template>
  <qrcode-vue
    :value="props.value"
    :level="level"
    :render-as="renderAs"
    :size="300"
    :background="props.background"
    :foreground="props.foreground"
    :gradient="props.gradient"
    :gradient-type="gradientType"
    :gradient-start-color="props.gradientStartColor"
    :gradient-end-color="props.gradientEndColor"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";
import QrcodeVue from "qrcode.vue";
import type { Level, RenderAs, GradientType } from "qrcode.vue";

const level = ref<Level>("M");
const renderAs = ref<RenderAs>("svg");
const gradientType = ref<GradientType>("linear");

const props = defineProps<{
  value: string;
  background: string | "#ffffff";
  foreground: string | "#000000";
  gradient: boolean | false;
  gradientStartColor: string | "#000000";
  gradientEndColor: string | "#38bdf8";
}>();
</script>
