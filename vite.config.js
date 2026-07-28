import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  // 개발 서버 Proxy 정의
  server: {
    proxy: {
      '/api': {
        // Request 대상 서버 도메인
        target: 'http://localhost:8080',
        // Request Header Host 필드 값을 대상 서버 호스트로 변경
        changeOrigin: true,
        // SSL 인증서 검증 무시
        secure: false,
      }
    }
  }
})
