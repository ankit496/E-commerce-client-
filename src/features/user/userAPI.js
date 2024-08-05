import axios from "axios"
export function fetchLoggedInUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/orders/' + userId, {
      withCredentials: true
    })
    const data = await response.data
    console.log(data)
    resolve({ data })
  }
  );
}
export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/users/own/', {
      withCredentials: true
    })
    const data = await response.data
    resolve({ data })
  }
  );
}
export function updateUser(update) {
  return new Promise(async (resolve) => {
    console.log(update)
    const response = await axios.patch('https://e-commerce-xi-six-54.vercel.app/users/' + update.id, {
      update
    }, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    })
    const data = await response.data
    console.log("from update function",data)
    resolve({ data })
  })
}