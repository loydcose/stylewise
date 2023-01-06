import { useState } from "react"

const useFilters = (rawProducts) => {
  const [products, setProducts] = useState(rawProducts)

  const handleFilter = (type) => {
    let sorted = []
    if (type === "asc") {
      sorted = rawProducts.sort((a, b) => a.price - b.price)
    } else if (type === "desc") {
      sorted = rawProducts.sort((a, b) => b.price - a.price)
    } else if (type === "new") {
      sorted = rawProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    } else if (type === "old") {
      sorted = rawProducts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
    } else {
      sorted = rawProducts
    }
    setProducts([...sorted])
  }

  return [products, handleFilter]
}

export default useFilters
