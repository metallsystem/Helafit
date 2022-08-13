
import { createOrder, addProductToOrder } from "../controller/orderController";

export const newOrder = async () => {
  if (localStorage.getItem('orderId')) {
    return
  }

  const response = await createOrder()
  const orderId = response.data

  localStorage.setItem('orderId', orderId)
}

export const addProduct = async (productId, count) => {
  const orderId = localStorage.getItem('orderId')

  if (!orderId) {
    return
  }

  await addProductToOrder(orderId, productId, count)
}
