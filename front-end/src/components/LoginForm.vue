<template>
    <div class="app">
            <Alert
                v-if="alert.message"
                :type="alert.type"
                :message="alert.message"
                @close="alert.message = ''"
            />
            <CustumTitle :title="title"/>
            <v-container>
                <v-img
                    class="mx-auto my-6"
                    max-width="100"
                    src="../assets/logo_appli.png"
                ></v-img>
            
                <v-card
                    class="mx-auto pa-12 pb-8"
                    elevation="10"
                    max-width="500"
                    rounded="lg"
                >
                    <v-form v-model="formValid">
                            <div class="text-subtitle-1 text-medium-emphasis">Account</div>
                    
                            <v-text-field
                                v-model="form.email"
                                density="compact"
                                placeholder="Email address"
                                :prepend-inner-icon="mdiEmailOutline"
                                variant="outlined"
                                :rules="[rules.required, rules.email]"
                            ></v-text-field>
                    
                            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                                Password
                                <NuxtLink v-if="type==='logIn' && !forgottenPassword" @click="forgottenPassword=true" class="text-blue text-decoration-none" to="/">Forgot login password?</NuxtLink>
                            </div>
                    
                            <v-text-field
                                v-model="form.password"
                                :append-inner-icon="visible ? mdiEyeOff : mdiEye"
                                :type="visible ? 'text' : 'password'"
                                density="compact"
                                placeholder="Enter your password"
                                :prepend-inner-icon="mdiLockOutline"
                                variant="outlined"
                                @click:append-inner="visible = !visible"
                                :rules = "[rules.required, rules.passwordLength, rules.password]"
                            ></v-text-field>
                    </v-form>
                    <v-btn
                    class="mb-8"
                    color="blue"
                    size="large"
                    variant="tonal"
                    block
                    :disabled="!formValid"
                    @click="loginOrSingInOrResetPassword"
                    >
                        {{ action  }}
                    </v-btn>
            
                    <v-card-text class="text-center">
                        <NuxtLink v-if="showRedirect" @click="redirect(); forgottenPassword=false" class="text-blue text-decoration-none" to="/">{{changeRegisterType}} now <v-icon :icon="mdiChevronRight"></v-icon></NuxtLink>
                    </v-card-text>
                </v-card>
            </v-container>
    </div>
  </template>
<script setup lang="ts">
import { mdiLockOutline, mdiEmailOutline , mdiEye, mdiEyeOff, mdiChevronRight} from '@mdi/js'
import { formRules } from '../utils/formRules';
import Alert from './Alert.vue';
import {loginAction, signUpAction, resetPasswordAction} from '../services/apiUserService'
import CustumTitle from './CustumTitle.vue';

    const router = useRouter()
    const rules = ref(formRules)
    const formValid = ref(false)
    const visible = ref<boolean>(false)
    const forgottenPassword = ref<boolean>(false)
    const form = ref({
        email: '',
        password:''
    })
    const alert = reactive<{type: 'success'| 'error', message: string}>({
        type: 'success',
        message: '',
    });
    const props = defineProps<{
        type : 'logIn' | 'signUp'
    }>()
    const emit  = defineEmits<{
        (event : 'change', type :string) :void
    }>()
    const title = computed(() => {
        if (forgottenPassword.value) return 'Password Reset'
        else if(props.type === 'logIn') return 'Connexion'
        else return 'Inscription'

    })
    const action = computed(() => {
        if(forgottenPassword.value) return 'Reset Password'
        else if(props.type ==='logIn') return  'Log In' 
        else return 'Sign Up'
    })
    const showRedirect = ref<boolean>(true)

    const login = async () => {
        try {
            await loginAction(form.value)
            alert.type='success'
            alert.message="Connexion réussie"
            // rediriger vers la page des produits
            router.push({path : '/product'})
        } catch(err :any) {
            alert.type='error'
            const error = err.response.data.error.split('--')
            if(error.length === 1) alert.message="Le mot de passe saisi est incorrect !. Veuillez réessayer."
            else {
                alert.message = `Aucun compte n'est associé au mail : ${error[1]}. Veuillez vérifier l'adresse mail ou vous inscrire`
            }
        }
    }
    const signUp = async () => {
        try {
            await signUpAction(form.value)
            alert.type='success'
            alert.message="Incription réussie, Veuillez vous connecter"
        } catch(err :any) {
            alert.type='error'
            alert.message=`L'email ${err.response.data.error.split('--')[1]} existe déjà ! Veuillez en choisir un autre.`
        } 
    }
    const resetPassword = async () => {
        try {
            await resetPasswordAction(form.value.email, form.value.password)
            alert.type='success'
            alert.message="Mot de passe modifié avec succès. Utilisez le nouveau pour vous connecter."
        } catch (err :any) {
            alert.type='error'
            const error = err.response.data.error.split('--')
            if(error.length === 1) alert.message= error[0]
            else alert.message = `Aucun compte n'est associé à l'adresse e-mail : ${error[1]}. Veuillez vérifier et saisir une adresse e-mail valide.`
        }
    }
    const loginOrSingInOrResetPassword = computed(() => {
        if(forgottenPassword.value) return resetPassword
        else if(props.type ==='logIn') return  login 
        else return  signUp
    })
     const changeRegisterType = computed(() => {
        if(forgottenPassword.value) return 'Log in'
        else if(props.type !=='logIn') return 'Log in' 
        else return 'Sign up'
    })
    const redirect = () => {
        if(forgottenPassword.value) emit('change','logIn')
        else emit('change','')
    }
</script>