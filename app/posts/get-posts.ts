import { Item, normalizePages } from 'nextra/normalize-pages'
import { getPageMap } from 'nextra/page-map'

export async function getPosts(): Promise<Item[]> {
    const { directories } = normalizePages({
        list: await getPageMap('/posts'),
        route: '/posts'
    })
    return directories
        .filter(post => post.name !== 'index')
        .sort(
            (a, b) => (
                new Date(b.frontMatter.date).getTime()
                - new Date(a.frontMatter.date).getTime()
            )
        )
}

export async function getTags(): Promise<string[]> {
    const posts = await getPosts()
    const tags = posts.flatMap(post => post.frontMatter.tags)
    return tags
}
