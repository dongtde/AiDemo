import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/music'
import { mockUsers } from '@/mock/users'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>(mockUsers)
  const loading = ref(false)
  const currentUser = ref<User | null>(mockUsers[0])
  const isLoggedIn = ref(true)

  const userCount = computed(() => users.value.length)
  const vipUsers = computed(() => 
    users.value.filter(user => user.vipLevel !== 'free')
  )

  async function fetchUsers() {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      users.value = mockUsers
    } finally {
      loading.value = false
    }
  }

  function setCurrentUser(user: User) {
    currentUser.value = user
    isLoggedIn.value = true
  }

  function logout() {
    currentUser.value = null
    isLoggedIn.value = false
  }

  function login(userId: string) {
    const user = users.value.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
    }
  }

  function addUser(user: User) {
    users.value.push(user)
  }

  function updateUser(id: string, updates: Partial<User>) {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates }
    }
  }

  function deleteUser(id: string) {
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    loading,
    currentUser,
    isLoggedIn,
    userCount,
    vipUsers,
    fetchUsers,
    setCurrentUser,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser,
  }
})
