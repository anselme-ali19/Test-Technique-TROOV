<template>
    <div class="app">
      <Alert
        v-if="alert.message"
        :type="alert.type"
        :message="alert.message"
        @close="alert.message = ''"
      />
  
      <v-container>
        <CustumTitle />
        <v-row justify="end">
          <v-btn color="primary" @click="openAddModal">Ajouter Produit</v-btn>
        </v-row>
  
        <ProductTable
          :products="products"
          @edit="openEditModal"
          @delete="product => openConfirmModal(product, 'delete')"
          @recover="product => openConfirmModal(product, 'restore')"
          @withdraw="product => openConfirmModal(product, 'withdraw')"
        />
  
        <ProductFormModal
          v-model:open="isModalOpen"
          :initial-data="editingProduct"
          @submit="submitProductFormHandler"
          @close="isModalOpen = false; editingProduct= null"
        />
  
        <ConfirmModal
          v-model:open="isConfirmOpen"
          :title="confirmTitle"
          :message="confirmMessage"
          @confirm="handleConfirmAction"
          @close="isConfirmOpen = false"
        />
      </v-container>
    </div>
  </template>
  
  <script setup lang="ts">
  import ProductTable from './ProductTable.vue';
  import CustumTitle from './CustumTitle.vue';
  import Alert from './Alert.vue';
  import ProductFormModal from './ProductFormModal.vue';
  import ConfirmModal from './ConfirmModal.vue';
  import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    recoverProduct,
  } from '../services/apiProductService'
  
  const products = ref<any[]>([]);
  const isModalOpen = ref(false);
  const isConfirmOpen = ref(false);
  const editingProduct = ref(null);
  const selectedProduct = ref<any | null>(null);
  const actionType = ref<'delete' | 'restore' | 'withdraw' | null >(null);
  
  const alert = reactive<{type: 'success'| 'error', message: string}>({
    type: 'success',
    message: '',
  });
  
  const fetchProducts = async () => {
    try {
      const productsFetched : any[] = await getProducts();
      products.value = [... productsFetched]
    } catch(err) {
      alert.type = 'error';
      alert.message = 'Problème de serveur';
    }
  };
  
  const openAddModal = () => {
    editingProduct.value = null;
    isModalOpen.value = true;
  };
  
  const openEditModal = (product :any) => {
    editingProduct.value = product;
    isModalOpen.value = true;
  };
  
  const handleAddProduct = async (product :any) => {
    try {
      await createProduct(product);
      alert.type = 'success';
      alert.message = 'Produit ajouté';
      await fetchProducts();
    } catch(err) {
      alert.type = 'error';
      alert.message = 'Le produit existe déjà';
    } finally {
      isModalOpen.value = false;
    }
  };
  
  const handleEditProduct = async (product :any) => {
    try {
      await updateProduct(product._id, product);
      alert.type = 'success';
      alert.message = 'Produit modifié';
      await fetchProducts();
    } catch(err) {
      alert.type = 'error';
      alert.message = 'Le produit existe déjà';
    } finally {
      isModalOpen.value = false;
    }
  };
  
  const openConfirmModal = (product :any, type : 'delete' | 'restore'  |'withdraw') => {
    selectedProduct.value = product;
    actionType.value = type;
    isConfirmOpen.value = true;
  };
  
  const handleConfirmAction = async () => {
    try {
      if (actionType.value === 'delete') {
        await deleteProduct(selectedProduct.value._id);
        alert.type = 'success';
        alert.message = 'Produit supprimé';
      } else if (actionType.value === 'restore' || actionType.value === 'withdraw') {
        await recoverProduct(selectedProduct.value._id);
        alert.type = 'success';
        alert.message = actionType.value === 'restore' ? 'Produit rendu' : 'Produit récupéré';
      }
      await fetchProducts();
    } catch(err) {
      alert.type = 'error';
      alert.message =
        actionType.value === 'delete'
          ? 'Impossible de supprimer le produit'
          : 'Impossible de modifier le produit';
    } finally {
      isConfirmOpen.value = false;
      selectedProduct.value = null;
    }
  };
  
  const confirmTitle = computed(() => {
    if (actionType.value === 'delete') return 'Supprimer le produit';
    if (actionType.value === 'restore') return 'Rendre le produit';
    if (actionType.value === 'withdraw') return 'Récupérer le produit';
    return '';
  });
  
  const confirmMessage = computed(() => {
    if (selectedProduct.value) {
      if (actionType.value === 'delete')
        return `Êtes-vous sûr de vouloir supprimer le produit "${selectedProduct.value.name}" ?`;
      if (actionType.value === 'restore')
        return `Êtes-vous sûr de vouloir rendre le produit "${selectedProduct.value.name}" ?`;
      if (actionType.value === 'withdraw')
        return `Êtes-vous sûr de vouloir récupérer le produit "${selectedProduct.value.name}" ?`;
    }
    return '';
  });

  const submitProductFormHandler = computed(() => editingProduct.value ? handleEditProduct : handleAddProduct)
  
  onMounted( async () => {
    await fetchProducts();
  });
  </script>
  