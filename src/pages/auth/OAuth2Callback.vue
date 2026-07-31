<script setup>
import { onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth/useAuthStore';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onBeforeMount(async () => {
  try {
    const {code, message} = route.query;

    if(!code) {
      await authStore.reissue();
      postStatisticsStore.getUserPostCount();
      return router.replace('/');
    } else if(code === 'E31') {
      alert('다른 방식으로 이미 가입된 회원입니다');
      return router.replace('/login');
    } else {
      
    }
  } catch (error) {

  }
});
</script>
