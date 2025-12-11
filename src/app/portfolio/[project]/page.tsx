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
    
    console.log(project)

    function isMultiText(block: any) {
        return block.fieldGroupName === 'PortfolioFieldsMainContentMultitextLayout'
    }
    
    function isFullscreenMedia(block: any) {
        return block.fieldGroupName === 'PortfolioFieldsMainContentFsmediaLayout' && (block.fsmedia_image?.node?.mediaItemUrl || block.fsmedia_video?.node?.mediaItemUrl)
    }

    return (
        <main className='portfolio-internal-page'>

            <Banner
                image={project.portfolioFields.bgImage.node.mediaItemUrl}
                category={project.portfolioCategories.nodes[0]?.name}
                title={project.title}
                subtitle={project.portfolioFields.subtitle}
                text={project.portfolioFields.excerpt}
                client={project.portfolioFields.client}
                year={project.portfolioFields.year}
                area={project.portfolioFields.area}
            />

            <div className='bg-white pt-20 lg:pt-32 pb-px'>
                {project.portfolioFields.mainContent?.map((block: any, i: number) => {
                    if (isMultiText(block)) {
                        return (
                            <MultiText
                                key={i}
                                title={block.multitext_title}
                                subTitle={block.multitext_subtitle}
                            >
                                {block.multitext_content && (
                                    <div dangerouslySetInnerHTML={{ __html: block.multitext_content }} />
                                )}
                            </MultiText>
                        )
                    }

                    if (isFullscreenMedia(block)) {
                        return (
                            <FullscreenMedia
                                key={i}
                                image={block.fsmedia_image?.node?.mediaItemUrl ?? undefined}
                                video={block.fsmedia_video?.node?.mediaItemUrl ?? undefined}
                                alt={block.fsmedia_alt || ''}
                            />
                        )
                    }

                    return null
                })}
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