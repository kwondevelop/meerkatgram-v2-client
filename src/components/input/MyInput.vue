<script setup>
const props = defineProps({
  'type': String,
  'placeholder': String,
  'readonly': Boolean,
  'required': Boolean,
});

// 보모의 v-model과 연결되는 반응형 변수(v3.4+)
const model = defineModel();
</script>

<template>
  <input 
  :type="props.type"
  :readonly="props.readonly"
  :required="props.required"
  :placeholder="props.placeholder"
  v-model="model"
  >
</template>

<style scoped>
  input {
    width: 300px;
    height: 75px;
    font-size: 24px;
    outline: none;
    border: 2px solid var(--personal-color-black);
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  } 
</style>