<template>
    <v-container
      class="text-center mt-2 mb-4"
    >
    <h1 class="title-style">{{ title }}</h1>
    </v-container>
  </template>
  <script setup lang="ts">
    const props = defineProps<{title : string}>()
  </script>
  <style scoped>
  .title-style {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
  </style>
  