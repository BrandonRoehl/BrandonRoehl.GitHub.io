import { Metadata } from 'next'
import { ReactNode } from 'react'
import Link from 'next/link'
import { Bleed } from 'nextra/components'


export const metadata: Metadata = {
    title: 'Resume'
}


const location: string = "/resume.pdf"
export default async function PostsPage() {
    return (
        <div data-pagefind-ignore="all">
            <h1>{metadata.title as ReactNode}</h1>
            <Bleed full>
                <object data={location} type="application/pdf" width="100%" height="600px">
                    <p>
                        Your browser does not support PDFs.
                        <Link href={location} target="_blank">
                            Download the PDF
                        </Link>.
                    </p>
                </object>
            </Bleed>
        </div>
    )
}
