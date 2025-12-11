// libraries
import { notFound } from 'next/navigation'

// components
import Banner from '@/components/PortfolioBlocks/Banner'
import MultiText from '@/components/PortfolioBlocks/MultiText'
import FullscreenMedia from '@/components/PortfolioBlocks/FullscreenMedia'
import BigMedia from '@/components/PortfolioBlocks/BigMedia'
import DoubleSlider from '@/components/PortfolioBlocks/DoubleSlider'
import ExpandingGrid from '@/components/PortfolioBlocks/ExpandingGrid'
import TwoMedia from '@/components/PortfolioBlocks/TwoMedia'
import StoriesSlider from '@/components/PortfolioBlocks/StoriesSlider'
import NextProject from '@/components/PortfolioBlocks/NextProject'

// libs
import { getPortfolioBySlug } from '@/lib/wordpress/getPortfolioBySlug'
import { getPortfolioList } from '@/lib/wordpress/getPortfolio'

export default async function Project({
    params
}: {
    params: any
}) {

    const resolved = await params
    const slug = resolved.project

    const project = await getPortfolioBySlug(slug)

    if (!project) {
        notFound()
    }

    const allProjects = await getPortfolioList()
    const index = allProjects.findIndex(p => p.slug === slug)
    const next = index === -1 ? null : allProjects[(index + 1) % allProjects.length]

    const banner = {
        image: project.portfolioFields.bgImage.node.mediaItemUrl,
        category: project.portfolioCategories.nodes[0]?.name,
        title: project.title,
        subtitle: project.portfolioFields.subtitle,
        text: project.portfolioFields.excerpt,
        client: project.portfolioFields.client,
        year: project.portfolioFields.year,
        area: project.portfolioFields.area
    }

    return (
        <main className='portfolio-internal-page'>

            <Banner
                image={banner.image}
                category={banner.category}
                title={banner.title}
                subtitle={banner.subtitle}
                text={banner.text}
                client={banner.client}
                year={banner.year}
                area={banner.area}
            />

            <div className='bg-white pt-20 lg:pt-32 pb-px'>

                <MultiText
                    title='Multilog Intermodal onde a logística da América Latina se encontra'
                    subTitle='Introdução'
                >
                    <p>
                        Na participação da Multilog na Intermodal South America 2025, a Esfera atuou no desenvolvimento do estande, desde o conceito até a execução. Criamos um espaço funcional e impactante, que reforçou a presença da marca no setor logístico.<br /><br />

                        O resultado foi uma presença marcante, unindo sofisticação, praticidade e inovação — transformando a participação da Multilog em uma experiência memorável.
                    </p>
                </MultiText>

                <FullscreenMedia
                    //video='/img/portfolio/fs-video.mp4'
                    image='/img/portfolio/03.jpg'
                    alt='Multilog Intermodal 2025'
                />

                <MultiText
                    title='Gastronomia e Hospitalidade no Estande'
                    subTitle='Especial'
                >
                    <p>
                        Além do design e da experiência visual, o estande da Multilog na Intermodal South America 2025 contou com uma seleção especial de comidas e bebidas. A proposta foi oferecer momentos de acolhimento e bem-estar, criando um ambiente mais descontraído para networking e conversas de negócios.<br /><br />
                    
                        Drinks, cafés e petiscos cuidadosamente escolhidos ajudaram a valorizar a experiência dos visitantes, reforçando a hospitalidade da marca e tornando o estande um ponto de encontro agradável e memorável durante todo o evento.
                    </p>
                </MultiText>

                <BigMedia
                    video='/img/portfolio/fs-video.mp4'
                />

                <BigMedia
                    image='/img/portfolio/04.jpg'
                    alt='Multilog Intermodal 2025'
                />

                <BigMedia
                    image='/img/portfolio/05.jpg'
                    alt='Multilog Intermodal 2025'
                />

                <MultiText>
                    <p>
                        Em sua essência, o Agrinho é um projeto de interesse público, <b>sem fins comerciais</b>, que busca impactar positivamente estudantes, famílias e educadores da rede básica. Por meio de atividades como redações, desenhos e projetos educativos, o programa estimula a conscientização sobre a importância do agronegócio e valoriza práticas agrícolas sustentáveis, a preservação ambiental e o empreendedorismo social.<br /><br />

                        Em 2024, a edição trouxe como tema <b>“Do campo à cidade, colhendo oportunidades”</b>, convidando os participantes a refletirem sobre inovação, sustentabilidade e novas formas de empreender. Os pilares trabalhados foram:
                    </p>

                    <ul>
                        <li>Estímulo à inovação e criatividade</li>
                        <li>Fomento ao espírito empreendedor</li>
                        <li>Conscientização sobre sustentabilidade</li>
                        <li>Incentivo ao empreendedorismo social</li>
                    </ul>
                </MultiText>

                <DoubleSlider
                    top={[
                        {
                            image: '/img/portfolio/slide-01.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-02.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        }
                    ]}
                    bottom={[
                        {
                            image: '/img/portfolio/slide-05.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-06.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-07.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-08.jpg',
                            alt: 'Multilog Intermodal 2025'
                        }
                    ]}
                />

                <MultiText
                    title='Nossos eventos conectam pessoas, ideias e marcas.'
                    subTitle='Desafio sócioeducativo'
                >
                    <p>
                        Em sua essência, o Agrinho é um projeto de interesse público, <b>sem fins comerciais</b>, que busca impactar positivamente estudantes, famílias e educadores da rede básica. Por meio de atividades como redações, desenhos e projetos educativos, o programa estimula a conscientização sobre a importância do agronegócio e valoriza práticas agrícolas sustentáveis, a preservação ambiental e o empreendedorismo social.<br /><br />

                        Em 2024, a edição trouxe como tema <b>“Do campo à cidade, colhendo oportunidades”</b>, convidando os participantes a refletirem sobre inovação, sustentabilidade e novas formas de empreender. Os pilares trabalhados foram:
                    </p>
                </MultiText>

                <ExpandingGrid
                    media={[
                        {
                            image: '/img/portfolio/slide-02.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-01.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            video: '/img/portfolio/fs-video.mp4'
                        },
                        {
                            image: '/img/portfolio/slide-03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-05.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/slide-06.jpg',
                            alt: 'Multilog Intermodal 2025'
                        }
                    ]}
                />

                <BigMedia
                    image='/img/portfolio/04.jpg'
                    alt='Multilog Intermodal 2025'
                />

                <TwoMedia
                    media={[
                        {
                            image: '/img/portfolio/03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        }
                    ]}
                />

                <StoriesSlider
                    media={[
                        {
                            image: '/img/portfolio/03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/05.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/03.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/04.jpg',
                            alt: 'Multilog Intermodal 2025'
                        },
                        {
                            image: '/img/portfolio/05.jpg',
                            alt: 'Multilog Intermodal 2025'
                        }
                    ]}
                />

            </div>

            {next && (
                <NextProject
                    href={`/portfolio/${next.slug}`}
                    image={next.portfolioFields.thumbnail.node.mediaItemUrl}
                    title={next.title}
                />
            )}

        </main>
    )
}