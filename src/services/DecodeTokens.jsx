import jwt from 'jsonwebtoken';

export function decodeToken(token) {
  try {
    const decodedToken = jwt.decode(token);
    if (decodedToken && decodedToken.studentID) {
      return decodedToken.studentID;
    }
    // else (decodedToken && decodedToken.teacherID){
    //     return decodedToken.teacherID
    // }
  } catch (error) {
    console.error('Error decoding token:', error.message);
  }
  return null;
}
