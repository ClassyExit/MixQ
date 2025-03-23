<template>
  <div class="flex justify-center">
    <qrcode-vue
      :value="props.value"
      :level="level"
      :render-as="renderAs"
      :size="qrSize"
      :background="props.background"
      :foreground="props.foreground"
      :gradient="props.gradient"
      :gradient-type="gradientType"
      :gradient-start-color="props.gradientStartColor"
      :gradient-end-color="props.gradientEndColor"
      class="mx-auto"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import QrcodeVue from "qrcode.vue";
import type { Level, RenderAs, GradientType } from "qrcode.vue";

const level = ref<Level>("M");
const renderAs = ref<RenderAs>("svg");
const gradientType = ref<GradientType>("linear");

const props = defineProps<{
  value: string;
  background: string;
  foreground: string;
  gradient: boolean;
  gradientStartColor: string;
  gradientEndColor: string;
}>();

const qrSize = ref(200);

const getQrSize = () => {
  const width = window.innerWidth;

  if (width >= 7680) return 1600; // 8K TVs
  if (width >= 5120) return 1000; // 5K TVs
  if (width >= 3840) return 800; // 4K TVs
  if (width >= 2560) return 500; // 2K monitors
  if (width >= 1920) return 350; // Full HD TVs
  if (width >= 1280) return 200; // TVs & tablets
  return 250; // Phones & small tablets
};

const updateQrSize = () => {
  qrSize.value = getQrSize();
};

onMounted(() => {
  updateQrSize(); // Set initial size
  window.addEventListener("resize", updateQrSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateQrSize);
});
</script>
