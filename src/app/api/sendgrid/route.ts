import mail from '@sendgrid/mail'

if (!process.env.SG_KEY) {
	throw new Error('SG_KEY is not defined')
}

mail.setApiKey(process.env.SG_KEY)

const getDestinationEmail = (): string => {
	return 'flavioczuk@gmail.com'
}

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const sentFrom = (body['Enviado de'] as string) ?? 'Formulário de Contato'
		const destinationEmail = getDestinationEmail()
		const keyValuePairs = Object.entries(body)

		if (!body.Email) {
			return new Response(
				JSON.stringify({
					status: 'error',
					error: 'Email é obrigatório',
				}),
				{
					status: 500,
					headers: {
						'Content-Type': 'application/json',
					}
				}
			)
		}

		const formattedData = keyValuePairs
			.map(
				([key, value]) => `
					<tr style='vertical-align: top;'>
						<td style='padding: 10px; border: 1px solid #ccc; background-color: #f2f2f2; font-size: 14px; line-height: 1.25; color: #030304;'>
							<strong>${key}:</strong>
						</td>
						<td style='padding: 10px; border: 1px solid #ccc; font-size: 14px; line-height: 1.25; color: #030304;'>
							${value}
						</td>
					</tr>
				`
			)
			.join('')

		const message = `
            <div style='background-color: #E4DCD1; padding: 50px 20px; font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Fira Sans', Ubuntu, Oxygen, 'Oxygen Sans', Cantarell, 'Droid Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Lucida Grande', Helvetica, Arial, sans-serif;'>
                <div style='display: block; margin: auto; background-color: #fff; padding: 40px; width: 520px; max-width: 520px'>

                    <p style='font-size: 18px; color: #030304;'>
                        <strong>Esfera</strong>
                    </p>

                    <hr><br />

                    <table style='border-collapse: collapse; border: 0; width: 100%;' cellspacing='0' cellpadding='0'>
                        <tbody>
							${formattedData}
						</tbody>
                    </table>

                </div>
            </div>
		`

		await mail.send({
			to: destinationEmail,
			from: body.Email,
			subject: `${sentFrom}: ${body.Subject ?? 'Sem Assunto'}`,
			text: message,
			html: message
		})

		return new Response(
			JSON.stringify({
				status: 'success'
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	} catch (error) {
		console.error('Error sending message:', error)

		return new Response(
			JSON.stringify({
				status: 'error',
				error: (error as Error).message
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	}
}