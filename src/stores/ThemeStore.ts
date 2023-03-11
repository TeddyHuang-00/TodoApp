import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type ThemeType from '@/types/ThemeType'

export const useThemeStore = defineStore('themeStore', () => {
    const loadFromLocalStorage = () => {
        return (localStorage.getItem('to-do-list-theme') || 'auto') as ThemeType
    }
    const storeToLocalStorage = () => {
        localStorage.setItem('to-do-list-theme', theme.value)
    }
    const theme = ref(loadFromLocalStorage() as ThemeType)

    const allThemes = ['auto', 'light', 'dark'] as ThemeType[]

    const switchTheme = () => {
        const currentIndex = allThemes.indexOf(theme.value)
        theme.value = allThemes[(currentIndex + 1) % allThemes.length]
        storeToLocalStorage()
    }

    return {
        theme,
        switchTheme
    }
})