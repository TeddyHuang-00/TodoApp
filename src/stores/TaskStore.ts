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
    const allTags = computed(() => {
        let tags: string[] = [];
        tasks.value.forEach(
            task => {
                if (task.tags) tags = [...tags, ...task.tags]
            })
        return [...new Set(tags)]
    })
    const sortedByTags = computed(() => {
        let sorted = {} as { [key: string]: TaskItemType[] }
        for (const tag of allTags.value) {
            sorted[tag] = tasks.value.filter(task => task.tags?.includes(tag))
            sorted[tag] = [
                ...sorted[tag].filter(t => t.pinned && !t.completed),
                ...sorted[tag].filter(t => t.pinned && t.completed),
                ...sorted[tag].filter(t => !t.pinned && !t.completed),
                ...sorted[tag].filter(t => !t.pinned && t.completed)
            ]
        }
        return sorted
    })

    const addTag = (uuid: string, tag: string) => {
        tasks.value = tasks.value.map(task => {
            if (task.uuid === uuid) {
                if (!task.tags)
                    task.tags = []
                if (!task.tags.includes(tag))
                    task.tags.push(tag)
            }
            return task
        })
        storeToLocalStorage()
    }
    const removeTag = (uuid: string, tag: string) => {
        tasks.value = tasks.value.map(task => {
            if (task.uuid === uuid)
                task.tags = (task.tags || []).filter(t => t !== tag)
            return task
        })
    }
    const deleteTask = (uuid: string) => {
        tasks.value = tasks.value.filter(task => task.uuid !== uuid)
        storeToLocalStorage()
    }
    const addTask = (task: TaskItemType) => {
        if (tasks.value.find(t => t.uuid === task.uuid))
            return
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
        allTags,
        sortedByTags,
        addTag,
        removeTag,
        deleteTask,
        addTask,
        getTask,
        updateTask,
        toggleCompleted,
        toggleFavorite,
        togglePinned,
    }
})