/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    main:       'https://main.bgbot.app',
    auth:       'https://auth.bgbot.app',
    realestate: 'https://realestate.bgbot.app',
    customer: 'https://customer.bgbot.app',
    employee: 'https://employee.bgbot.app',

    interval:0,
  },
  images: {
    domains: ["drive.google.com"]
},


}

module.exports = nextConfig

// {process.env.customKey}
