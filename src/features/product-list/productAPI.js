import axios from "axios";

export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/products', {
      withCredentials: 'include'
    })
    const data = await response.data
    resolve({ data })
  }
  );
}
export function createProduct(product) {
  return new Promise(async (resolve) => {
    console.log(product)
    const response = await axios.post('https://e-commerce-xi-six-54.vercel.app/products/', {
      product
    }, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    })

    const data = await response.data
    resolve({ data })
  })
}
export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await axios.patch('https://e-commerce-xi-six-54.vercel.app/products/' + update.id, {
      update
    }, {
      headers: { 'content-type': 'application/json' },
      withCredentials: true
    })
    const data = await response.data
    resolve({ data })
  })
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/categories', {
      withCredentials: true
    })
    const data = await response.data
    resolve({ data })
  }
  );
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
      const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/brands', {
      withCredentials: true
    })
    const data = await response.data
    resolve({ data })
  }
  );
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const res = await axios.get(`https://e-commerce-xi-six-54.vercel.app/products/${id}`, {
      withCredentials: true
    })
    const data = await res.data
    console.log(data)
    resolve({ data })
  })
}
export function fetchProductsByFilters(filter, sort, pagination) {
  //filter={"category":"smartphone"}
  let queryString = ''
  const arr = filter['category']
  for (let key in filter) {
    const categoryValues = filter[key]
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${filter[key]}&`
    }
  }
  for (let key in sort) {
    // if(key!='_order')
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    const response = await axios.get('api/products?' + queryString, {
      withCredentials: true
    })
    const products = await response.data
    const totalItems = response.headers.get('X-Total-Count')
    resolve({ data: { products: products, totalItems: totalItems } })
  }
  );
}
