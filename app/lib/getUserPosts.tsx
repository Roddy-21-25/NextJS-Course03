export default async function getUserPosts(userId: String) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, 
    { next: { revalidate: 60 } })
    // if (!res.ok) throw new Error('Failed to Fetch the Posts of the User')
    if (!res.ok) undefined
    return res.json()
}