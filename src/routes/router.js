import { createRouter, createWebHistory } from 'vue-router';
import PostIndex from '../pages/posts/PostIndex.vue';
import MyError from '../pages/errors/MyError.vue';
import Login from '../pages/auth/Login.vue';
import Header from '../components/Header.vue';
import { useAuthStore } from '../store/auth/useAuthStore.js';
import PostShow from '../pages/posts/PostShow.vue';
import Registration from '../pages/auth/Registration.vue';
import PostCreate from '../pages/posts/PostCreate.vue';

const setMeta = (isAuthenticated, isGuestOnly) => {
  return {
    isAuthenticated: false,
    isGuestOnly: false,
  }
}

const routes = [
  {
    path: '/',
    redirect: '/posts',
    meta: setMeta(false, false),
  },
  // 로그인
  {
    path: '/login',
    component: Login,
    meta: setMeta(false, true),
  },
  // 가입
  {
    path: "/registration",
    component: Registration,
    meta: setMeta(false, true),
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(true, false),
  },
  // 게시글 상세
  {
    path: '/posts/:id',
    component: PostShow,
    meta: setMeta(true, false),
  },
  // 게시글 생성
  {
    path: '/posts/create',
    component: PostCreate,
    meta: setMeta(true, false),
  },
  // 에러
  {
    path: '/error',
    component: MyError,
    meta: setMeta(false, false),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
// to : 이동 할 라우터
// from : 현재 라우터
// next : 다음 라우터로 이동할 때 호출하는 함수
router.beforeEach(async (to, from, next) => {
  // authStore
  const authStore = useAuthStore();

  // accessToken(인증)이 만료된 경우, reissue(토큰 재발급) 시도
  if(!authStore.isLoggedIn) {
    try {
      await authStore.reissue();
    } catch(error) {
      // alert('로그인 기간이 만료되었습니다\n다시 로그인 해주세요');
      // return next('/login');
    }
  }

  // 인증이 필요한 페이지지만, 로그인이 안된 경우 로그인 페이지로 이동
  if(to.meta.isAuthenticated && !authStore.isLoggedIn) {
    return next('/login');
  }

  // 게스트만 접근 가능한 페이지지만, 로그인 중인 경우 메인 페이지로 이동
  if(to.meta.isGuestOnly && authStore.isLoggedIn) {
    return next('/');
  }

  // 나머지는 로그인 여부와 상관없이 접근 가능
  next();

});

export default router;