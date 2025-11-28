// libraries
import clsx from 'clsx'
import Link from 'next/link'

// components
import { Form, Input, InputHidden, Submit, Textarea, Select, Checkbox } from '@/components/Form'

// svg
import UxPhone from '@/assets/svg/ux/phone.svg'
import UxEmail from '@/assets/svg/ux/envelope.svg'

// utils
import { phone, email } from '@/utils/functions'
import { pages } from '@/utils/routes'

export const metadata = {
	title: 'Contato Agência Esfera: Endereço | Telefone | Email | Redes Sociais',
	description: 'Contate a Agência Esfera',
	canonical: '/contato'
}

export default function Contact() {
	return (
		<main>

			<p>
				Banner goes here
			</p>

		</main>
	)
}
