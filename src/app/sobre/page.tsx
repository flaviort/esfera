// components
import AnimatedTitle from '@/components/Utils/Animations/AnimatedTitle'
import Banner from './Banner'
import MultiText from '@/components/PortfolioBlocks/MultiText'
import TextReveal from '@/components/Utils/Animations/TextReveal'
import Services from './Services'
import BigNumbers from '@/components/BigNumbers'
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Testimonials from './Testimonials'
import Awards from './Awards'
import Social from './Social'

export const metadata = {
	title: 'Sobre a Esfera',
	description: 'Conheça a Agência Esfera, uma agência de marketing digital que transforma ideias em resultados.',
	canonical: '/sobre'
}

export default function About() {
    return (
        <main>

            <Banner
                image='/img/team.jpg'
                subtitle='Sobre'
                title='Somos uma agência de eventos corporativos'
            >
                <p className='text-20 leading-loose! text-white'>
                    Trabalhamos com <b>energia, paixão e respeito,</b> e acreditamos que transparência e confiança são a base para construir boas parcerias. 
                </p>
            </Banner>

            <MultiText
                title='Nossos eventos conectam pessoas, idéias e marcas'
                subTitle='Quem somos'
                className='pt-16 sm:pt-28 lg:pt-32'
            >
                <p className=''>
                    Com serviços integrados de ponta a ponta, a gente gera valor com inteligência e entrega uma experiência sempre completa. <br /><br />
                    
                    <b>E então, vamos criar uma nova história juntos?</b>
                </p>
            </MultiText>

            <Services />

            <section className='overflow-hidden bg-white mb-16 sm:mb-28 lg:mb-32'>

                <div className='bg-black absolute z-0 top-0 left-0 w-full h-[75%]' />

                <div className='base-container relative z-2'>

                </div>

            </section>

            <MultiText className='mb-10!'>
                <p className='text-20 leading-relaxed!'>
                    Nossa missão é criar experiências inovadoras que fortalecem e impulsionam o sucesso dos clientes com:
                </p>
            </MultiText>

            <MultiText
                title='Integridade Criatividade e Responsabilidade'
                className='[&_h2]:leading-tight!'
            />

            <BigNumbers
                title='Na Esfera acontece'
                text='E somamos mais alguns números também...'
            />

            <section className='py-15 sm:py-20 md:py-25 xl:py-30'>
                <div className='base-container'>
                    
                    <h2 className='font-heading uppercase text-100 font-semibold tracking-tighter block mb-6 md:mb-10'>
                        <AnimatedText text='Nossos parceiros' />
                    </h2>

                </div>
            </section>

            <Testimonials />

            <Awards />

            <Social />

        </main>
    )
}