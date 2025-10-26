<template>
  <div 
    class="task-item"
    :class="{
      'task-completed': task.completed,
      'priority-high': task.priority === 'high',
      'priority-medium': task.priority === 'medium',
      'priority-low': task.priority === 'low'
    }"
  >
    <div class="task-content">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="$emit('toggle', task.id)"
        class="task-checkbox"
      />
      
      <div class="task-info">
        <p class="task-text" :class="{ 'completed-text': task.completed }">
          {{ task.text }}
        </p>
        <div class="task-meta">
          <span class="badge badge-category" :class="`category-${task.category}`">
            {{ task.category }}
          </span>
          <span class="badge badge-priority" :class="`priority-${task.priority}`">
            {{ task.priority }}
          </span>
        </div>
      </div>
    </div>

    <div class="task-actions">
      <button
        v-if="!task.completed"
        @click="$emit('complete', task.id)"
        class="btn btn-success btn-sm"
        title="Mark as completed"
      >
        ✓
      </button>
      <button
        @click="$emit('delete', task.id)"
        class="btn btn-danger btn-sm"
        title="Delete task"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// Define emits
defineEmits(['toggle', 'complete', 'delete'])
</script>

<style scoped>
.task-item {
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  margin-bottom: 12px;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-item.task-completed {
  opacity: 0.7;
  background: var(--completed-bg);
}

.task-item.priority-high {
  border-left: 4px solid #ef4444;
}

.task-item.priority-medium {
  border-left: 4px solid #f59e0b;
}

.task-item.priority-low {
  border-left: 4px solid #10b981;
}

.task-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.task-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-top: 2px;
}

.task-info {
  flex: 1;
}

.task-text {
  margin: 0 0 8px 0;
  color: var(--text-primary);
  font-size: 16px;
  line-height: 1.5;
}

.completed-text {
  text-decoration: line-through;
  color: var(--text-secondary);
}

.task-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.badge-category {
  background: var(--category-bg);
  color: var(--category-text);
}

.category-work {
  background: #dbeafe;
  color: #1e40af;
}

.category-personal {
  background: #fce7f3;
  color: #9f1239;
}

.category-shopping {
  background: #fef3c7;
  color: #92400e;
}

.category-health {
  background: #dcfce7;
  color: #166534;
}

.category-other {
  background: #e5e7eb;
  color: #374151;
}

.badge-priority {
  background: var(--priority-bg);
  color: white;
}

.priority-high {
  background: #ef4444;
}

.priority-medium {
  background: #f59e0b;
}

.priority-low {
  background: #10b981;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-sm {
  padding: 6px 10px;
  font-size: 14px;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover {
  background: #059669;
  transform: scale(1.1);
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .task-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .task-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
