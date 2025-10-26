import { ref, computed, onMounted } from 'vue'

export function useVideos() {
  // State
  const videos = ref([])
  const searchQuery = ref('')
  const totalLikes = ref(0)
  const isLoading = ref(true)

  // Mock video data
  const mockVideos = [
    {
      id: 1,
      title: 'Building Modern Web Apps with Vue 3',
      channel: 'TechPro Academy',
      views: 125000,
      thumbnail: 'https://picsum.photos/seed/vue1/320/180',
      likes: 0
    },
    {
      id: 2,
      title: 'Complete JavaScript Course for Beginners',
      channel: 'Code Master',
      views: 890000,
      thumbnail: 'https://picsum.photos/seed/js1/320/180',
      likes: 0
    },
    {
      id: 3,
      title: 'CSS Grid & Flexbox Tutorial',
      channel: 'Design Hub',
      views: 340000,
      thumbnail: 'https://picsum.photos/seed/css1/320/180',
      likes: 0
    },
    {
      id: 4,
      title: 'React vs Vue: Which to Choose?',
      channel: 'TechPro Academy',
      views: 560000,
      thumbnail: 'https://picsum.photos/seed/comp1/320/180',
      likes: 0
    },
    {
      id: 5,
      title: 'Node.js Backend Development',
      channel: 'Backend Basics',
      views: 420000,
      thumbnail: 'https://picsum.photos/seed/node1/320/180',
      likes: 0
    },
    {
      id: 6,
      title: 'Web Design Principles 2024',
      channel: 'Design Hub',
      views: 210000,
      thumbnail: 'https://picsum.photos/seed/design1/320/180',
      likes: 0
    }
  ]

  // Computed property for filtered videos
  const filteredVideos = computed(() => {
    if (!searchQuery.value.trim()) {
      return videos.value
    }

    const query = searchQuery.value.toLowerCase()
    return videos.value.filter(video =>
      video.title.toLowerCase().includes(query) ||
      video.channel.toLowerCase().includes(query)
    )
  })

  // Computed property for filtered count
  const filteredCount = computed(() => filteredVideos.value.length)

  // Handle like event
  const handleLike = (videoId) => {
    const video = videos.value.find(v => v.id === videoId)
    if (video) {
      video.likes++
      totalLikes.value++
    }
  }

  // Sort videos by views
  const sortByViews = () => {
    videos.value.sort((a, b) => b.views - a.views)
  }

  // Simulate fetching video data
  const fetchVideos = () => {
    isLoading.value = true
    setTimeout(() => {
      videos.value = [...mockVideos]
      isLoading.value = false
      console.log('Videos loaded successfully')
    }, 1500)
  }

  // Lifecycle hook
  onMounted(() => {
    fetchVideos()
  })

  return {
    videos,
    searchQuery,
    totalLikes,
    isLoading,
    filteredVideos,
    filteredCount,
    handleLike,
    sortByViews
  }
}
