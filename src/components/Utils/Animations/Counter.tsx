'use client'

import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register plugins only when needed
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

interface CounterProps {
	number: number
}

export default function Counter({ number }: CounterProps) {
	const item = useRef<HTMLSpanElement>(null)

	useGSAP(() => {
		if (item.current) {
			// animated counter
			;(gsap.utils.toArray(item.current) as HTMLElement[]).forEach(
				(item) => {
					gsap.from(item, {
						textContent: '0',
						duration: 3,
						ease: 'power2.inOut',
						modifiers: {
							textContent: (value) => formatNumber(value)
						},
						scrollTrigger: {
							trigger: item,
							start: 'top 90%',
							toggleActions: 'play none none none'
						}
					})
				}
			)

			// format the number in US standard
			function formatNumber(value: number) {
				return Math.floor(+value)
			}
		}
	})

	return <span ref={item}>{number}</span>
}
