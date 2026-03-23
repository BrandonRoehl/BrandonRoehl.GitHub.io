import nextra from 'nextra'
import NextConfig from "next";

// Set up Nextra with its configuration
const withNextra = nextra({
    // ... Add Nextra-specific options here
    defaultShowCopyCode: true,
    readingTime: true
})

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    cleanDistDir: true,
    output: 'export',
    images: {
        unoptimized: true // mandatory, otherwise won't export
    },
    turbopack: {
        resolveAlias: {
            // Path to your `mdx-components` file with extension
            'next-mdx-import-source-file': './mdx-components.tsx'
        }
    }
};

export default withNextra(nextConfig)

