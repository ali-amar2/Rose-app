import Link from 'next/link'
import LoginForm from './_components/login-form'

export default function page() {
    return (
        <main className='flex flex-col justify-center items-center w-full h-screen gap-10'>
            <LoginForm />
            <div className='flex gap-2 justify-center border-t border-zinc-200 border-solid pt-5'>
                <p className='text-zinc-800'>Don’t have an account yet? </p>
                {/* TODO: link the register form  */}
                <Link href={"/"} className='text-maroon-700 font-medium'>Create one now!</Link>
            </div>
        </main>
    )
}
