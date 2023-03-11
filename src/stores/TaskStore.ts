import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type TaskItemType from '@/types/TaskItemType'

export const useTaskStore = defineStore('taskStore', () => {
    const loadFromLocalStorage = () => {
        const tasksFromLocalStorage = localStorage.getItem('to-do-list')
        if (tasksFromLocalStorage)
            return JSON.parse(tasksFromLocalStorage) as TaskItemType[]
        return [] as TaskItemType[]
    }
    const storeToLocalStorage = () => {
        localStorage.setItem('to-do-list', JSON.stringify(tasks.value))
    }
    const tasks = ref(loadFromLocalStorage() as TaskItemType[])
    const favorites = computed(() => [
        ...tasks.value.filter(task => task.favorite && !task.completed),
        ...tasks.value.filter(task => task.favorite && task.completed)
    ])
    const sortedTasks = computed(() => [
        ...tasks.value.filter(task => task.pinned && !task.completed),
        ...tasks.value.filter(task => task.pinned && task.completed),
        ...tasks.value.filter(task => !task.pinned && !task.completed),
        ...tasks.value.filter(task => !task.pinned && task.completed),
    ])

    const deleteTask = (uuid: string) => {
        tasks.value = tasks.value.filter(task => task.uuid !== uuid)
        storeToLocalStorage()
    }
    const addTask = (task: TaskItemType) => {
        tasks.value.push(task)
        storeToLocalStorage()
    }
    const getTask = (uuid: string) => {
        let result = null as TaskItemType | null
        for (const task of tasks.value) {
            if (task.uuid === uuid) {
                result = task
                break
            }
        }
        return result
    }
    const updateTask = (uuid: string, desription: string) => {
        for (const task of tasks.value) {
            if (task.uuid === uuid) {
                task.description = desription
                break
            }
        }
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

    return {
        tasks,
        favorites,
        sortedTasks,
        deleteTask,
        addTask,
        getTask,
        updateTask,
        toggleCompleted,
        toggleFavorite,
        togglePinned,
    }
})