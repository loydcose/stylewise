import { useState } from "react"

const useFilters = (products) => {
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleFilter = (type) => {
    let sorted = []
    if (type === "asc") {
      sorted = products.sort((a, b) => b.price - a.price)
    } else if (type === "desc") {
      sorted = products.sort((a, b) => a.price - b.price)
    } else if (type === "new") {
      sorted = products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    } else if (type === "old") {
      sorted = products.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
    } else {
      sorted = products
    }
    setFilteredProducts([...sorted])
  }

  return [filteredProducts, handleFilter]
}

export default useFilters
