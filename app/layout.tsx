import { Footer, Layout, Navbar } from 'nextra-theme-blog'
import { Search, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
import { Metadata } from 'next'
import { ThemeSwitch } from './theme-switch'

export const metadata: Metadata = {
    metadataBase: new URL('https://brandonroehl.org'),
    title: {
        default: 'Roehl',
        template: '%s - Roehl'
    },
    description: "Brandon Roehl's personal website and blog.",
    applicationName: 'Roehl',
    generator: 'Next.js',
    appleWebApp: {
        title: 'Roehl'
    },
    twitter: {
        site: 'https://brandonroehl.org'
    },
    // other: {
    //     'msapplication-TileImage': '/ms-icon-144x144.png',
    //     'msapplication-TileColor': '#fff'
    // },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // <Head backgroundColor={{ dark: '#0f172a', light: '#fefce8' }} />
    return (
        <html lang="en" suppressHydrationWarning>
            <Head />
            <body>
                <Layout>
                    <Navbar pageMap={await getPageMap()}>
                        <Search placeholder='Search site...' />
                        <ThemeSwitch />
                    </Navbar>

                    {children}

                    <Footer>
                        {new Date().getFullYear()} © Brandon Roehl.
                        <a href="/feed.xml" style={{ float: 'right' }}>
                            RSS
                        </a>
                    </Footer>
                </Layout>
            </body>
        </html>
    )
}
