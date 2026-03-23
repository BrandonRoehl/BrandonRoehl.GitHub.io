import { PostCard } from 'nextra-theme-blog'
import { getPosts, getTags } from '../../posts/get-posts'

type Props = {
    params: Promise<{ tag: string }>
}

export async function generateMetadata(props: Props): Promise<{ title: string }> {
    const params = await props.params
    return {
        title: `Posts Tagged with “${decodeURIComponent(params.tag)}”`
    }
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
    const allTags = await getTags()
    return [...new Set(allTags)].map(tag => ({ tag }))
}

export default async function TagPage(props: Props) {
    const params = await props.params
    const { title } = await generateMetadata(props)
    const posts = await getPosts()
    return (
        <>
            <h1>{title}</h1>
            {posts
                .filter(post =>
                    post.frontMatter.tags.includes(decodeURIComponent(params.tag))
                )
                .map(post => (
                    <PostCard key={post.route} post={post} />
                ))}
        </>
    )
}
