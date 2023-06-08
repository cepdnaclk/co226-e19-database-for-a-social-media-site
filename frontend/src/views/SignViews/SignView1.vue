<template>
    <div class="sign">
        <form action="">
            <h3>CREATE A NEW ACCOUNT</h3>
            <input type="text" placeholder="Username" v-model="user.username">
            <p v-if="validate.username.$error">{{ validate.username.$errors[0].$message }}</p>
            <input type="text" placeholder="Email" v-model="user.email">
            <p v-if="validate.email.$error">{{ validate.email.$errors[0].$message }}</p>
            <input type="password" placeholder="Password" v-model="user.password">
            <p v-if="validate.password.$error">{{ validate.password.$errors[0].$message }}</p>
            <input type="password" placeholder="Retype Password" v-model="user.rpassword">
            <p v-if="validate.rpassword.$error">{{ validate.rpassword.$errors[0].$message }}</p>
            <button type="submit" @click="submit">Next</button>
        </form>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

const user = reactive({
    username: '',
    email: '',
    password: '',
    rpassword: '',
})
const rules = computed(() => {
    return {
        username: { required, minLength: helpers.withMessage(`Username must have at least 5 length`, minLength(5)) },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        rpassword: { required, sameAs: helpers.withMessage("Passwords must be same", sameAs(user.password)) }
    }
})

const validate = useVuelidate(rules, user)

const submit = async (e) => {
    e.preventDefault()
    await validate.value.$validate()
    store.state.addUser = {
        username: user.username,
        email: user.email,
        password: user.password,
    }
    router.push("/sign-up/more-about-you")
}
</script>

<style scoped>
.sign {}
</style>