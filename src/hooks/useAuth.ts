import { useState, useEffect } from "react"
import api from "@/lib/api"

let cachedUser: any = null
let userPromise: Promise<any> | null = null

if (typeof window !== 'undefined') {
  window.addEventListener("user-updated", () => {
    cachedUser = null
    userPromise = null
  })
}

export function useAuth() {
  const [user, setUser] = useState<any>(cachedUser)
  const [loading, setLoading] = useState(!cachedUser)

  const fetchUser = () => {
    if (!userPromise) {
      userPromise = api.get('/users/info').then(res => {
        cachedUser = res.data
        return res.data
      }).catch(() => {
        cachedUser = { error: true } // Mark as fetched but unauthorized
        return null
      })
    }

    userPromise.then((data) => {
      setUser(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    if (cachedUser) {
      setUser(cachedUser)
      setLoading(false)
      return
    }
    fetchUser()

    const handleUpdate = () => {
      setLoading(true)
      fetchUser()
    }

    window.addEventListener("user-updated", handleUpdate)
    return () => window.removeEventListener("user-updated", handleUpdate)
  }, [])

  return { user: user?.error ? null : user, loading }
}
