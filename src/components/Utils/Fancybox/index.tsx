'use client'

import { useRef, useEffect } from 'react'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

interface FancyboxProps {
	options?: object
	delegate?: string
	children: React.ReactNode
}

export default function Fancybox({
	options = {},
	delegate = '[data-fancybox]',
	children
}: FancyboxProps) {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const container = containerRef.current

		if (container) {
			// Dynamically import Fancybox only when component mounts
			const initFancybox = async () => {
				const { Fancybox: NativeFancybox } = await import('@fancyapps/ui')
				
				NativeFancybox.bind(container, delegate, options)

				return () => {
					NativeFancybox.unbind(container)
					NativeFancybox.close()
				}
			}

			let cleanup: (() => void) | undefined

			initFancybox().then((cleanupFn) => {
				cleanup = cleanupFn
			}).catch((error) => {
				console.error('Failed to load Fancybox:', error)
			})

			return cleanup
		}
	}, [options, delegate])

	return <div ref={containerRef}>{children}</div>
}
