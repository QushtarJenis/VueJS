<template>
  <div :class="['app', { dark: isDarkMode }]">
    <header class="header">
      <div class="header-content">
        <h1 class="logo">
          <span class="logo-icon">▶️</span>
          MiniTube
        </h1>
        <div class="header-actions">
          <button @click="toggleTheme" class="theme-toggle" title="Toggle theme">
            {{ isDarkMode ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="search-section">
        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search videos by title or channel..."
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>
        <div class="stats-bar">
          <span class="result-count">
            {{ filteredCount }} {{ filteredCount === 1 ? 'video' : 'videos' }} found
          </span>
          <div class="actions">
            <span class="total-likes">Total Likes: {{ totalLikes }}</span>
            <button @click="sortByViews" class="sort-button">
              Sort by Views 📊
            </button>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading videos...</p>
      </div>

      <div v-else-if="filteredVideos.length === 0" class="empty-state">
        <div class="empty-icon">📹</div>
        <h2>No videos found.</h2>
        <p v-if="searchQuery">Try adjusting your search query.</p>
      </div>

      <div v-else class="video-grid">
        <VideoCard
          v-for="video in filteredVideos"
          :key="video.id"
          :id="video.id"
          :title="video.title"
          :channel="video.channel"
          :views="video.views"
          :thumbnail="video.thumbnail"
          :likes="video.likes"
          @liked="handleLike"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import VideoCard from './components/VideoCard.vue'
import {useVideos} from './composables/useVideos'
import {storeToRefs} from "pinia";
import {useThemeStore} from "@/stores/themeStore.ts";

const themeStore = useThemeStore();

const {
  searchQuery,
  totalLikes,
  isLoading,
  filteredVideos,
  filteredCount,
  handleLike,
  sortByViews
} = useVideos()

const {isDarkMode} = storeToRefs(themeStore)
const {toggleTheme} = themeStore
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-primary: #f9f9f9;
  --bg-secondary: #ffffff;
  --card-bg: #ffffff;
  --text-primary: #0f0f0f;
  --text-secondary: #606060;
  --border-color: #e5e5e5;
  --button-bg: #f2f2f2;
  --button-hover: #e5e5e5;
  --accent: #ff0000;
}

.app.dark {
  --bg-primary: #0f0f0f;
  --bg-secondary: #1f1f1f;
  --card-bg: #212121;
  --text-primary: #f1f1f1;
  --text-secondary: #aaaaaa;
  --border-color: #3f3f3f;
  --button-bg: #3f3f3f;
  --button-hover: #4f4f4f;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.app {
  min-height: 100vh;
  background: var(--bg-primary);
  transition: background 0.3s;
}

.header {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background 0.3s;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 28px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.theme-toggle {
  background: var(--button-bg);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.theme-toggle:hover {
  background: var(--button-hover);
  transform: rotate(15deg);
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.search-section {
  margin-bottom: 24px;
}

.search-bar {
  position: relative;
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 14px 48px 14px 16px;
  font-size: 16px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--card-bg);
  color: var(--text-primary);
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  pointer-events: none;
}

.stats-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.result-count {
  font-size: 15px;
  color: var(--text-secondary);
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.total-likes {
  font-size: 15px;
  font-weight: 600;
  color: var(--accent);
}

.sort-button {
  background: var(--button-bg);
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  color: var(--text-primary);
}

.sort-button:hover {
  background: var(--button-hover);
}

.loading-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-color);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.empty-state h2 {
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 16px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .video-grid {
    grid-template-columns: 1fr;
  }

  .stats-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .main-content {
    padding: 16px;
  }
}
</style>
