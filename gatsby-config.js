require('events').defaultMaxListeners = 20;

module.exports = {
    siteMetadata: {
        title: `ZyphenSVC`,
        description: `I am a 20 year old security researcher studying mathematics and computer science.`,
        social: {
            twitter: `ZyphenSVC`,
        },
        author: {
            name: `ZyphenSVC`,
        },
        siteUrl: `https://zyphensvc.com`, // Do not put trailing slash
        image: `https://zyphensvc.com/media/profilepic.png`,
    },
    plugins: [
        {
            resolve: `gatsby-plugin-page-creator`,
            options: {
                path: `${__dirname}/src/pages`
            }
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-remove-trailing-slashes`,
        `gatsby-plugin-slug`,
        'gatsby-transformer-sharp',
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
              siteUrl: `https://zyphensvc.com`,
              stripQueryString: true,
            }
        },
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            linkImagesToOriginal: false,
                            maxWidth: 900,
                        },
                    },
                    {
                        resolve: `gatsby-remark-responsive-iframe`,
                        options: {
                            wrapperStyle: `margin-bottom: 1.0725rem`,
                        },
                    },
                    {
                        resolve: `gatsby-remark-smartypants`,
                        options: {
                            ellipses: false,
                            quotes: false,
                        }
                    },
                    `gatsby-remark-prismjs`,
                    `gatsby-remark-copy-linked-files`,
                    'gatsby-remark-katex'
                ],
                remarkPlugins: [require(`remark-math`)],
            },
        },
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                defaults: {
                    placeholder: `none`,
                    quality: 100
                }
            }
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                output: `sitemap`,
                excludes: ['/wp-admin', '/**/*.html']
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/content/posts`,
                name: `posts`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `img`,
                path: `${__dirname}/src/img`,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                    {
                        site {
                            siteMetadata {
                                title
                                description
                                siteUrl
                                site_url: siteUrl
                            }
                        }
                    }
                `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) => {
                            return allMdx.edges.map(edge => {
                                return Object.assign({}, edge.node.frontmatter, {
                                    description: edge.node.frontmatter.description || edge.node.excerpt,
                                    date: edge.node.frontmatter.date,
                                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                                    custom_elements: [{ "content:encoded": edge.node.html }],
                                })
                            })
                        },
                    query: `
                        {
                            allMdx(
                                sort: { order: DESC, fields: [frontmatter___date] },
                            ) {
                                edges {
                                    node {
                                        excerpt
                                        html
                                        body
                                        fields {
                                            slug
                                        }
                                        frontmatter {
                                            title
                                            date
                                            description
                                            image
                                        }
                                    }
                                }
                            }
                        }
                    `,
                        output: "/rss.xml",
                        title: "ZyphenSVC.com Posts",
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-netlify',
            options: {
                headers: {
                    '/fonts/*': [
                        'Cache-Control: public',
                        'Cache-Control: max-age=365000000',
                        'Cache-Control: immutable',
                    ],
                },
            },
        },
        {
            resolve: `gatsby-plugin-use-dark-mode`,
            options: {
                classNameDark: `dark-mode`,
                classNameLight: `light-mode`,
                minify: true,
            }
        },
    ],
}
