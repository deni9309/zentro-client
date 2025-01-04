/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [    
      {   
        hostname: process.env.PRODUCT_IMAGE_HOST,
      },
      {
        hostname: 'localhost',
      },
      {
        hostname: "zentro-products.s3.eu-central-1.amazonaws.com",
      }
    ]
  }
};

export default nextConfig;
