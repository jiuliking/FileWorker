<script setup lang="ts">
import { useI18n } from "vue-i18n";
import useI18nStore from "../store/i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const i18nStore = useI18nStore();

// 从 i18n 实例获取可用语言列表
const { availableLocales } = useI18n();

let onClipAreaClick = () => {
  router.push("/clip");
};

let onUploadClick = () => {
  router.push("/file");
};
</script>

<template>
  <div class="flex flex-col items-center pt-10">
    <div class="pannel file-pannel">
      <div class="text-xl font-medium mb-4 flex justify-between items-center">
        <span>{{ $t("index.file_channel_title") }}</span>
        <router-link to="/filemanage" class="link-hint">{{ $t('index.manage_link') }}</router-link>
      </div>
      <div class="upload-area" @click="onUploadClick">
        <div class="area-content">
          <span class="text-lg">{{ $t('index.upload_area_text') }}</span>
          <span class="text-sm text-gray-400">{{ $t('index.upload_area_hint') }}</span>
        </div>
      </div>
    </div>
    <div class="pannel clip-pannel">
      <div class="text-xl font-medium mb-4 flex justify-between items-center">
        <span>{{ $t("index.clip_channel_title") }}</span>
      </div>
      <div class="clip-area" @click="onClipAreaClick">
        <div class="area-content">
          <span class="text-lg">{{ $t('index.clip_area_text') }}</span>
          <span class="text-sm text-gray-400">{{ $t('index.clip_area_hint') }}</span>
        </div>
      </div>
    </div>
    <select
      :value="i18nStore.locale"
      @change="i18nStore.setLocale(($event.target as HTMLSelectElement).value)"
      class="locale-changer"
    >
      <option v-for="locale in availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
    </select>
  </div>
</template>

<style scoped>
.pannel {
  --uno: my-4 p-6 max-w-screen-md w-[90%] sm:w-4/5 bg-white rounded-lg shadow-lg;
}

.file-pannel {
  background-color: #bee5eb;
}

.clip-pannel {
  background-color: #F27E93;
}

.tips-pannel {
  --uno: bg-gray-100 text-gray-600;
}

.upload-area {
  --uno: h-36 mt-4 cursor-pointer flex items-center justify-center flex-col text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors;
}

.clip-area {
  --uno: h-36 mt-4 cursor-pointer flex items-center justify-center flex-col text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors;
}

.area-content {
  --uno: flex flex-col items-center;
}

.area-icon {
  --uno: w-12 h-12 mb-2 text-gray-400;
}

.link-hint {
  --uno: text-gray-500 hover:text-blue-600 text-sm;
}

.locale-changer {
  --uno: mt-8 border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500;
}
</style>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}
</style>