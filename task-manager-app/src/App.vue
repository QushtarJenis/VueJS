<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1 class="app-title">
          <span class="app-icon">✓</span>
          Task Manager
        </h1>
      </div>
    </header>

    <main class="main-content">
      <div class="container">
        <TaskForm @add-task="handleAddTask" />

        <TaskList
          :tasks="filteredTasks"
          :incomplete-tasks="incompleteTasksCount"
          :total-tasks="totalTasksCount"
          :completed-tasks="completedTasksCount"
          v-model:filter-category="filterCategory"
          v-model:filter-status="filterStatus"
          @toggle-task="handleToggleTask"
          @complete-task="handleCompleteTask"
          @delete-task="handleDeleteTask"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { useTasks } from './composables/useTasks'

const {
  filteredTasks,
  incompleteTasksCount,
  totalTasksCount,
  completedTasksCount,
  filterCategory,
  filterStatus,
  addTask,
  deleteTask,
  toggleTask,
  markAsCompleted
} = useTasks()

const handleAddTask = (taskData) => {
  addTask(taskData)
}

const handleToggleTask = (taskId) => {
  toggleTask(taskId)
}

const handleCompleteTask = (taskId) => {
  markAsCompleted(taskId)
}

const handleDeleteTask = (taskId) => {
  deleteTask(taskId)
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Colors */
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --bg-primary: #f8fafc;
  --bg-secondary: #ffffff;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --input-bg: #ffffff;
  --stats-bg: #f1f5f9;
  --completed-bg: #f0fdf4;
  --category-bg: #e0e7ff;
  --category-text: #3730a3;
  --priority-bg: #fee2e2;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-icon {
  background: rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.main-content {
  flex: 1;
  padding: 32px 0;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 24px;
  }

  .app-icon {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .main-content {
    padding: 20px 0;
  }
}
</style>
