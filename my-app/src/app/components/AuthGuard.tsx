import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '../lib/stores/authStore'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, checkAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(() => {
      if (!user) {
        router.push('/login')
      }
    })
  }, [user, checkAuth, router])

  return <>{user ? children : null}</>
}