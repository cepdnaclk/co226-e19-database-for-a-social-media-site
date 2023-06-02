<template>
    <div class="login">
        <div class="container">
            <div class="left">
                <img src="@/assets/LogoPC.png" alt="">
                <h4>Revive! Re Imagine! Re Connect!</h4>
            </div>
            <div class="right">
                <h3>Login</h3>
                <div class="txt-input">
                    <div class="badge">
                        <img src="@/assets/user.png" alt="">
                    </div>
                    <input type="text" name="username" placeholder="Username">
                </div>
                <div class="txt-input">
                    <div class="badge">
                        <img src="@/assets/pass.png" alt="">
                    </div>
                    <input type="password" name="password" placeholder="Password">
                </div>
                <div class="flex">
                    <compCheckbox id="rem" v-model="checkValue">
                        Remember me</compCheckbox>
                    <router-link to="">Forgot password ?</router-link>
                </div>
                <button class="submit">LOGIN</button>
                <div class="or">
                    <p>OR</p>
                </div>
                <div class="footer">
                    <p>Don’t have an account? <router-link to="/signup">Create one</router-link> </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import compCheckbox from '@/components/compCheckbox.vue';
import { ref } from 'vue';

const checkValue = ref()
</script>

<style scoped>
.login {
    height: 100vh;
    display: flex;
    background-image: url(@/assets/_add558a1-c25c-47a9-8a6e-67ca5f1dce1d.jpg);
    background-size: cover;
    background-position: center;
}

.container {
    width: clamp(280px, 90%, 1280px);
    min-height: 80vh;
    margin: auto;
    border-radius: 2rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.105);
    padding: 2rem;
    display: flex;
    background: white;
}

.container .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
}

.container .left img {
    max-width: 300px;
}

.container .left h4 {
    font-size: 1.5rem;
    font-weight: 400;
    color: #64A56B;
    margin-top: 3rem;
}

.container .right {
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.container .right h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin-bottom: 3rem;
}

.container .right .txt-input {
    display: flex;
    border-radius: 5px;
    border: 1px solid #B6B6B6;
    width: 100%;
    max-width: 350px;
    margin-bottom: 1rem;
    overflow: hidden;
}

.container .right .txt-input .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 40px;
    background: #B6B6B6;
}

.container .right .txt-input .badge img {
    height: 17px;
}

.container .right .txt-input input {
    border: none;
    padding: 0.5rem 1rem;
    height: 40px;
    width: calc(100% - 40px);
    font-size: 1rem;
}

.container .right .txt-input input::placeholder {
    font-weight: 300;
}

.container .right .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 350px;
    font-size: 0.9rem;
}

.container .right .flex a {
    color: #2FA634;
}

.submit {
    width: 100%;
    max-width: 350px;
    padding: 10px;
    border-radius: 30px;
    margin-top: 2rem;
    border: none;
    font-size: 0.9rem;
    background: #2FA634;
    color: white;
    font-weight: 500;
}

.or {
    position: relative;
    width: 100%;
    max-width: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    z-index: 2;
}

.or::before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    height: 1px;
    width: 100%;
    background: #00000011;
    z-index: -1;
}

.or p {
    font-size: 0.7rem;
    padding: 0.5rem;
    background: white;
}

.footer {
    position: absolute;
    bottom: 0;
    font-size: 0.9rem;
}

.footer a {
    color: #2FA634;
}

@media screen and (max-width: 769px) {
    .container {
        flex-direction: column;
        height: 90vh;
    }

    .container>* {
        width: 100% !important;
    }

    .container h3 {
        display: none;
    }

    .container .left img {
        width: 200px;
        margin-bottom: 3rem;
    }

    .container .left h4 {
        display: none;
    }

    .container .right .txt-input input {
        font-size: 0.9rem;
        height: 35px;
    }

    .container .right .txt-input .badge {
        height: 35px !important;
    }

    .container .right .flex {
        font-size: 0.8rem;
    }

    .footer {
        position: relative;
        font-size: 0.8rem;
        margin-top: 1rem;
    }
}
</style>