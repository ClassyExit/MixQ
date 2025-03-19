<template>
  <div
    id="notification"
    class="fixed top-4 right-4 hidden alert alert-info p-4 rounded-lg shadow-lg flex items-center space-x-2 transition-opacity duration-300"
  >
    <span id="notification-message">This is a notification!</span>
    <button
      @click="hideNotification"
      class="ml-2 text-gray-400 hover:text-white"
    >
      &times;
    </button>
  </div>
</template>

<script setup lang="ts">
import { hideNotification } from "../utils/notifications";
</script>
