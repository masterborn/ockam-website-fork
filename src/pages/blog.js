import React from 'react';
import styled from "@emotion/styled";

import useAllBlogPosts from '../hooks/useAllBlogPosts';
import PostShort from '../components/blog/PostShort';
import Heading from '../components/Heading';
import defaultAvatar from '../content/blog/assets/default_avatar.png';
import FeaturePost from "../components/blog/FeaturePost";
import BlogContent from "../components/blog/BlogContent";

const Wrapper = styled('div')`
  margin-bottom: 18rem;
  margin-top: 7rem;
`;

const BlogFeatureArticleContent = styled(BlogContent)`
  background-color: ${props => props.theme.colors.accentBackground};
  padding-top:0;
`;

const BlogPostsContent = styled(BlogContent)`
  background-color: ${props => props.theme.colors.blogTextBackground};
`;

const mapBlogPostEdges = postsEdges => {
  return postsEdges.map(({ node }) => ({
    id: node.id,
    slug: node.fields.slug,
    title: node.fields.title,
    metaTitle: node.frontmatter.metaTitle,
    description: node.frontmatter.description,
    metaDescription: node.frontmatter.metaDescription,
    date: node.frontmatter.date,
    author: node.frontmatter.author,
    isFeature: node.frontmatter.isFeature,
    authorAvatar: node.frontmatter.authorAvatar ? node.frontmatter.authorAvatar.childImageSharp.fixed.src : defaultAvatar,
  }));
};

const Blog = () => {
  const allBlogPosts = useAllBlogPosts();

  const posts = mapBlogPostEdges(allBlogPosts.edges);
  const featurePosts = posts.filter(item => item.isFeature === true);

  return (
    <Wrapper>
      <BlogFeatureArticleContent>
        {featurePosts.map(featurePost => (
          <FeaturePost key={featurePost.id} post={featurePost} />
        ))}
      </BlogFeatureArticleContent>
      <BlogPostsContent>
        <Heading as='h1' mb={5}>All Posts</Heading>
        {posts.map(post => (
          <PostShort key={post.id} post={post} />
        ))}
      </BlogPostsContent>
    </Wrapper>
  );
};

export default Blog;
