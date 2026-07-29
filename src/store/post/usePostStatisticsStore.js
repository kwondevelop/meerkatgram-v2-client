import { defineStore } from "pinia";
import { ref } from "vue";
import myAxios from "../../api/myAxios";

export const usePostStatisticsStore = defineStore('postStatisticsStore', () => {
  // 1. State
  const postCount = ref(0);

  // 2. Getters

  // 3. Actions
  const getUserPostCount = async () => {
    try {
      const url = `/api/posts/statistics/user-post-count`;

      const response = await myAxios.get(url);
      postCount.value = response.data.data.postCount;
    } catch (error) {
      console.error(error);
      postCount.value = '-';
    }
  }

  return {
    // States
    postCount,

    // Getters

    // Actions
    getUserPostCount,
  }
});
