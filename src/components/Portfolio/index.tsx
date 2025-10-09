'use client'

// libraries
import clsx from 'clsx'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

// register plugins only when needed
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

// components
import FollowMouse from '@/components/Utils/Animations/FollowMouse'

// css
import styles from './index.module.scss'

interface Slide {
    big_image: string
    small_image: string
    big_video?: string
    left: string
    right: string
    href: string
}

export default function Portfolio() {

    const section = useRef<HTMLDivElement>(null)

    const vh = (coef: number) => window.innerHeight * (coef/100)

    useGSAP(() => {
        const totalSlides = slides.length

        slides.forEach((_, index) => {
            const slideNumber = index + 1
            const isFirstSlide = index === 0
            const isLastSlide = index === totalSlides - 1

            // initial states
            if (!isFirstSlide) {
                gsap.set(`.slide:nth-child(${slideNumber}) .text h3`, {
                    opacity: 0
                })
            }

            // clip-path effect
            if (!isLastSlide) {
                gsap.to(`.slide:nth-child(${slideNumber}) .image, .link:nth-child(${slideNumber})`, {
                    clipPath: 'inset(0 0 100% 0)',
                    scrollTrigger: {
                        trigger: section.current,
                        start: `${vh(100 * index)} 0`,
                        end: `${vh(100 * (index + 1))} 0`,
                        scrub: 1
                    }
                })
            }

            // text in effect
            if (!isFirstSlide) {
                gsap.fromTo(`.slide:nth-child(${slideNumber}) .text h3`, {
                    y: '200%'
                }, {
                    y: 0,
                    scrollTrigger: {
                        trigger: section.current,
                        start: `${vh(100 * (index - 1))} 0`,
                        end: `${vh(100 * index)} 0`,
                        scrub: 1
                    }
                })
            }

            // text out effect
            if (isFirstSlide) {
                gsap.fromTo(`.slide:nth-child(${slideNumber}) .text h3`, {
                    y: 0
                }, {
                    y: '-200%',
                    scrollTrigger: {
                        trigger: section.current,
                        start: `${vh(100 * index)} 0`,
                        end: `${vh(100 * (index + 1))} 0`,
                        scrub: 1
                    }
                })
            }

            if (!isLastSlide && !isFirstSlide) {
                gsap.fromTo(`.slide:nth-child(${slideNumber}) .text h3`, {
                    y: 0
                }, {
                    y: '-200%',
                    scrollTrigger: {
                        trigger: section.current,
                        start: `${vh(100 * index)} 0`,
                        end: `${vh(100 * (index + 1))} 0`,
                        scrub: 1
                    }
                })
            }

            // bg slides effect
            if (!isLastSlide) {
                gsap.to(`.bg-slide:nth-child(${slideNumber})`, {
                    clipPath: 'inset(0 0 100% 0)',
                    scrollTrigger: {
                        trigger: section.current,
                        start: `${vh(100 * index)} 0`,
                        end: `${vh(100 * (index + 1))} 0`,
                        scrub: 1
                    }
                })
            }
        })

        ScrollTrigger.create({
            trigger: section.current,
            start: '0 0',
            end: `+=${vh(100 * (totalSlides - 1))}`,
            pin: true,
            anticipatePin: 1,
            scrub: 1,
            snap: {
                snapTo: 1 / (totalSlides - 1),
                duration: { min: 0.1, max: 0.9 },
                delay: .2,
                ease: 'power2.inOut'
            },
            onEnter: () => {
                gsap.to(`.slide .text h3`, {
                    opacity: 1,
                    duration: 0,
                    delay: .1
                })
            }
        })

    }, { scope: section })

    const slides = [
        {
            big_image: '/img/portfolio/01-big.jpg',
            small_image: '/img/portfolio/01-small.jpg',
            left: 'Agrinho 2024',
            right: 'Do Campo à Cidade',
            href: '#01'
        },
        {
            big_image: '/img/portfolio/02-big.jpg',
            small_image: '/img/portfolio/02-small.jpg',
            left: 'John Deere Space',
            right: 'O maior evento corporativo',
            href: '#02'
        },
        {
            big_image: '/img/portfolio/03-big.jpg',
            small_image: '/img/portfolio/03-small.jpg',
            left: 'Convenção Bosch Service 2025',
            right: 'Juntos crescemos mais',
            href: '#03'
        }
    ]

	return (
        <section
            className={clsx(styles.component, 'bg-black')}
            ref={section}
        >

            <FollowMouse
                text='Ver'
                scrollTrigger
            >

                {slides.map((item, i) => (
                    <Link
                        href={item.href}
                        className={clsx(styles.link, 'cover link')}
                        key={i}
                    />
                ))}

                <div className='container relative z2'>
                    {slides.map((item, i) => (
                        <div
                            className={clsx(styles.slide, 'slide')}
                            key={i}
                        >

                            <div className={clsx(styles.left, 'text')}>
                                <h3 className='text-25 white'>
                                    {item.left}
                                </h3>
                            </div>

                            <div className={clsx(styles.image, 'image')}>
                                <Image
                                    src={item.small_image}
                                    alt={item.left}
                                    fill
                                    className='cover'
                                    loading='lazy'
                                />
                            </div>

                            <div className={clsx(styles.right, 'text')}>
                                <h3 className='text-25 white'>
                                    {item.right}
                                </h3>
                            </div>

                        </div>
                    ))}
                </div>

                <div className={clsx(styles.bg, 'bg-slider')}>
                    {slides.map((item: Slide, i: number) => (
                        <div
                            key={i}
                            className={clsx(styles.bgSlide, 'cover bg-slide')}
                        >
                            {item.big_video ? (
                                <video
                                    loop
                                    muted
                                    playsInline
                                    className='cover'
                                >
                                    <source
                                        src={item.big_video}
                                        type='video/mp4'
                                    />
                                </video>
                            ) : (
                                <Image
                                    src={item.big_image}
                                    alt={item.left}
                                    fill
                                    className='cover'
                                    loading='lazy'
                                />
                            )}
                            
                        </div>
                    ))}
                </div>

            </FollowMouse>
        </section>
	)
}