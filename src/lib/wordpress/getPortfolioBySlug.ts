// libraries
import { GraphQLClient, gql } from 'graphql-request'

// types
export type PortfolioImage = {
    node: {
        srcSet: string
        sizes: string
        mediaItemUrl: string
    }
}

export type PortfolioCategory = {
    nodes: {
        name: string
    }[]
}

export type PortfolioItem = {
    id: string
    title: string
    slug: string
    date: string
    portfolioFields: {
        area: string
        client: string
        excerpt: string
        subtitle: string
        year: string
        thumbnail: PortfolioImage
        bgImage: PortfolioImage
        mainContent?: Array<{
            fieldGroupName?: string
            
            multitext_content?: string
            multitext_title?: string
            multitext_subtitle?: string
            
            fsmedia_alt?: string
            fsmedia_image?: {
                node: {
                    srcSet: string
                    sizes: string
                    mediaItemUrl: string
                }
            }
            fsmedia_video?: {
                node: {
                    mediaItemUrl: string
                }
            }

        }>
    }
    portfolioCategories: PortfolioCategory
}

// constants
const endpoint = process.env.WP_GRAPHQL as string

// client
const client = new GraphQLClient(endpoint)

// graphql query
const query = gql`
    query GetPortfolioBySlug($slug: String!) {
        portfolioBy(slug: $slug) {
            id
            title
            slug
            date
            portfolioFields {
                area
                client
                excerpt
                subtitle
                year
                thumbnail {
                    node {
                        sizes
                        mediaItemUrl
                    }
                }
                bgImage {
                    node {
                        sizes
                        mediaItemUrl
                    }
                }
                mainContent {
                    ... on PortfolioFieldsMainContentMultitextLayout {
                        fieldGroupName
                        multitext_title
                        multitext_subtitle
                        multitext_content
                    }
                    ... on PortfolioFieldsMainContentFsmediaLayout {
                        fieldGroupName
                        fsmedia_alt
                        fsmedia_image {
                            node {
                                srcSet
                                sizes
                                mediaItemUrl
                            }
                        }
                        fsmedia_video {
                            node {
                                mediaItemUrl
                            }
                        }
                    }
                }
            }
            portfolioCategories {
                nodes {
                    name
                }
            }
        }
    }
`

// fetch function
export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
    const data = await client.request(query, { slug })
    return data.portfolioBy ?? null
}
