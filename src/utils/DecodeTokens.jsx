import jwt_decode from "jwt-decode";

export function saveAuthToken(token){
  // Save the token to local storage
  localStorage.setItem('authToken', token);
};

export function decodeAuthToken(token){
  return jwt_decode(token);
  // const {firstName, lastName, studentID } = jwt_decode(token)
}
