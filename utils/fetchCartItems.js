import axios from "axios"
export default async function fetchCartItems(id) {
  let resolvedItems = []

  try {
    // get the cart items for the user
    const { data: cartItems } = await axios.get(`/api/cart/${id}`)

    // fetch name, image, price etc. for each item
    const rawItems = cartItems.map(async (item) => {
      const { data: productData } = await axios.get(
        `/api/products/${item.productId}`
      )

      // extract the relevant product information
      const { price, image, name } = productData
      return { ...item, price, image, name }
    })
    resolvedItems = await Promise.all(rawItems)
  } catch (error) {
    console.error(error)
  }

  return resolvedItems
}
