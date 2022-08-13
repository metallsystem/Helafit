/* eslint-disable consistent-return */
import { host } from '../../index'

export const createOrder = async () => {
  const response = await host.post('api/order/create')

  return response
}


export const asd = async () => {
  const response = await host.post('api/order/create')

  return response
}

export const deleteOrder = async (orderId) => {
  const response = await host.delete(`api/order/${ orderId }`)

  return response
}

export const addProductToOrder = async (orderId, productId, count) => {
  const response = await host.post(`api/order/${ orderId }`, { productId, count })

  return response
}

export const removeProductFromOrder = async (orderId, productId, count) => {
  const response = await host.delete(`api/order/${ orderId }`, { productId, count })

  return response
}
