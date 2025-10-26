import {defineStore} from "pinia";
import {ref} from "vue";

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false)
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }
  return {isDarkMode, toggleTheme}
}, {persist: true})
