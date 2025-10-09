// libraries
import clsx from 'clsx'
import Image from 'next/image'

// components
import Portfolio from '@/components/Portfolio'

// images
import dog_couch from '@/assets/img/dog-couch.jpg'

// utils
import { pages } from '@/utils/routes'

// css
import styles from './index.module.scss'

export default function Home() {
	return (
		<main className={styles.page}>

			<section className={clsx(styles.banner)}>
				<div className='container'>

				</div>
			</section>

			<div style={{ height: '100vh' }} />

			<Portfolio />

		</main>
	)
}
