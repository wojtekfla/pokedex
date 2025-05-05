// import { useState, useEffect } from "react";

// export function useFetch (url) {
//   const [data, setData] = useState(null)
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true)
//       try {
//         const response = await fetch(url) 
//         if(!response.ok) {
//           throw new Error ('failed to get response')
//         }
//         const data = await response.json()
//         setData(data) 
//       } catch (error) {
//         setError(error.message)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchData()

//     return () => {
//       setIsLoading(false)
//     }
//   }, [url])

//   return { data, error, isLoading }
// }