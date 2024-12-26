<template>
    <v-dialog v-model="dialogOpen" persistent   max-width="500px">
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{ message }}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="onClose" color="primary">Annuler</v-btn>
          <v-btn @click="onConfirm" color="primary" auto-focus>Confirmer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
  <script setup lang="ts">
  
    const props = defineProps<{
        open: boolean;
        title: string;
        message: string;
    }>()
     
    const emit = defineEmits(['close', 'confirm']);
    
    const dialogOpen = ref(props.open);
    
    const onClose = () => {
        emit('close');  
    };
    
    const onConfirm = () => {
        emit('close'); 
        emit('confirm');  
    };
    

    watch(() => props.open, (newVal) => {
        dialogOpen.value = newVal;
    });
  </script>
  