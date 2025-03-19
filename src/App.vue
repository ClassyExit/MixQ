<template>
  <div>
    <Notifications />
    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script setup lang="ts">
import Notifications from "./components/Notifications.vue";
</script>
import Notifications from "./components/Notifications.vue";
<style scoped></style>
