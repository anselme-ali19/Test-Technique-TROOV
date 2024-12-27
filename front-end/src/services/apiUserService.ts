import axios from 'axios';

const API_URL = 'http://localhost:4000/api/users';

export const loginAction = async (user : any) => (await axios.get(API_URL , {params : user})).data;
export const signUpAction = async (user : any) => await axios.post(API_URL, user)
export const resetPasswordAction = async (email: string, password : string) => await axios.put(`${API_URL}/${email}`, {password})
