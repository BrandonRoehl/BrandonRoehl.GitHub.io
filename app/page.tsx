import { Metadata } from 'next'
import { Cards, ImageZoom } from 'nextra/components'
import { MarkGithubIcon, NoteIcon } from '@primer/octicons-react'


export const metadata: Metadata = {
    title: 'Home'
}

export default async function PostsPage() {
    return (
        <>
            <h1>Roehl</h1>
            <ImageZoom src="/colosseum.jpeg" alt="Colosseum selfi" />
            <p>
                Read more
            </p>
            <Cards>
                <Cards.Card
                    icon={<MarkGithubIcon size={24} />}
                    title="Github"
                    href="https://github.com/BrandonRoehl"
                    arrow
                />
                <Cards.Card
                    icon={<NoteIcon size={24} />}
                    title="Blog"
                    href="/posts"
                />
            </Cards>
        </>
    )
}
