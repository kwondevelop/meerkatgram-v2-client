<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth/useAuthStore.js';
import MyButton from './button/MyButton.vue';

const router = useRouter();
const authStore = useAuthStore();

const redirectMain = () => {
  router.push('/');
}

const redirectLogin = () => {
  router.push('/login');
}

const redirectRegistration = () => {
  router.push('/registration');
}

const logout = async () => {
  await authStore.logout();
  router.replace("/");
};

</script>

<template>
  <div class="header">
    <div class="title-box">
      <h1 class="title" @click="redirectMain()">미어캣그램</h1>
    </div>
    <div class="btn-box">
      <MyButton
      v-if="!authStore.isLoggedIn" 
      @click="redirectLogin"
      :content="'로그인'" 
      :color="'gray'"
      :size="'small'"
      />
      <MyButton 
      v-if="!authStore.isLoggedIn"
      :content="'가입'" 
      :color="'whitegray'"
      :size="'small'"
      @click="redirectRegistration()"
      />
      <MyButton
      v-if="authStore.isLoggedIn"
      :content="'로그아웃'" 
      :color="'black'"
      :size="'small'"
      @click="logout"
      />
    </div>
  </div>
  <hr/>
</template>

<style scoped>
.header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.title-box {
  display: flex;
  align-items: center;
}

.title {
  font-size: 20px;
  cursor: pointer;
}

.btn-box {
  display: flex;
  gap: 10px;
}
</style>