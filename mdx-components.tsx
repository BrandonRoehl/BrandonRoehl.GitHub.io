import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'
import type { MDXComponents } from 'nextra/mdx-components'

const blogComponents = getBlogMDXComponents({
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
        <h1
            style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundImage: 'linear-gradient(90deg,#7928CA,#FF0080)'
            }}
        >
            {children}
        </h1>
    ),
    DateFormatter: ({ date }) =>
        `Last updated at ${date.toLocaleDateString('en', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })}`,
} satisfies MDXComponents)

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...blogComponents,
        ...components
    }
}

