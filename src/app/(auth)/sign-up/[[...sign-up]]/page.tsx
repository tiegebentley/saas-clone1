import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black">
            {/* Background Image */}
            <Image
                src="/bg.jpg"
                alt="Background image"
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-50"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            />

            {/* Back Button */}
            <Link
                href="/"
                className="absolute top-8 left-8 z-20 group"
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white group-hover:-translate-x-1 transition-transform duration-300"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    <span className="text-white/90 group-hover:text-white text-sm font-medium">Back</span>
                </div>
            </Link>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[500px] mx-auto p-4">
                <div className="backdrop-blur-md bg-white/10 rounded-3xl border border-white/20 p-8 shadow-2xl">
                    <div className='flex items-center justify-center'>
                        <SignUp />
                    </div>
                </div>
            </div>
        </div>
    );
}