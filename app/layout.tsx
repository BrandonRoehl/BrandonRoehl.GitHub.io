import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog Example'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    // <Head backgroundColor={{ dark: '#0f172a', light: '#fefce8' }} />
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Layout>
                    <Navbar pageMap={await getPageMap()}>
                        <Search />
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
