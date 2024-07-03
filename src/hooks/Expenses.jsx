import { useState, useEffect } from 'react'

const URL = "https://expenses-backend-mu.vercel.app/expenses"

export default function useExpenses() {
    // improvement: refresh data
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL, {
                    headers: {
                        "Content-Type": "application/json",
                        Username: "kevin.dervishi"
                    }
                })
                if (!response.ok) {
                    throw new Error(`${response.status}`)
                }
                const result = await response.json()
                setData(result)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return [data, loading, error]
}