//? Se puede usar un TS. no hay porque poner un TSX.
export default async function getAllUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    //if (!res.ok) throw new Error('Failed to Fetch the Data')
    if (!res.ok) undefined
    return res.json()
}
