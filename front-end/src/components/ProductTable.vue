<template>
    <v-container>
        <v-card outlined>
            <v-data-table
                :items="localItems"
                :headers="headers"
                :items-per-page="rowsPerPage"
                :page.sync="page"
                :server-items-length="localItems.length"
                item-key="_id"
                :loading="loading"
                class="elevation-2"
                dense
            >
                <template v-slot:item="myProp">
                <tr>
                    <td>{{ myProp.item.name }}</td>
                    <td>{{ myProp.item.type }}</td>
                    <td>{{ myProp.item.price }}</td>
                    <td>{{ myProp.item.rating }}</td>
                    <td>{{ myProp.item.warranty_years }}</td>
                    <td>
                        <!-- bouton modifier -->
                    <v-tooltip top>   
                        <template v-slot:activator="{ props }">
                            <v-btn 
                                v-bind="props"
                                v-if="myProp.item.available" 
                                icon @click="onEdit(myProp.item)"
                            >
                                    <v-icon>{{mdiPencil}}</v-icon>
                            </v-btn>
                        </template>
                        <span>modifer</span>
                    </v-tooltip>
                        
                        <!-- supprimer -->
                        <v-tooltip top>  
                            <template v-slot:activator="{ props }">
                                <v-btn v-if="myProp.item.available" icon @click="onDelete(myProp.item)" v-bind="props">
                                    <v-icon>{{mdiDelete}}</v-icon>
                                </v-btn>
                            </template>
                            <span>supprimer</span>
                        </v-tooltip>

                        <!--  déposer -->
                        <v-tooltip top>
                            <template v-slot:activator="{ props }">  
                                <v-btn v-if="!myProp.item.available" icon @click="onRecover(myProp.item)" v-bind="props">
                                    <v-icon>{{mdiRefresh}}</v-icon>
                                </v-btn>
                            </template>
                            <span>déposer</span>
                        </v-tooltip>

                        <!--  Retirer -->
                        <v-tooltip top>
                            <template v-slot:activator="{ props }">  
                                <v-btn v-if="myProp.item.available" icon @click="onWithdraw(myProp.item)" v-bind="props">
                                    <v-icon>{{mdiBasket}}</v-icon>
                                </v-btn>
                            </template>
                            <span> retirer</span>
                        </v-tooltip>
                    </td>
                </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts"> 
import {mdiPencil, mdiDelete, mdiRefresh, mdiBasket} from '@mdi/js'

    const props= defineProps<{
        products: Array<any>;
    }>();
    const emit = defineEmits<{
        (event: 'edit', product: any): void;
        (event: 'delete', product: any): void;
        (event: 'recover', product: any): void;
        (event: 'withdraw', product: any): void;
    }>();
    
    const page = ref(1);
    const rowsPerPage = ref(10);
    const loading = ref<boolean>(true)
    const localItems = ref<any[]>([])
    const headers = ref<any[]>([
        { title: 'Nom', align: 'start', key: 'name', sortable: false,},
        { title: 'Type', align: 'start', key: 'type', sortable: false, },
        { title: 'Prix', align: 'start', key: 'price', sortable: false, },
        { title: 'Note', align: 'start', key: 'rating', sortable: false, },
        { title: 'Garantie', align: 'start', key: 'warranty_years', sortable: false, },
        { title: 'Actions', align: 'center',key :'', sortable: false, },
    ]);
    const onEdit = (product: any) => emit('edit', product);
    const onDelete = (product: any) => emit('delete', product);
    const onRecover = (product: any) => emit('recover', product);
    const onWithdraw = (product: any) => emit('withdraw', product);
    watch(() => props.products , (newItems) => {
        if(newItems.length) {
            localItems.value = newItems
            loading.value = false
        }
    }, {immediate : true})
  </script>
 
  