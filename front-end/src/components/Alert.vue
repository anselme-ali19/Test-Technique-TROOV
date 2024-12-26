<template>
    <v-alert
        v-model="visible" 
        :type="type"
        :variant="'flat'"
        dismissible
        width="500"
        @click:close="handleClose"
        closable
      >
        <strong> {{ message }} </strong>
    </v-alert>
  </template>
  
  <script setup lang="ts">
    const y = ref('top')
    const timer = ref(3000)
    const props = defineProps<{
        message: string;
        type: 'success' | 'error';
    }>();
    const emit = defineEmits<{
        (event : 'close'): void;
    }>()
    
    const visible = computed(() => !!props.message)
    function handleClose() {
        emit('close');
    }
  </script>
  