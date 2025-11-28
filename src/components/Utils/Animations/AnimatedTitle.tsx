'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'

// register plugins only when needed
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger, SplitText)
}

interface AnimatedTitleProps {
    text: string
    className?: string
	invert?: boolean
}

export default function AnimatedTitle({
    text,
    className,
	invert
}: AnimatedTitleProps) {

    const item = useRef<HTMLHeadingElement>(null)

    useGSAP(() => {
		if (!item.current) return

		const split = new SplitText(item.current, {
			type: 'lines',
			tag: 'span'
		})

		split.lines.forEach((line) => {
			gsap.to(line, {
				backgroundPositionX: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: line,
					scrub: true,
					start: 'top 75%',
					end: 'bottom 60%'
				}
			})
		})

		// cleanup
		return () => {
			split.revert()
		}
	})

    return (
        <h2
			className={clsx(
				'fill-title',
				invert && 'fill-title--invert',
				className
			)}
			ref={item}
		>
            {text}
        </h2>
    )
}