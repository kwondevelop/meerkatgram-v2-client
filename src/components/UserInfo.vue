<script setup>
import useAuthStore from '../store/auth/useAuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

const redirectPostCreate = () => {
  router.push('/posts/create');
}
</script>

<template>
<div
  class="container"
  v-if="authStore.isLoggedIn && authStore.userInfo"
>
  <div class="profile-box">
    <div
      class="bg-image-circle profile"
      :style="{backgroundImage: `url(${authStore.userInfo.profile})`}"
    ></div>
  </div>

  <div class="info-box">
    <div class="nick">{{ authStore.userInfo.nick }}</div>
    <div class="write-count">게시물 수 {{ authStore.userInfo.countPosts }}</div>
    <div class="redirect-box">
      <div
        class="bg-image-square redirect-icon-posts-index"
        style="background-Image: url('/icons/gallery.png');"
      ></div>
      <div
        class="bg-image-square redirect-icon-posts-create"
        style="background-Image: url('/icons/plus-sign.png');"
        @click="redirectPostCreate"
      ></div>
      <div
        class="bg-image-square redirect-icon-users-info"
        style="background-Image: url('/icons/person.png');"
      ></div>
    </div>
  </div>

</div>
</template>

<style scoped>
.container {
  padding: 10px;
  display: grid;
  /* 1fr 2fr 대신 auto 1fr을 써서 프로필 영역 크기를 고정하고, gap으로 간격을 줍니다 */
  grid-template-columns: auto 1fr; 
  gap: 25px; /* ⬅️ 이 수치를 줄이거나 늘려서 원하는 간격으로 딱 맞출 수 있습니다 (예: 10px, 30px) */
  align-items: center; 
}

/* 프로필 이미지 크기 지정 및 정렬 설정 */
.profile {
  width: 100px;          
  height: 100px;         
  border-radius: 50%;    
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
}

/* 아이콘들을 감싸는 박스 크기 조절 */
.redirect-box {
  width: 140px;          
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 8px;       
}

/* 개별 아이콘 크기 지정 및 정렬 설정 */
.bg-image-square {
  width: 32px;           
  height: 32px;          
  background-size: contain; 
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>