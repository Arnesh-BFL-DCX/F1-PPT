import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@f1-ppt/slides-core'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: false,
  },
};

export default nextConfig;
