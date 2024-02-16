/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chinatoday-strapi.fra1.digitaloceanspaces.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/adminhih',
        destination:
          'https://chinatoday-strapi-cusbi.ondigitalocean.app/admin/',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
