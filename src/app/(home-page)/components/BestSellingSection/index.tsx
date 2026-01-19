import React, { Suspense } from 'react'
import { BestSellingCarousel } from './BestSellingCarousel'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Loading from '@/app/loading'

export default function BestSellingSection() {
    return (
        <section className="flex w-full gap-6 h-[22rem]">
            <div className="flex flex-col w-[18.5%] justify-between flex-shrink-0">
                <div>
                    {/* Main headline */}
                    <h2 className="text-lg font-semibold tracking-widest uppercase mb-3 text-softPink-500">Best Selling</h2>
                    <p className="text-2xl leading-none mb-1 font-bold text-maroon-600">
                        <span className='text-softPink-500'>Check Out</span> What Everyone’s <span className='text-softPink-500'>Buying</span> Right Now
                    </p>
                    {/* Description paragraph */}
                    <p className="text-sm text-zinc-500">
                        Not sure what to choose? Start with our best sellers, these are the gifts our customers keep coming back for.
                        Whether you&apos;re celebrating a birthday, anniversary or wedding, our top picks are guaranteed to leave a lasting impression.
                    </p>

                </div>
                {/* Explore gifts link To The Products Page*/}
                <Link href="/products" className='flex gap-4 bg-maroon-600 text-white px-5 py-1 rounded-md w-fit'>
                    Explore gifts
                    <ArrowRight className='w-4' />
                </Link>
            </div>

            {/* Best Selling Products Carousel component */}
            <div className='w-full'>
                <Suspense fallback={<Loading />}>
                    <BestSellingCarousel />
                </Suspense>
            </div>

        </section>
    )
}
