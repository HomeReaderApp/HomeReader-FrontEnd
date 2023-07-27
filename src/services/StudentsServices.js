const api = 'http://localhost:3001'

export async function getTeachers(){
    const response = await fetch(`${api}/teacher`)
    const json = await response.json()
    return json
}

const fetchTeachers = async () => {
    try {
        const teachersData = await getTeachers();
        console.log('Teachers Data:', teachersData);
    
        // Access the teacherUsers array from the fetched data and set it to the state
        setTeachers(teachersData.teacherUsers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
  };

// export async function createReadingData(){
//     const response = await fetch(`${api}/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({bookName: json.bookName, rating: json.rating, comments: json.comments })
//     })
//     const json = await response.json()
//     console.log(json)
//     return json
// }