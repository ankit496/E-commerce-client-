import axios from "axios";
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await axios.post('https://e-commerce-xi-six-54.vercel.app/orders', {
      order
    }, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
    const data = await response.data;
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await axios.patch('https://e-commerce-xi-six-54.vercel.app/orders/' + order.id, {
      order
    }, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    });
    const data = await response.data;
    console.log(data)
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = '';

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/orders?' + queryString, {
      withCredentials: true
    });
    const data = await response.data;
    console.log(data)
    const totalOrders = await response.headers.get('X-Total-Count');
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}