<template>
  <transition name="fade">
    <Load @onLoad="handleLoaded" v-if="!loaded" />
    <Grid :heros="heros" :albums="albums" v-else />
  </transition>
</template>

<script setup>
import Grid from "@/views/grid.vue";
import Load from "@/views/load.vue";
import { ref } from "vue";

const loaded = ref(false);
const heros = ref([]);
const albums = ref([]);

const handleLoaded = ({ list, pics }) => {
  heros.value = list;
  albums.value = pics;
  loaded.value = true;
};
</script>
<style lang="scss" scoped>
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
  transition: opacity 1s ease;
}
</style>
