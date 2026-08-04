<script setup>
import { onBeforeMount } from 'vue';
import { useMyErrorStore } from '../../store/error/useMyErrorStore';
import { useRouter } from 'vue-router';

const myErrorStore = useMyErrorStore();
const router = useRouter();

onBeforeMount(() => {
  myErrorStore.setErrorInfo(myErrorStore.createErrorRedirection("not_found", "찾을 수 없는 페이지입니다."));
  return router.replace('/error');
});
</script>

<template></template>
