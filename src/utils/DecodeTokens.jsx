import jwt_decode from "jwt-decode";

export function saveAuthToken(token){
  // Save the token to local storage
  localStorage.setItem('authToken', token);
};

export function getAuthToken(){
  return localStorage.getItem('authToken')
}

// Clear the authentication token from localStorage
export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};

export function decodeTeacherToken(token){
  const {username, user_id} = jwt_decode(token)
  return {username, user_id}
}

export function decodeAuthToken(token){
  const {firstName, user_id } = jwt_decode(token)
  return {firstName, user_id}
}
