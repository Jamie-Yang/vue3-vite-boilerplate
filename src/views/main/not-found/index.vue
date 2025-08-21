<script setup lang="ts">
// 无需额外逻辑
</script>

<template>
  <div class="not-found">
    <div class="content">
      <h1 class="title">404</h1>
      <p class="message">抱歉，您要找的页面不存在</p>
      <router-link to="/" class="btn">返回首页</router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.content {
  padding: 32px;
  text-align: center;
}

.title {
  font-size: 128px;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, #42b883 0%, #347474 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.message {
  margin: 16px 0 32px;
  font-size: 24px;
  color: #4a5568;
}

.btn {
  padding: 13px 32px;
  font-size: 16px;
  color: #fff;
  background-color: #41b883;
  border-radius: 8px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.btn:hover {
  box-shadow: 0 4px 12px rgb(66 184 131 / 20%);
  transform: translateY(-2px);
}

@media (width <= 640px) {
  .title {
    font-size: 96px;
  }

  .message {
    font-size: 20px;
  }
}
</style>
