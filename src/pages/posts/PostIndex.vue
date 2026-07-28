<script setup>
import { onBeforeMount, ref, onBeforeUnmount } from "vue";
import MyButton from "../../components/button/MyButton.vue";
import usePostIndexStore from "../../store/post/usePostIndexStore.js";
import { useRouter } from "vue-router";
import { useMyErrorStore } from "../../store/error/useMyErrorStore.js";

const router = useRouter();
const postIndexStore = usePostIndexStore();
const myErrorStore = useMyErrorStore();

const getPagination = async (page = 1) => {
  try {
  await postIndexStore.getPostPagination(page);
  } catch (error) {
  myErrorStore.setErrorInfo(error);
  router.replace("/error");
  }
}

// 버튼 클릭시 다음 페이지
const getNextPage = async () => {
  await getPagination(postIndexStore.getNextPageNumber);
}

const redirectShow = (id) => {
  router.push(`/posts/${id}`);
}

// 라이프 사이클
onBeforeMount(getPagination);
onBeforeUnmount(postIndexStore.clearPostIndex);
</script>

<template>
  <hr/>
  <div class="card-container">
    <div
      v-for="item in postIndexStore.items"
      :key="item.id"
      class="card"
      :style="{ backgroundImage: `url(${item.postImageUrl})` }"
      @click="redirectShow(item.id)"
    ></div>
  </div>
  <MyButton
    v-if="!postIndexStore.isLastPage"
    :color="'gray'"
    :size="'big'"
    :content="'더 많은 게시물 보기'"
    @click="getNextPage"
  />
</template>

<style scoped>
.card-container {
  padding: 10px;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

.card {
  width: 100px;
  height: 100px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
}
</style>