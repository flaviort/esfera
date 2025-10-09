'use client'

// libraries
import clsx from 'clsx'
import { useState } from 'react'

// svg
import UxChevronDown from '@/assets/svg/ux/chevron-down.svg'

// css
import styles from './index.module.scss'

// interface
export interface AccordionProps {
	question: string
	answer: string
}

export default function Accordion({ question, answer }: AccordionProps) {
	const [isActive, setIsActive] = useState(false)

	const toggle = () => {
		setIsActive((prev) => !prev)
	}

	return (
		<div className={clsx(styles.component, isActive && styles.isActive)}>
			<button
				className={clsx(styles.question, 'text-24')}
				onClick={toggle}
			>
				<span className={styles.text}>
					{question}
				</span>

				<span className={styles.icon}>
					<UxChevronDown />
				</span>
			</button>

			<div className={styles.content}>
				<div>
					<div dangerouslySetInnerHTML={{ __html: answer }} />
				</div>
			</div>
		</div>
	)
}
