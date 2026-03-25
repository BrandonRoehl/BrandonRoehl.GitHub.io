import { getPosts } from '../posts/get-posts'
import { Feed } from 'feed';


export const dynamic = 'force-static';

const CONFIG = {
    title: "Roeh's blog",
    siteUrl: 'https://brandonroehl.org/',
    description: "Brandon Roehl's personal blog.",
    lang: 'en-us',
    author: {
        name: 'Brandon Roehl',
        email: 'me@brandonroehl.org',
        link: 'https://brandonroehl.org/',
    }
}

export async function GET() {
    const allPosts = await getPosts()
    const feed = new Feed({
        title: CONFIG.title,
        description: CONFIG.description,
        id: CONFIG.siteUrl,
        link: CONFIG.siteUrl,
        // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
        language: CONFIG.lang,
        image: CONFIG.siteUrl + 'icon.svg',
        favicon: CONFIG.siteUrl + 'icon.svg',
        copyright: `All rights reserved ${new Date().getFullYear()}, Brandon Roehl`,
        // optional, default = today
        updated: new Date(),
        // generator: 'https://github.com/jpmonette/feed',
        // feedLinks: {
        //     json: "https://example.com/json",
        //     atom: "https://example.com/atom",
        // },
        author: CONFIG.author,
    });
    for (const post of allPosts) {
        feed.addItem({
            title: `${post.title}`,
            id: post.name,
            link: CONFIG.siteUrl + post.route,
            description: post.frontMatter.description,
            author: post.frontMatter.author ? [{ name: post.frontMatter.author }] : undefined,
            date: new Date(post.frontMatter.date),
        });
    }

    return new Response(feed.rss2(), {
        headers: {
            'Content-Type': 'application/rss+xml'
        }
    })
}
