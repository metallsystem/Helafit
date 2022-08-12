/* eslint-disable no-param-reassign */
const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`

  return config
}

export default authInterceptor
