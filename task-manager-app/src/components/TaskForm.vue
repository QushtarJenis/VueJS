<template>
  <div class="task-form">
    <h2>Add New Task</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="taskText">Task Description:</label>
        <input
          id="taskText"
          v-model="taskText"
          type="text"
          placeholder="Enter task description..."
          required
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" v-model="taskCategory">
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="shopping">Shopping</option>
            <option value="health">Health</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="priority">Priority:</label>
          <select id="priority" v-model="taskPriority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <button type="submit" class="btn btn-primary">
        <span class="btn-icon">➕</span>
        Add Task
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])

const taskText = ref('')
const taskCategory = ref('work')
const taskPriority = ref('medium')

const handleSubmit = () => {
  if (taskText.value.trim()) {
    emit('add-task', {
      text: taskText.value.trim(),
      category: taskCategory.value,
      priority: taskPriority.value
    })
    
    taskText.value = ''
    taskCategory.value = 'work'
    taskPriority.value = 'medium'
  }
}
</script>

<style scoped>
.task-form {
  background: var(--card-bg);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.task-form h2 {
  margin: 0 0 20px 0;
  color: var(--text-primary);
  font-size: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-primary);
  font-size: 14px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  background: var(--input-bg);
  color: var(--text-primary);
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 16px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
