// libraries
import { GraphQLClient, gql } from 'graphql-request'

// types
import { PortfolioItem } from './getPortfolio'

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
