'use client'

// libraries
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function Portfolio() {

	const projects = [
		{
			href: '#1',
			bgImage: '/img/portfolio/01-big.jpg',
			mainImage: '/img/portfolio/01-small.jpg',
			textLeft: 'Agrinho 2024',
			textRight: 'Do Campo à Cidade',
		},
		{
			href: '#2',
			bgImage: '/img/portfolio/02-big.jpg',
			mainImage: '/img/portfolio/02-small.jpg',
			textLeft: 'John Deere Space',
			textRight: 'Inovação em grande escala',
		},
		{
			href: '#3',
			bgImage: '/img/portfolio/03-big.jpg',
			mainImage: '/img/portfolio/03-small.jpg',
			textLeft: 'Convenção Bosch Service 2025',
			textRight: 'Juntos crescemos mais',
		}
	]

	const containerRef = useRef<HTMLDivElement>(null)
	const bgRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!containerRef.current) return

		const bgs = gsap.utils.toArray('[data-bg]') as HTMLElement[]
		const bgImages = bgs.map(bg => bg.querySelector('img')).filter(Boolean) as HTMLElement[]
		const thumbnails = gsap.utils.toArray('[data-thumbnail]') as HTMLElement[]
		const links = gsap.utils.toArray('[data-link]') as HTMLElement[]
		const textContainers = gsap.utils.toArray('[data-texts]') as HTMLElement[]

		// Set initial clipPath
		gsap.set(bgs, {
			clipPath: 'inset(0% 0% 0% 0%)'
		})

		gsap.set(thumbnails, {
			clipPath: 'inset(0% 0% 0% 0%)'
		})

		gsap.set(links, {
			clipPath: 'inset(0% 0% 0% 0%)'
		})

		// Set initial brightness for background images
		gsap.set(bgImages, {
			filter: 'brightness(1)'
		})

		// Set initial transform for texts based on their project index
		textContainers.forEach((container, containerIndex) => {
			const textIndex = Math.floor(containerIndex / 2)
			const text = container.querySelector('p') as HTMLElement
			
			if (!text) return
			
			if (textIndex === 0) {
				// First project: start at 0% (none)
				gsap.set(text, { y: '0%' })
			} else {
				// All other projects: start at 110%
				gsap.set(text, { y: '110%' })
			}
		})

		// Calculate viewport height - 100lvh = 100vh = window.innerHeight
		const vh = window.innerHeight

		// Pin duration: only for items that have clip-path animations (projects.length - 1)
		const pinDuration = (projects.length - 1) * vh
		const itemsWithAnimation = projects.length - 1

		// Pin the container for the total duration
		ScrollTrigger.create({
			trigger: containerRef.current,
			start: 'top top',
			end: `+=${pinDuration}`,
			pin: true,
			pinSpacing: true
		})

		// Create a single ScrollTrigger to track progress through the pinned section
		// and animate each clip-path during its respective 100vh section
		ScrollTrigger.create({
			trigger: containerRef.current,
			start: 'top top',
			end: `+=${pinDuration}`,
			scrub: true,
			onUpdate: (self) => {
				const progress = self.progress
				
				// Apply clip-path animation to backgrounds
				bgs.forEach((bg, index) => {
					const bgImage = bg.querySelector('img') as HTMLElement
					
					if (index === projects.length - 1) {
						gsap.set(bg, {
							clipPath: 'inset(0% 0% 0% 0%)'
						})
						if (bgImage) {
							gsap.set(bgImage, { filter: 'brightness(1)' })
						}
						return
					}
					
					const sectionStart = index / itemsWithAnimation
					const sectionEnd = (index + 1) / itemsWithAnimation
					
					if (progress >= sectionStart && progress <= sectionEnd) {
						const sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart)
						const bottomValue = 100 * sectionProgress
						
						gsap.set(bg, {
							clipPath: `inset(0% 0% ${bottomValue}% 0%)`
						})
						
						// Brightness from 1 to 0.1 as the clip-path animates
						if (bgImage) {
							const brightnessValue = 1 - (sectionProgress * 0.9)
							gsap.set(bgImage, { filter: `brightness(${brightnessValue})` })
						}
					} else if (progress < sectionStart) {
						gsap.set(bg, {
							clipPath: 'inset(0% 0% 0% 0%)'
						})
						if (bgImage) {
							gsap.set(bgImage, { filter: 'brightness(1)' })
						}
					} else if (progress > sectionEnd) {
						gsap.set(bg, {
							clipPath: 'inset(0% 0% 100% 0%)'
						})
						if (bgImage) {
							gsap.set(bgImage, { filter: 'brightness(0.1)' })
						}
					}
				})
				
				// Apply the same clip-path animation to thumbnails (synced)
				thumbnails.forEach((thumbnail, index) => {
					if (index === projects.length - 1) {
						gsap.set(thumbnail, {
							clipPath: 'inset(0% 0% 0% 0%)'
						})
						return
					}
					
					const sectionStart = index / itemsWithAnimation
					const sectionEnd = (index + 1) / itemsWithAnimation
					
					if (progress >= sectionStart && progress <= sectionEnd) {
						const sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart)
						const bottomValue = 100 * sectionProgress
						
						gsap.set(thumbnail, {
							clipPath: `inset(0% 0% ${bottomValue}% 0%)`
						})
					} else if (progress < sectionStart) {
						gsap.set(thumbnail, {
							clipPath: 'inset(0% 0% 0% 0%)'
						})
					} else if (progress > sectionEnd) {
						gsap.set(thumbnail, {
							clipPath: 'inset(0% 0% 100% 0%)'
						})
					}
				})
				
				// Apply the same clip-path animation to links (synced)
				links.forEach((link, index) => {
					if (index === projects.length - 1) {
						gsap.set(link, {
							clipPath: 'inset(0% 0% 0% 0%)'
						})
						return
					}
					
					const sectionStart = index / itemsWithAnimation
					const sectionEnd = (index + 1) / itemsWithAnimation
					
					if (progress >= sectionStart && progress <= sectionEnd) {
						const sectionProgress = (progress - sectionStart) / (sectionEnd - sectionStart)
						const bottomValue = 100 * sectionProgress
						
						gsap.set(link, {
							clipPath: `inset(0% 0% ${bottomValue}% 0%)`
						})
					} else if (progress < sectionStart) {
						gsap.set(link, {
							clipPath: 'inset(0% 0% 0% 0%)'
						})
					} else if (progress > sectionEnd) {
						gsap.set(link, {
							clipPath: 'inset(0% 0% 100% 0%)'
						})
					}
				})
				
				// Apply transform translateY animation to texts with custom timing (scalable for any number of projects)
				textContainers.forEach((container, containerIndex) => {
					const textIndex = Math.floor(containerIndex / 2)
					const text = container.querySelector('p') as HTMLElement
					
					if (!text) return
					
					const totalProjects = projects.length
					const animatedSections = itemsWithAnimation // projects.length - 1
					
					if (textIndex === 0) {
						// First text: 0% to -110%, ends at 50% of its clip-path section
						const animStart = 0
						const animEnd = 0.5 / animatedSections
						
						if (progress >= animStart && progress <= animEnd) {
							const animProgress = (progress - animStart) / (animEnd - animStart)
							const translateY = -110 * animProgress
							gsap.set(text, { y: `${translateY}%` })
						} else if (progress < animStart) {
							gsap.set(text, { y: '0%' })
						} else {
							gsap.set(text, { y: '-110%' })
						}
					} else if (textIndex === totalProjects - 1) {
						// Last text: 110% to 0%, starts at 50% of the last clip-path section
						const animStart = (animatedSections - 0.5) / animatedSections
						const animEnd = 1
						
						if (progress >= animStart && progress <= animEnd) {
							const animProgress = (progress - animStart) / (animEnd - animStart)
							const translateY = 110 - (animProgress * 110)
							gsap.set(text, { y: `${translateY}%` })
						} else if (progress < animStart) {
							gsap.set(text, { y: '110%' })
						} else {
							gsap.set(text, { y: '0%' })
						}
					} else {
						// Middle texts: 110% to -110%
						const animStart = (textIndex - 0.5) / animatedSections
						const animEnd = (textIndex + 0.5) / animatedSections
						
						if (progress >= animStart && progress <= animEnd) {
							const animProgress = (progress - animStart) / (animEnd - animStart)
							const translateY = 110 - (animProgress * 220)
							gsap.set(text, { y: `${translateY}%` })
						} else if (progress < animStart) {
							gsap.set(text, { y: '110%' })
						} else {
							gsap.set(text, { y: '-110%' })
						}
					}
				})
			}
		})

		return () => {
			ScrollTrigger.getAll().forEach(trigger => {
				if (trigger.vars.trigger === containerRef.current) {
					trigger.kill()
				}
			})
		}
	}, { scope: containerRef, dependencies: [projects.length] })

	return (
		<section
			className='bg-black flex items-center justify-center overflow-hidden h-lvh'
			ref={containerRef}
		>

			<div
				className='absolute inset-0 w-full h-lvh opacity-50'
				ref={bgRef}
			>
				{projects.map((item, i) => (
					<div
						key={i}
						className='absolute inset-0 w-full h-full'
						style={{ zIndex: projects.length - i }}
						data-bg
					>
						<Image
							src={item.bgImage}
							alt={item.textLeft}
							fill
							className='object-cover'
						/>
					</div>
				))}
			</div>

			<div className='relative z-10 w-full h-full'>

				<div className="absolute z-99 w-full h-full">
					{projects.map((item, i) => (
						<Link
							key={i}
							href={item.href}
							className='absolute inset-0 w-full h-full opacity-0'
							style={{ zIndex: projects.length - i }}
							data-link
						/>
					))}
				</div>
				
				{projects.map((item, i) => (
					<div
						className='absolute w-full h-full'
						key={i}
						style={{ zIndex: projects.length - i }}
					>
						<div className='base-container h-full'>
							<div className='flex flex-col justify-center md:grid md:grid-cols-2 items-center h-full gap-5 md:gap-10 text-center'>

								<div
									data-texts
									className='relative z-3 overflow-hidden flex'
								>
									<p className='text-30 text-white md:max-w-[70%] md:text-left'>
										{item.textLeft}
									</p>
								</div>

								<div
									className='relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 overflow-hidden h-[50vh] max-w-[90%] w-auto aspect-square md:aspect-8/10 rounded-sm md:rounded-md mx-auto'
									data-thumbnail
								>
									<Image
										src={item.mainImage}
										alt={item.textLeft}
										fill
									/>
								</div>

								<div
									data-texts
									className='relative z-3 overflow-hidden flex md:justify-end'
								>
									<p className='text-30 text-white md:text-right md:max-w-[70%]'>
										{item.textRight}
									</p>
								</div>

							</div>
						</div>
					</div>
				))}
			</div>

		</section>
	)
}