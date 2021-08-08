import { GetStaticProps } from 'next'
import Head from 'next/head'
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../../services/prismic'
import styles from './style.module.scss'
import { RichText } from 'prismic-dom'


type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

type PostsProps = {
    posts: Post[]
}


export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>Posts | Ignews</Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <a key={post.slug} href='#'>
                        <time>{post.updatedAt}</time>
                        <strong>{post.title}</strong>
                        <p>{post.excerpt}</p>
                    </a>
                    ))}
                </div>
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query(
        [Prismic.Predicates.at('document.type', 'post')],
        {
            fetch: ['post.title', 'post.content'],
            pageSize: 100,
        }
    )

    // console.log(JSON.stringify(response, null, 2))

    const posts = response.results.map( post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('en-UK', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return {
        props: { posts }
    }
}