import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type TaskItemType from '@/types/TaskItemType'

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([] as TaskItemType[])
    const pinned = computed(() => tasks.value.filter(task => task.pinned))
    const unpinned = computed(() => tasks.value.filter(task => !task.pinned))
    const favorites = computed(() => tasks.value.filter(task => task.favorite))
    // const unfavorites = computed(() => tasks.value.filter(task => !task.favorite))
    // const completed = computed(() => tasks.value.filter(task => task.completed))
    // const uncompleted = computed(() => tasks.value.filter(task => !task.completed))

    const deleteTask = (uuid: string) => {
        tasks.value = tasks.value.filter(task => task.uuid !== uuid)
        storeToLocalStorage()
    }
    const addTask = (task: TaskItemType) => {
        tasks.value.push(task)
        storeToLocalStorage()
    }
    const toggleCompleted = (uuid: string) => {
        tasks.value = tasks.value.map(task => {
            if (task.uuid === uuid)
                task.completed = !task.completed
            return task
        })
        storeToLocalStorage()
    }
    const toggleFavorite = (uuid: string) => {
        tasks.value = tasks.value.map(task => {
            if (task.uuid === uuid)
                task.favorite = !task.favorite
            return task
        })
        storeToLocalStorage()
    }
    const togglePinned = (uuid: string) => {
        tasks.value = tasks.value.map(task => {
            if (task.uuid === uuid)
                task.pinned = !task.pinned
            return task
        })
        storeToLocalStorage()
    }
    const loadFromLocalStorage = () => {
        const tasksFromLocalStorage = localStorage.getItem('to-do-list')
        if (tasksFromLocalStorage)
            tasks.value = JSON.parse(tasksFromLocalStorage)
    }
    const storeToLocalStorage = () => {
        localStorage.setItem('to-do-list', JSON.stringify(tasks.value))
    }

    return {
        tasks,
        pinned,
        unpinned,
        favorites,
        // unfavorites,
        // completed,
        // uncompleted,
        deleteTask,
        addTask,
        toggleCompleted,
        toggleFavorite,
        togglePinned,
        loadFromLocalStorage,
    }
})