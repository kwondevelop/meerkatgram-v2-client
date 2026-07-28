<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useFileStore from '../../store/file/useFileStore.js';
import { useMyErrorStore } from '../../store/error/useMyErrorStore.js';
import { useAuthStore } from '../../store/auth/useAuthStore.js';
import MyButton from '../../components/button/MyButton.vue';
import myAxios from '../../api/myAxios.js';

const router = useRouter();
const fileStore = useFileStore();
const authStore = useAuthStore();
const myErrorStore = useMyErrorStore();

const preview = ref(null);
const postContent = ref('');
const postImageUrl = ref('');

const handleChangeProfile = async (event) => {
  const file = event.target.files[0];

  if(file) {
    if(preview.value) {
      URL.revokeObjectURL(preview.value); 
    }

    try {
      const fileUri = await fileStore.uploadProfile(file); 

      if(fileUri) {
        postImageUrl.value = fileUri; 
        
        preview.value = URL.createObjectURL(file);
      } else {
        alert('파일 업로드 실패\n다시 시도해주세요.');
      }
    } catch(error) {
      console.error(error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    }
  }
}

const handleSubmit = async () => {

  if (!postContent.value.trim()) {
    alert('내용을 입력해주세요.');
    return;
  }
  if (!postImageUrl.value) {
    alert('이미지를 선택해주세요.');
    return;
  }

  try {
    await myAxios.post('/api/posts', {
      postContent: postContent.value,
      postImageUrl: postImageUrl.value
    });
    
    alert('작성 완료');

    if (authStore.userInfo) {
      authStore.userInfo.countPosts += 1;
    }

    router.replace('/'); 
  } catch(error) {
    console.error("작성 실패", error);
    myErrorStore.setErrorInfo(error);
    router.replace('/error');
  }
}
</script>

<template>
  <hr/>
  <div class="upload-box">
    <textarea 
      class="textarea" 
      v-model="postContent" 
      placeholder="문구를 입력하세요..."
    ></textarea>

    <div
      class="preview"
      v-if="preview"
      :style="{ backgroundImage: `url(${preview})` }"
    ></div>

    <input
      id="file"
      type="file"
      accept="image/*"
      @change="handleChangeProfile"
    />

    <MyButton
      class="button"
      :content="'작성'" 
      :color="'gray'"
      :size="'middle'"
      @click="handleSubmit"
    />
  </div>
</template>

<style scoped>
.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 30px;
}

.textarea {
  width: 300px;
  height: 120px;
  padding: 15px;
  margin-top: 20px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  resize: none;
}

.preview {
  width: 300px;
  height: 250px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
}
</style>