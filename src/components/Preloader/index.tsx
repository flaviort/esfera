'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// svg
import PreloaderSvg from '@/assets/svg/preloader.svg'

export default function Preloader() {

    const preloaderRef = useRef<HTMLElement>(null)
    const videoContainerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    const pathname = usePathname()

    useGSAP(() => {
        if (!videoContainerRef.current) return

        const finalRect = videoContainerRef.current.getBoundingClientRect()
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        
        const deltaX = (finalRect.left + finalRect.width / 2) - centerX
        const deltaY = (finalRect.top + finalRect.height / 2) - centerY

        // initial part of the timeline
        const tl = gsap.timeline({
            onComplete: () => {
                if (pathname === '/') {
                    tlHome.play()
                } else {
                    tlInternal.play()
                }
            }
        })

        tl.set(videoContainerRef.current, {
            x: -deltaX,
            y: -deltaY,
            scale: 0
        })

        tl.to('[data-prealoder-numbers] > img', {
            yPercent: -92.525,
            duration: 3,
            ease: 'power4.inOut',
            stagger: .3
        })

        // from here on we create 2 timelines, one for the home and one for the internal pages
        // depending on the page, we'll use the appropriate timeline

        // home timeline
        const tlHome = gsap.timeline({ paused: true })

        tlHome.to('[data-prealoder-numbers]', {
            autoAlpha: 0,
            duration: 1,
            ease: 'power2.inOut'
        })

        tlHome.to(videoContainerRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut'
        })

        tlHome.to(videoContainerRef.current, {
            x: 0,
            y: 0,
            duration: 1,
            delay: .3,
            ease: 'power2.inOut'
        })

        tlHome.fromTo('[data-preloader-title]', {
            opacity: 0,
            xPercent: 50
        }, {
            opacity: 1,
            xPercent: 0,
            duration: 1,
            ease: 'power2.inOut'
        }, '<')

        // internal timeline
        const tlInternal = gsap.timeline({ paused: true })
        
        tlInternal.to(preloaderRef, {
            autoAlpha: 0,
            duration: .6,
            ease: 'power2.inOut'
        })

    }, {
        scope: preloaderRef
    })

	return (
		<aside
            ref={preloaderRef}
            className='fixed z-9999 inset-0 bg-white'
            data-preloader
            data-lenis-prevent
        >
			<div className='base-container'>
                <div className='flex items-center justify-center h-svh'>
                    <div
                        className='relative overflow-hidden flex justify-center gap-2 w-auto h-[14.9svh]'
                        data-prealoder-numbers
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Image
                                key={i}
                                src='/img/svg/preloader.svg'
                                alt='0123456789'
                                width={34}
                                height={1070}
                                className='w-auto h-[200svh] will-change-transform'
                            />
                        ))}
                    </div>
                </div>
            </div>
            
            <div
                className='absolute z-2 inset-0 flex justify-center items-center'
                data-preloader-content
            >
                <div className='base-container'>
                    <div className='flex flex-col md:flex-row-reverse items-center justify-center h-svh gap-10 md:gap-20'>

                        <div 
                            ref={videoContainerRef}
                            className='relative overflow-hidden h-[35svh] md:h-[50svh] aspect-3/4 rounded-md opacity-0 will-change-transform'
                            data-preloader-video-wrapper
                        >
                            <video
                                ref={videoRef}
                                loop
                                muted
                                playsInline
                                autoPlay
                                className='w-full h-full object-cover'
                            >
                                <source
                                    src='/videos/intro.mp4'
                                    type='video/mp4'
                                />
                            </video>
                        </div>

                        <p
                            className='text-60 opacity-0 will-change-transform'
                            data-preloader-title
                        >
                            Somos uma <br />
                            <span className='text-yellow'>agência 360</span>
                        </p>
                        
                    </div>
                </div>
            </div>

		</aside>
	)
}