export default async function getUser(userId: String) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    // if (!res.ok) throw new Error('Failed to Fetch the Data of the User')
    if (!res.ok) undefined
    return res.json()
}