<script setup>
import { reactive } from "vue";
import MyButton from "../../components/button/MyButton.vue";
import MyInput from "../../components/input/MyInput.vue";
import MyStrikeThroughBehindWord from "../../components/decoration/MyStrikeThroughBehindWord.vue";
import { useAuthStore } from "../../store/auth/useAuthStore.js";
import { useRouter } from "vue-router";
import loginValidator from "../../util/validator/domain/auth/loginValidator.js";
import { ref } from "vue";
import useFileStore from "../../store/file/useFileStore.js";
import registrationValidator from "../../store/auth/registrationValidator.js";
import { useMyErrorStore } from "../../store/error/useMyErrorStore.js";

const authStore = useAuthStore();
const router = useRouter();
const fileStore = useFileStore();
const myErrorStore = useMyErrorStore();

const preview = ref(null);
const selectedFile = ref(null);
const registrationData = reactive({
  email: '',
  password: '',
  passwordCheck: '',
  nick: '',
  profile: '',
});

const handleSubmit = async () => {
  // 유효성 검사
  const validationList = [
    registrationValidator.email(registrationData.email),
    registrationValidator.password(registrationData.password),
    registrationValidator.passwordCheck(registrationData.password, registrationData.passwordCheck),
    registrationValidator.nick(registrationData.nick),
    registrationValidator.profile(registrationData.profile),
  ];

  const errorList = validationList.filter(val => val);

  if(errorList.length > 0) {
    alert(errorList.join('\n'));
    return;
  }

  try {
    await authStore.registration(registrationData);
    alert('회원가입 성공');
    router.replace('/login');
  } catch(error) {
    const data = error.response.data;
    if(data.code === 'E11') {
      alert(data.data);
    } else if(data.code === 'E21') {
      alert('잘못된 양식');
    } else {
      myErrorStore.setErrorInfo(error);
      router.replace('/error');
    }
  }
}

const handleChangeProfile = async (event) => {
  const file = event.target.files[0];

  if(file) {
    if(preview.value) {
      // 기존에 생성된 메모리 URL이 있다면 해제 (메모리 누수 방지)
      URL.revokeObjectURL(preview);
    }

    // API 서버에 파일 저장 요청
    const fileUri = await fileStore.uploadProfile(file);

    if(fileUri) {
      registrationData.profile = fileUri;
      selectedFile.value = file;
  
      // 파일 객체를 브라우저에서 접근 가능한 임시 URL로 변환
      preview.value = URL.createObjectURL(file);
    } else {
      alert('파일 업로드 실패\n다시 시도');
    }

  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit">
    <MyInput
      :type="'email'"
      :placeholder="'이메일'"
      :readonly="false"
      :required="true"
      v-model="registrationData.email"
    />

    <MyInput
      :type="'password'"
      :placeholder="'비밀번호'"
      :readonly="false"
      :required="true"
      v-model="registrationData.password"
    />

    <MyInput
      :type="'password'"
      :placeholder="'비밀번호 확인'"
      :readonly="false"
      :required="true"
      v-model="registrationData.passwordCheck"
    />

    <MyInput
      :type="'text'"
      :placeholder="'이름'"
      :readonly="false"
      :required="true"
      v-model="registrationData.nick"
    />
    
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
      :btn-type="'submit'"
      :color="'gray'"
      :size="'middle'"
      :content="'가입하기'"
    />
  </form>
</template>

<style scoped>
form {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.preview {
  width: 70px;
  height: 70px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
}
</style>