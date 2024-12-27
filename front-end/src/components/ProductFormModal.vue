<template>
    <v-dialog v-model="dialogOpen" persistent max-width="500px">
      <v-card>
        <v-card-title><strong> {{ isEditing ? 'Modifier un produit' : 'Ajouter un produit' }} </strong></v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="formValid">
            <v-text-field
              label="Nom"
              v-model="myForm.name"
              :rules="[rules.required]"
              outlined
              dense
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Type"
              v-model="myForm.type"
              :rules="[rules.required]"
              outlined
              dense
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Prix ($)"
              v-model="myForm.price"
              :rules="[rules.required, rules.numeric]"
              outlined
              dense
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Note"
              v-model="myForm.rating"
              :rules="[rules.required, rules.numeric]"
              outlined
              dense
              class="mb-3"
            ></v-text-field>
            <v-text-field
              label="Garantie (années)"
              v-model="myForm.warranty_years"
              :rules="[rules.required, rules.integer]"
              outlined
              dense
              class="mb-3"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="onClose" color="primary">Retour</v-btn>
          <v-btn :disabled="!formValid" @click="handleFormSubmit" color="primary">Enregistrer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
 
  <script setup lang="ts">
  import { formRules } from '../utils/formRules';
  const props = defineProps<{
    open: boolean;
    initialData: Object | null;
  }>()

  const emit = defineEmits<{
    (event : 'submit', product : any ) : Promise<void>;
    (event :'close') : void
}>();
  
  const dialogOpen = ref(props.open);
  const formValid = ref(false);
  const myForm = reactive({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
  });
  
  const rules = ref(formRules)
  
  const isEditing = ref(false);
  
  const handleFormSubmit = async () => {
    await emit('submit', { ...myForm });
    onClose();
  };
  
  const onClose = () => {
    emit('close');
  };
  
  watch(() => props.open, (newVal) => {
    dialogOpen.value = newVal;
    if (newVal) {
      Object.assign(myForm , props.initialData || { name: '',type: '',price: '',rating: '',warranty_years: '',});
      isEditing.value = !!props.initialData;
    }
  });
  </script>
  
  <style scoped>
  .mb-3 {
    margin-bottom: 16px;
  }
  </style>
  