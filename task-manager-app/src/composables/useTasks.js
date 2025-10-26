import { ref, computed } from 'vue'

export function useTasks() {
  const tasks = ref([
    { id: 1, text: 'Complete Vue assignment', category: 'work', priority: 'high', completed: false },
    { id: 2, text: 'Buy groceries', category: 'personal', priority: 'medium', completed: false },
    { id: 3, text: 'Read a book', category: 'personal', priority: 'low', completed: true }
  ])

  const filterCategory = ref('all')
  const filterStatus = ref('all') // 'all', 'completed', 'incomplete'

  const incompleteTasksCount = computed(() => {
    return tasks.value.filter(task => !task.completed).length
  })

  const totalTasksCount = computed(() => {
    return tasks.value.length
  })

  const completedTasksCount = computed(() => {
    return tasks.value.filter(task => task.completed).length
  })

  const filteredTasks = computed(() => {
    let filtered = tasks.value

    if (filterCategory.value !== 'all') {
      filtered = filtered.filter(task => task.category === filterCategory.value)
    }

    if (filterStatus.value === 'completed') {
      filtered = filtered.filter(task => task.completed)
    } else if (filterStatus.value === 'incomplete') {
      filtered = filtered.filter(task => !task.completed)
    }

    return filtered
  })

  const categories = computed(() => {
    const cats = new Set(tasks.value.map(task => task.category))
    return Array.from(cats)
  })

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      text: taskData.text,
      category: taskData.category,
      priority: taskData.priority,
      completed: false
    }
    tasks.value.push(newTask)
  }

  const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(task => task.id !== taskId)
  }

  const toggleTask = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId)
    if (task) {
      task.completed = !task.completed
    }
  }

  const markAsCompleted = (taskId) => {
    const task = tasks.value.find(task => task.id === taskId)
    if (task) {
      task.completed = true
    }
  }

  const setFilterCategory = (category) => {
    filterCategory.value = category
  }

  const setFilterStatus = (status) => {
    filterStatus.value = status
  }

  return {
    tasks,
    filteredTasks,
    incompleteTasksCount,
    totalTasksCount,
    completedTasksCount,
    categories,
    filterCategory,
    filterStatus,
    addTask,
    deleteTask,
    toggleTask,
    markAsCompleted,
    setFilterCategory,
    setFilterStatus
  }
}
