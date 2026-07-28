<script setup>
import { onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import usePostShowStore from "../../store/post/usePostShowStore";
import { useAuthStore } from "../../store/auth/useAuthStore.js";
import { onBeforeUnmount } from "vue";
import { useMyErrorStore } from "../../store/error/useMyErrorStore.js";

const route = useRoute();
const router = useRouter();
const postShowStore = usePostShowStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

onBeforeMount(async () => {
  try {
    await postShowStore.getPost(route.params.id);
  } catch (error) {
    myErrorStore.setErrorInfo(error);
    router.replace("/error");
  }
});
onBeforeUnmount(postShowStore.clearPostShow);
</script>

<template>
  <hr/>
  <template v-if="postShowStore.post">
    <div class="container">
      <div class ="image" :style="{ backgroundImage: `url(${postShowStore.post.postImageUrl})` }"></div>
    </div>
    <div class="option-box">
      <div class="delete-box">
        <div 
          class="delete-icon"
          v-show="postShowStore.post.userId === authStore.userInfo?.id"
        ></div>
      </div>
      <div class="like-box">
        <span>1234</span>
        <div class="like-icon"></div>
      </div>
    </div>
    <p class="content">{{ postShowStore.post.postContent }}</p>
  </template>
</template>

<style scoped>
.container {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.image {
  width: 350px;
  height: 350px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.option-box {
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
}

.like-box {
  display: flex;
  gap: 15px;
}

.delete-icon {
  width: 40px;
  height: 50px;
  background-image: url('/icons/trash-can.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.like-icon {
  width: 50px;
  height: 50px;
  background-image: url('/icons/heart-fill.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.content {
  padding: 15px 50px;
  white-space: pre-wrap;
}
</style>