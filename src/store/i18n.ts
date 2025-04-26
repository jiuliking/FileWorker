import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/i18n'; // 导入 i18n 实例

const useI18nStore = defineStore(
    'i18n',
    () => {
        // 初始化 locale 时，优先从 localStorage 读取 (pinia-plugin-persistedstate 会处理)
        // 这里 ref 的初始值实际会被持久化状态覆盖，但保留 navigator 逻辑作为首次加载的备选
        const locale = ref(navigator.language.slice(0, 2) || 'en');

        function setLocale(newLocale: string) {
            locale.value = newLocale;
            // 同时更新 vue-i18n 实例的全局 locale
            if (i18n.global.locale.value !== newLocale) {
                 i18n.global.locale.value = newLocale as 'en' | 'zh';
            }
        }

        // 应用启动时，确保 i18n 实例与 store 状态同步
        // (pinia-plugin-persistedstate 会在 store 初始化后恢复状态)
        // 我们需要确保恢复状态后 i18n 实例也同步了
        // 更好的方式可能是在 main.ts 中 store 初始化后调用一次 setLocale
        // 但这里先尝试在 store 内部处理
        if (i18n.global.locale.value !== locale.value) {
             i18n.global.locale.value = locale.value as 'en' | 'zh';
        }

        return { locale, setLocale }
    },
    {
        persist: true,
    }
)

export default useI18nStore
