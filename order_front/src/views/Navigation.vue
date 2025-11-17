<template>
  <nav class="navbar-area">
    <div class="nav-left">
      <span class="logo">影城</span>
    </div>

    <div class="nav-center">
      <a class="nav-link" @click="produceOrder">產生訂單</a>
      <a class="nav-link" href="#">優惠包廂</a>
      <a class="nav-link" href="#">電影資訊</a>
      <a class="nav-link" href="#">影城介紹</a>
    </div>  

    <div class="nav-right">
      <button class="login-btn">登入</button>
    </div>
  </nav>
</template>

<script setup>
import { eventBus } from '@/utils/eventBus'

// 點擊「產生訂單」時 → 通知 Home.vue
const produceOrder = () => {
  eventBus.emit('openCreateOrder')
}
</script>

<style scoped>
.navbar-area {
  width: 100%;
  background: #3a3a3a;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 12px 40px;
}

.nav-left .logo {
  font-size: 20px;
  font-weight: bold;
  color: white;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.nav-link:hover {
  color: #d1d1d1;
}

.login-btn {
  background: #b49470;
  color: white;
  border: none;
  padding: 6px 16px;
}
</style>
