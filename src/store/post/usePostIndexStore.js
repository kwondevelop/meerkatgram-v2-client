import { ref, computed } from "vue";
import myAxios from "../../api/myAxios.js";
import { defineStore } from "pinia";
import { useMyErrorStore } from "../error/useMyErrorStore.js";

const usePostIndexStore = defineStore('postIndex', () => {

  // 1. State (ref)

  const items = ref([]);
  const isLastPage = ref(false);
  const currentPage = ref(0);

  // 2. Getters (computed)

const getNextPageNumber = computed(() => currentPage.value + 1);

  // 3. Actions (function)

  const clearPostIndex = () => {
    items.value = [];
    isLastPage.value = false;
    currentPage.value = 0;
  }

  const getPostPagination = async (page = 1) => {
  
    if (!isLastPage.value) {
      try {
        const url = "/api/posts";
        const params = {
          page,
        };

      const res = await myAxios.get(url, { params });
      const data = res.data.data;
      isLastPage.value = data.lastPage;
      items.value.push(...data.posts);

      currentPage.value++;
      } catch(error) {
        console.error(error);
        throw error;
      } 
    }
  }
  
  return {
    // state
    items,
    isLastPage,
    currentPage,

    // getters
    getNextPageNumber,

    // actions
    clearPostIndex,
    getPostPagination,
  }
});

export default usePostIndexStore;