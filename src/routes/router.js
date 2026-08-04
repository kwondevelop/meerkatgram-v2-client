import { createRouter, createWebHistory } from "vue-router";
import PostIndex from "../pages/posts/PostIndex.vue";
import MyError from "../pages/errors/MyError.vue";
import Login from "../pages/auth/Login.vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";
import { usePostStatisticsStore } from "../store/post/usePostStatisticsStore.js";
import PostShow from "../pages/posts/PostShow.vue";
import Registration from "../pages/auth/Registration.vue";
import PostCreate from "../pages/posts/PostCreate.vue";
import OAuth2Callback from "../pages/auth/OAuth2Callback.vue";
import NotFound from "../pages/errors/NotFound.vue";

const setMeta = (isAuthenticated, isGuestOnly) => {
  return {
    isAuthenticated,
    isGuestOnly,
  }
}

const routes = [
  {
    path: '/',
    redirect: '/posts',
    meta: setMeta(false, false),
  },
  // 인증 관련
  {
    path: '/login',
    component: Login,
    meta: setMeta(false, true),
  },
  {
    path: '/registration',
    component: Registration,
    meta: setMeta(false, true),
  },
  // 게시글 관련
  {
    path: '/posts',
    component: PostIndex,
    meta: setMeta(false, false),
  },
  {
    path: '/posts/:id',
    component: PostShow,
    meta: setMeta(true, false),
  },
  {
    path: '/posts/create',
    component: PostCreate,
    meta: setMeta(true, false),
  },
  {
    path: '/oauth2/callback',
    component: OAuth2Callback,
    meta: setMeta(false, false),
  },
  // 에러 관련
  {
    path: '/error',
    component: MyError,
    meta: setMeta(false, false),
  },
  // 모든 경로가 일치하지 않을 때 (가장 아래에 위치해야 함)
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: setMeta(false, false),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 네비게이션 가드
router.beforeEach(async (to, from, next) => {
  // authStore
  const authStore = useAuthStore();
  const postStatisticsStore = usePostStatisticsStore();

  // accessToken(인증)이 없을때 && 리이슈 첫시도시 토큰 재발급 시도
  if(!authStore.isLoggedIn && !authStore.isReissued) {
    try {
      await authStore.reissue();

      if(authStore.isLoggedIn) {
        postStatisticsStore.getUserPostCount();
      }
    } catch (error) {
      // alert('로그인 기간이 만료되었습니다.\n다시 로그인 해 주십시오.');
      // return next('/login');
    }
  }

  // 인증이 필요한 페이지인데, 로그인이 안된 경우 로그인페이지로 이동
  if(to.meta.isAuthenticated && !authStore.isLoggedIn) {
    return next('/login');
  }

  // 게스트만 접근 가능한 페이지인데, 로그인 중인 경우 메인페이지로 이동
  if(to.meta.isGuestOnly && authStore.isLoggedIn) {
    return next('/');
  }

  // 나머지는 통과
  next();
});

export default router;
