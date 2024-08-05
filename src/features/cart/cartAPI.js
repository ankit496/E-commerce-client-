import axios from "axios"
export function addToCart(items) {

  return new Promise(async (resolve) => {
    const response = await axios.post('https://e-commerce-xi-six-54.vercel.app/cart', items, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });

    const data = await response.data
    resolve({ data })
  }
  );
}
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/cart?user=' + userId, {
      withCredentials: true
    })
    const data = await response.data
    resolve({ data })
  })
}
export function updateCart(update) {
  return new Promise(async (resolve) => {
    console.log(update)
    const response = await axios.patch('https://e-commerce-xi-six-54.vercel.app/cart/' + update.id, {
      update: update
    }, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    })
    const data = await response.data
    resolve({ data })
  })
}
export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await axios.delete('https://e-commerce-xi-six-54.vercel.app/cart/' + itemId, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    })
    const data = await response.data
    resolve({ data: { id: itemId } })
  })
}
export async function resetCart(userId) {
  //get all the items - the delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId)
    const items = await response.data
    // console.log(items)
    for (let i = 0; i < items.length; i++)
      await deleteItemFromCart(items[i].id)
    resolve({ status: 'successs' })
  })
}