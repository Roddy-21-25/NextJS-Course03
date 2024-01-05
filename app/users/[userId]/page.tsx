import getUser from "@/app/lib/getUser"
import getUserPosts from "@/app/lib/getUserPosts"

import getAllUsers from "@/app/lib/getAllUsers"

import { Metadata } from "next"

import UserPosts from "./components/UserPosts"

import { notFound } from "next/navigation"
import NotFound from "./components/not-found"

//? Suspense se usara para mostrar algo mientras se llama al api y se generan el resultado.
//? Es decir el Loading
import { Suspense } from "react"

//? Como este componente recibira un id para crearse, creamos una entidad
type Params = {
    params: {
        //? Le ponemos String, porque viene desde el query de la url.
        userId: string
    }
}

export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
    const userData: Promise<User> = getUser(userId)
    const user: User = await userData

    if (!user.name) {
        return {
            title: "User Not Found"
        }
    }

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

export default async function UserPage({ params: { userId } }: Params) {
    //? Entonces aqui usaremos toda esa data en pararelo
    const userData: Promise<User> = getUser(userId)
    const userPostsData: Promise<Post[]> = getUserPosts(userId)

    //const [user, userPosts] = await Promise.all([userData, userPostsData])
    const user = await userData

    if (!user.name) return notFound()

    return (
        <>
            <h2>{user.name}</h2>
            <br />

            {/* Esto se va a ir ejecutando mientras esperamos a que cargue por completo. */}
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
        </>
    )
}

//? Como las paginas se estan generando dinamcamente o SSR, pues lo que hacemos es recoger todos esos userId y pasarlos desde dentro para que
//? No tenga que esperar a que lleguen todos o a darle click a un endpoint para generar una vista, si no que como le pasamos todos los userId
//? Este ya puede por si solo pre-generar cada una de las paginas estaticas convirtiendo todo esto en SSG.
export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers()
    const users = await usersData

    return users.map(user => ({ userId: user.id.toString() }))
}