<template>
  <div
    id="notification-container"
    class="fixed top-4 right-4 flex flex-col space-y-2 z-50"
  ></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // Ensure the container exists in the DOM
  if (!document.getElementById("notification-container")) {
    const container = document.createElement("div");
    container.id = "notification-container";
    container.className = "fixed top-4 right-4 flex flex-col space-y-2";
    document.body.appendChild(container);
  }
});
</script>
