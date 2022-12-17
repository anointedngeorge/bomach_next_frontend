/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    main:       'http://127.0.0.1:8082',
    auth:       'http://127.0.0.1:8083',
    realestate: 'http://127.0.0.1:8084',
    customer: 'http://127.0.0.1:8086',
    employee: 'http://127.0.0.1:8087',
    'test_estate':'http://127.0.0.1:8084'
  },
  // "rules": {
  //   "react/no-unescaped-entities": "off",
  //   "@next/next/no-page-custom-font": "off"
  // },
  images: {
    domains: ["drive.google.com"]
},
}

module.exports = nextConfig

// {process.env.customKey}