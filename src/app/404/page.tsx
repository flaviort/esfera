// libraries
import clsx from 'clsx'
import Link from 'next/link'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// css
import styles from './index.module.scss'

// images
import banner from '@/assets/img/banners/lab.jpg'
import headquarter from '@/assets/img/banners/headquarters.jpg'

// utils
import { pages } from '@/utils/routes'

export const metadata = {
	title: 'Error 404 | PureKana'
}

export default function Error404() {
	return (
		<main className={styles.page}>

			Oppz! Error 404

			<section className='pb-small pb-md-big'>
				<div className='container'>
					<div className='row'>
						
						<div className={clsx(styles.flex, 'col-md-6 pt-md-medium pb-smaller pb-md-1')}>

							<h2 className='text-40 medium'>
								Uh-oh! This page is feeling under the weather.
							</h2>

							<p>
								<b>Looks like the link you followed isn’t in our formula.</b> But don’t worry. We’ve got the right prescription to get you back on track! <br /><br />

								Or feel free to <Link href={pages.contact} className='hover-underline'><b>contact us</b></Link>.
							</p>

							<MagneticButton>
								<Link href={pages.home} className='button button--black'>
									Back to Home
								</Link>
							</MagneticButton>

						</div>

						<div className={clsx(styles.image, 'col-md-6')}>
							
						</div>

					</div>
				</div>
			</section>

		</main>
	)
}
