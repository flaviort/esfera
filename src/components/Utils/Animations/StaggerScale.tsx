'use client'

import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register plugins only when needed
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

interface StaggerScaleProps {
	className?: string
	children: React.ReactNode
}

export default function StaggerScale({
	className,
	children,
}: StaggerScaleProps) {
	
	const item = useRef(null)

	useGSAP(() => {
		if (item.current) {
		
			const children = (item.current as HTMLElement).children

			Array.from(children).forEach(item => {
				gsap.from(item, {
					scale: 0,
					scrollTrigger: {
						trigger: item,
						scrub: 2,
						start: 'top 100%',
						end: 'bottom 70%'
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