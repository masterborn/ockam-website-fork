import { useStaticQuery, graphql } from 'gatsby';

const useAllBlogPosts = () => {
  const { allMdx } = useStaticQuery(graphql`
    query allBlogPostsQuery {
      allMdx(filter: {fields: {slug: {regex: "/^/blog/.+/"}}}, sort: {order: DESC, fields: frontmatter___date}) {
        edges {
          node {
            id
            excerpt
            fields {
              slug
              title
            }
            frontmatter {
              metaTitle
              metaDescription
              description
              date(fromNow: true)
              author
              isFeature
              authorAvatar {
                childImageSharp {
                  fixed(width: 80) {
                    base64
                    tracedSVG
                    aspectRatio
                    width
                    height
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    originalName
                  }
                }
              }
            }
          }
        }
      }
    }

  `);
  return allMdx;
};

export default useAllBlogPosts;
