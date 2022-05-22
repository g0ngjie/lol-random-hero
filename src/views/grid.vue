<template>
  <div>
    <canvas ref="background" class="background"></canvas>
    <Button @click="runStart" :disabled="isRun || isShowImg" text="开始" />
    <Button
      @click="() => (isShowImg = true)"
      style="top: 42%"
      :disabled="isRun || isShowImg"
      text="查看"
    />
    <transition name="fade">
      <SlideShow
        :img1="showImg.img1"
        :img2="showImg.img2"
        v-if="isShowImg"
        @close="() => (isShowImg = false)"
      />
    </transition>
    <div class="close-audio">
      <label for="closeAudio">关闭音效</label>
      <input id="closeAudio" type="checkbox" v-model="closeAudio" />
    </div>
    <div class="wrap">
      <!-- 网格 -->
      <Grid
        :heros="heros"
        :actives="[currentActive1, currentActive2]"
        :done="done"
      />
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { runALl } from "@/utils/random.js";
import { useActiveIndex, useHeros, useShowImgs } from "./hooks/grid";
import Button from "@/views/components/button.jsx";
import { sleep } from "@alrale/common-lib";
import Background from "@/utils/background.js";
import { useLocalStorage } from "@vueuse/core";
import Grid from "@/views/components/grid.jsx";
import SlideShow from "@/views/components/slideShow.jsx";

const props = defineProps({
  heros: { type: Array, default: () => [] },
  albums: { type: Array, default: () => [] },
});

// logo
const logo = ref(null);
// background
const background = ref(null);

const store = useLocalStorage("closeAudio", false);
// 关闭音效
const closeAudio = ref(store.value);

watch(closeAudio, (val) => {
  useLocalStorage("closeAudio", val);
  store.value = val;
});

const animation = ref(false);

onMounted(() => {
  Background(background.value, animation);
});

const { heros, size } = useHeros(props.heros);
const listSize = size - 1;

// 当前选中状态
const [index1, index2] = useActiveIndex(listSize);
const currentActive1 = ref(index1);
const currentActive2 = ref(index2);
const done = ref(false);
// 运行状态
const isRun = ref(false);

// 展示图片
const isShowImg = ref(false);
// 默认展示图片
const [default1, default2] = useShowImgs(props.albums, index1, index2);
const showImg = ref({
  img1: default1,
  img2: default2,
});

const runStart = () => {
  if (isRun.value) {
    return;
  }
  done.value = false;
  isRun.value = true;
  animation.value = true;
  runALl(
    () => {
      let index = currentActive1.value;
      if (index === listSize) index = 0;
      else index += 1;
      currentActive1.value = index;
    },
    () => {
      let index = currentActive2.value;
      if (index === listSize) index = 0;
      else index += 1;
      currentActive2.value = index;
    }
  ).then(() => {
    const inde1 = currentActive1.value;
    const inde2 = currentActive2.value;
    if (inde1 === inde2) currentActive2.value = inde2 + 1;
    done.value = true;
    // 展示
    const [img1, img2] = useShowImgs(props.albums, inde1, inde2);
    showImg.value = { img1, img2 };
    sleep(800, () => {
      isRun.value = false;
      isShowImg.value = true;
      animation.value = false;
    });
  });
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.close-audio {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100px;
  display: flex;
  align-items: center;
  label {
    font-size: 13px;
    color: #fff;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.wrap {
  height: 100%;
  // background-color: #e4c281;
  // 缩放
  transform: scale(0.9);
}
</style>
