<template>
    <LoginForm :type="registerType" @change="changeRegisterType"/>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue';
    const registerType = ref<'logIn' | 'signUp'>('logIn')
    const changeRegisterType = (type : string) => {
        if(!type) registerType.value = ['signUp','logIn'].find(type=> type!==registerType.value ) as 'logIn' | 'signUp'
    }
</script>