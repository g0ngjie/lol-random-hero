<template>
  <div class="load-container">
    <canvas ref="logo"></canvas>
    <p v-if="!isErr">{{ loadingTxt }}</p>
    <em v-if="!isErr">首次加载资源可能会过慢，请耐心等待一下~</em>
    <div class="btn" v-if="isErr" @click="handleReload">
      资源加载异常，需要重新加载
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import Logo from "@/utils/logo.js";
import { useLoadImg, loadTotal, heroTotal } from "@/views/hooks/load";

export default defineComponent({
  setup(_, { emit }) {
    const logo = ref(null);

    const isErr = ref(false);
    const loadingTxt = ref("资源加载中");

    useLoadImg(({ ok, list, pics }) => {
      if (ok) {
        emit("onLoad", { list, pics });
      } else {
        isErr.value = true;
      }
    });

    const percentage = ref(0);

    watchEffect(() => {
      // 百分比
      percentage.value = Math.floor((loadTotal.value / heroTotal.value) * 100);
      loadingTxt.value = `资源加载中 ${percentage.value}%`;
    });

    const handleReload = () => {
      window.location.reload();
    };

    onMounted(() => {
      Logo(logo.value, "随机英雄选择器~~  ");
    });
    return {
      logo,
      loadingTxt,
      isErr,
      handleReload,
    };
  },
});
</script>
<style lang="scss" scoped>
.load-container {
  width: 100%;
  height: 100%;
  background-color: #e4c281;
}
* {
  user-select: none;
}

p {
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 20px;
  font-family: sans-serif;
  font-size: 18px;
  color: #fff;
}

em {
  position: absolute;
  z-index: 1;
  top: 50px;
  left: 20px;
  font-size: 14px;
  color: #fff;
}

.btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 70px;
  padding: 0 10px;
  height: 30px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: #dc3545;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  user-select: none;
  &:hover {
    transition: background 0.3s ease-out;
    background: #bd2130;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
</style>
