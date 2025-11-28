// libraries
import clsx from 'clsx'
import Link from 'next/link'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// images
import banner from '@/assets/img/banners/lab.jpg'
import headquarter from '@/assets/img/banners/headquarters.jpg'

// utils
import { pages } from '@/utils/routes'

export const metadata = {
	title: 'Error 404 | Agência Esfera'
}

export default function Error404() {
	return (
		<main>

			Oppz! Error 404

			<section className=''>
				<div className='container'>
					<div className='row'>
						
						<div className='col-md-6'>

							<h2 className=''>
								Opa! Esta página está sentindo mal.
							</h2>

							<p>
								<b>Parece que o link que você seguiu não está em nossa fórmula.</b> Mas não se preocupe. Temos a receita certa para você voltar ao caminho certo! <br /><br />

								Ou sinta-se à vontade para <Link href={pages.contact} className='hover-underline'><b>entrar em contato</b></Link>.
							</p>

							<MagneticButton>
								<Link href={pages.home} className='button button--black'>
									Voltar para a Home
								</Link>
							</MagneticButton>

						</div>

						<div className='col-md-6'>
							
						</div>

					</div>
				</div>
			</section>

		</main>
	)
}
