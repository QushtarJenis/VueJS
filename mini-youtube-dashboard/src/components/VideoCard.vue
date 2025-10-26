<template>
  <div class="video-card">
    <div class="thumbnail-container">
      <img :src="thumbnail" :alt="title" class="thumbnail" />
    </div>
    <div class="video-info">
      <h3 class="video-title">{{ title }}</h3>
      <p class="channel-name">{{ channel }}</p>
      <div class="video-meta">
        <span class="views">{{ formattedViews }} views</span>
        <button
          @click="handleLikeClick"
          class="like-button"
          :class="{ liked: isLiked }"
        >
          ❤️ {{ likes }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['liked'])

// Local state
const isLiked = ref(false)

// Format views with commas
const formattedViews = computed(() => {
  return props.views.toLocaleString()
})

// Handle like button click
const handleLikeClick = () => {
  if (!isLiked.value) {
    isLiked.value = true
    emit('liked', props.id)
  }
}
</script>

<style scoped>
.video-card {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.thumbnail-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-info {
  padding: 12px;
}

.video-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.channel-name {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 8px 0;
}

.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.views {
  font-size: 13px;
  color: var(--text-secondary);
}

.like-button {
  background: var(--button-bg);
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  color: var(--text-primary);
}

.like-button:hover {
  background: var(--button-hover);
  transform: scale(1.05);
}

.like-button.liked {
  background: #ff4444;
  color: white;
}

.like-button:active {
  transform: scale(0.95);
}
</style>
