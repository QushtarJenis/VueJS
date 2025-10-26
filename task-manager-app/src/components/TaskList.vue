<template>
  <div class="task-list">
    <div class="list-header">
      <h2>Tasks</h2>
      <div class="task-stats">
        <span class="stat">
          <strong>{{ totalTasks }}</strong> Total
        </span>
        <span class="stat stat-pending">
          <strong>{{ incompleteTasks }}</strong> Pending
        </span>
        <span class="stat stat-completed">
          <strong>{{ completedTasks }}</strong> Completed
        </span>
      </div>
    </div>

    <div class="filters">
      <div class="filter-group">
        <label>Category:</label>
        <select v-model="selectedCategory" class="filter-select">
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Status:</label>
        <select v-model="selectedStatus" class="filter-select">
          <option value="all">All Tasks</option>
          <option value="incomplete">Incomplete Only</option>
          <option value="completed">Completed Only</option>
        </select>
      </div>
    </div>

    <div v-if="tasks.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3>No tasks found</h3>
      <p v-if="selectedCategory === 'all' && selectedStatus === 'all'">
        Add your first task to get started!
      </p>
      <p v-else>
        Try adjusting your filters to see more tasks.
      </p>
    </div>

    <div v-else class="tasks-container">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="$emit('toggle-task', $event)"
        @complete="$emit('complete-task', $event)"
        @delete="$emit('delete-task', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TaskItem from './TaskItem.vue'

const props = defineProps({
  tasks: {
    type: Array,
    required: true
  },
  incompleteTasks: {
    type: Number,
    required: true
  },
  totalTasks: {
    type: Number,
    required: true
  },
  completedTasks: {
    type: Number,
    required: true
  },
  filterCategory: {
    type: String,
    default: 'all'
  },
  filterStatus: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits([
  'toggle-task',
  'complete-task',
  'delete-task',
  'update:filterCategory',
  'update:filterStatus'
])

const selectedCategory = computed({
  get: () => props.filterCategory,
  set: (value) => emit('update:filterCategory', value)
})

const selectedStatus = computed({
  get: () => props.filterStatus,
  set: (value) => emit('update:filterStatus', value)
})
</script>

<style scoped>
.task-list {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.list-header {
  margin-bottom: 20px;
}

.list-header h2 {
  margin: 0 0 12px 0;
  color: var(--text-primary);
  font-size: 20px;
}

.task-stats {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.stat {
  padding: 8px 16px;
  background: var(--stats-bg);
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-secondary);
}

.stat strong {
  color: var(--text-primary);
  font-size: 18px;
  margin-right: 4px;
}

.stat-pending strong {
  color: #f59e0b;
}

.stat-completed strong {
  color: #10b981;
}

.filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.filter-select {
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: border-color 0.2s;
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h3 {
  color: var(--text-primary);
  margin: 0 0 8px 0;
  font-size: 20px;
}

.empty-state p {
  margin: 0;
  font-size: 14px;
}

.tasks-container {
  max-height: 600px;
  overflow-y: auto;
  padding-right: 4px;
}

.tasks-container::-webkit-scrollbar {
  width: 6px;
}

.tasks-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 3px;
}

.tasks-container::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.tasks-container::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }

  .task-stats {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
