'use client'

import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register plugins only when needed
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

interface StaggerUpProps {
	className?: string
	children: React.ReactNode
	infinite?: boolean
}

export default function StaggerUp({
	className,
	children,
	infinite = false
}: StaggerUpProps) {
	
	const item = useRef(null)

	useGSAP(() => {
		if (item.current) {
		
			const children = (item.current as HTMLElement).children

			gsap.set(children, {
				opacity: 0,
				y: '20vh'
			})

			ScrollTrigger.batch(children, {
				start: '-50% 100%',
				onEnter: elements => {
					gsap.to(elements, {
						opacity: 1,
						y: 0,
						stagger: 0.25,
						duration: 1
					})
				},
				...(infinite && {
					onLeaveBack: elements => {
						gsap.to(elements, {
							opacity: 0,
							y: '20vh',
							stagger: 0.15,
							duration: 1
						})
					}
				})
			})
		}
	})

	return (
		<div ref={item} data-stagger className={className}>
			{children}
		</div>
	)
}