<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  message: String,
  show: Boolean,
  duration: {
    type: Number,
    default: 3000, // 默认显示 3 秒
  },
});

const emit = defineEmits(['update:show']);

const internalShow = ref(props.show);
let timeoutId: number | undefined;

watch(() => props.show, (newValue: boolean) => {
  internalShow.value = newValue;
  if (newValue) {
    clearTimeout(timeoutId); // 清除之前的计时器
    timeoutId = setTimeout(() => {
      internalShow.value = false;
      emit('update:show', false); // 通知父组件关闭
    }, props.duration);
  }
});

watch(internalShow, (newValue: boolean) => {
  if (!newValue) {
     clearTimeout(timeoutId);
     emit('update:show', false); // 保证外部也能触发关闭
  }
});

</script>

<template>
  <transition name="toast-fade">
    <div v-if="internalShow" class="toast-notification">
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.toast-notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  z-index: 1000;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style> 