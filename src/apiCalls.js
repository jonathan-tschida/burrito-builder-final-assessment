export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrder = (name, ingredients) => {
  const newOrder = {
    name,
    ingredients
  }
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  }).then(response => response.json())
}

export const deleteOrder = (id) => {
  return fetch('http://localhost:3001/api/v1/orders/' + id, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
}
