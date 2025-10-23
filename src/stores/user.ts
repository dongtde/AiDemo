import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/mock/users'
import { mockUsers } from '@/mock/users'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const currentUser = ref<User | null>(null)

  const userCount = computed(() => users.value.length)
  const adminUsers = computed(() => 
    users.value.filter(user => user.role === 'Admin')
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
  }

  function addUser(user: User) {
    users.value.push(user)
  }

  function updateUser(id: number, updates: Partial<User>) {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates }
    }
  }

  function deleteUser(id: number) {
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    loading,
    currentUser,
    userCount,
    adminUsers,
    fetchUsers,
    setCurrentUser,
    addUser,
    updateUser,
    deleteUser,
  }
})
