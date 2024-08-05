import axios from "axios"
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://e-commerce-xi-six-54.vercel.app/auth/signup',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    }) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/auth/check',{
        withCredentials:true
      });
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject( error );
    }

  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve,reject) =>{
    try{
      const response = await axios.post('https://e-commerce-xi-six-54.vercel.app/auth/login', loginInfo, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      const data = await response.data
      resolve({data})
    }
    catch(err){
      reject(err)
    }
  });
}

export function signOut() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get('https://e-commerce-xi-six-54.vercel.app/auth/logout', {
        headers: { 'content-type': 'application/json' },
        withCredentials: 'include' // This ensures that cookies are sent with the request
      });

      resolve({ data: 'success' });
    } catch (err) {
      reject(err);
    }
  });
}