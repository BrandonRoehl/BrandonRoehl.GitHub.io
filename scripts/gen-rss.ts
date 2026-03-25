import { normalizePages } from 'nextra/normalize-pages'
import fs from 'fs'
import { getPageMap } from 'nextra/page-map'

const CONFIG = {
    title: 'My Blog',
    siteUrl: 'https://your-domain.com',
    description: 'Latest blog posts',
    lang: 'en-us',
    folder: '/posts'
}


// import fg from 'fast-glob'
// import { convertToPageMap } from 'nextra/page-map'
// import { PageMapItem } from 'nextra'


//
// async function importPageMap(route: string) {
//     const result = await fg(`"app/${route}/**/page.{js,jsx,jsx,tsx,md,mdx}`)
//     const filePaths = result.sort((a, b) => a.localeCompare(b))
//     return convertToPageMap({
//         filePaths,
//         locale: CONFIG.lang
//     })
// }
//
// async function getPageMap(route: string): Promise<PageMapItem[]> {
//     const { pageMap, mdxPages } = await importPageMap(route);
//     const folder = pageMap.find(
//         (item) => "name" in item && item.route === CONFIG.folder
//     );
//     if (!folder || 'children' in folder == false) {
//         throw new Error(`Can't find pageMap for "${CONFIG.folder}" in route "${route}"`);
//     }
//
//     return folder.children;
// }

export async function getPosts() {
    const { directories } = normalizePages({
        list: await getPageMap(CONFIG.folder),
        route: CONFIG.folder
    })
    console.log(directories)
    return directories
        .filter(post => post.name !== 'index')
        .sort(
            (a, b) => (
                new Date(b.frontMatter.date).getTime()
                - new Date(a.frontMatter.date).getTime()
            )
        )
}

async function PostsRSS() {
    const allPosts = await getPosts()
    const posts = allPosts
        .map(
            post => `    <item>
        <title>${post.title}</title>
        <description>${post.frontMatter.description}</description>
        <link>${CONFIG.siteUrl}${post.route}</link>
        <pubDate>${new Date(post.frontMatter.date).toUTCString()}</pubDate>
    </item>`
        )
        .join('\n')
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${CONFIG.title}</title>
    <link>${CONFIG.siteUrl}</link>
    <description>${CONFIG.description}</description>
    <language>${CONFIG.lang}</language>
${posts}
  </channel>
</rss>`

    return xml
}

const rss = await PostsRSS()
fs.writeFileSync('./out/rss.xml', rss)
