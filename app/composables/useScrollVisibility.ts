import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollVisibility(threshold = 200) {
  const isVisible = ref(true)

  const onScroll = () => {
    isVisible.value = window.scrollY < threshold
  }

  onMounted(() => window.addEventListener("scroll", onScroll))
  onUnmounted(() => window.removeEventListener("scroll", onScroll))

  return { isVisible }
}
