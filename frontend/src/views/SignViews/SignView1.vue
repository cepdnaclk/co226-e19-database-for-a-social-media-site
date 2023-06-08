<template>
    <div class="sign">
        <img class="left" src="@/assets/social.jpg" alt="">
        <form action="">
            <h3>CREATE A NEW ACCOUNT</h3>
            <div class="form-input">
                <label for="">Username</label>
                <input type="text" placeholder="example123" v-model="user.username">
                <p v-if="validate.username.$error">{{ validate.username.$errors[0].$message }}</p>
            </div>
            <div class="form-input">
                <label for="">Email</label>
                <input type="text" placeholder="example123@exp.com" v-model="user.email">
                <p v-if="validate.email.$error">{{ validate.email.$errors[0].$message }}</p>
            </div>
            <div class="form-input">
                <label for="">Password</label>
                <input type="password" placeholder="with a special character" v-model="user.password">
                <p v-if="validate.password.$error">{{ validate.password.$errors[0].$message }}</p>
            </div>
            <div class="form-input">
                <label for="">Confirm Password</label>
                <input type="password" placeholder="same as previous one" v-model="user.rpassword">
                <p v-if="validate.rpassword.$error">{{ validate.rpassword.$errors[0].$message }}</p>
                <button type="submit" @click="submit">Create Account</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router';
import axios from "axios"

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
    const formData = {
        user_name: user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.rpassword,
    }

    await axios
        .post("http://localhost:3010/signup", formData)
        .then((res) => {
            console.log(res)
            router.push("/sign-up/more-about-you")
        })
        .catch((err) => {
            console.log(err)
        })

}
</script>

<style scoped>
.sign {
    display: flex;
    align-items: center;
}

.sign .left {
    width: 50%;
    height: 500px;
    object-fit: contain;
}

.sign form {
    width: 100%;
    max-width: 600px;
}
</style>
