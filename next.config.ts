import type { NextConfig } from "next"; // NextConfig টাইপ আনছি, যাতে কনফিগে ভুল করলে TypeScript ধরিয়ে দেয়

const nextConfig: NextConfig = { // কনফিগ অবজেক্ট শুরু, Next.js এখান থেকেই সেটিংস পড়ে
  reactCompiler: true, // আপনার আগের সেটিং, তাই আগের মতোই রাখলাম
  images: { // next/image কম্পোনেন্টের সেটিং শুরু
    remotePatterns: [ // কোন কোন বাইরের সাইট থেকে ছবি লোড হবে তার তালিকা
      { // একটি অনুমোদিত সাইটের এন্ট্রি শুরু
        protocol: "https", // ছবির লিংক https হলে তবেই অনুমতি, নিরাপত্তার জন্য
        hostname: "img.magnific.com", // error-এ যে hostname এসেছে হুবহু সেটাই দিচ্ছি, নইলে Next.js ব্লক করে
      }, // এন্ট্রি শেষ
      { // দ্বিতীয় এন্ট্রি, আগের ImgBB ছবিগুলোও যেন চলে
        protocol: "https", // এখানেও https বাধ্যতামূলক রাখছি
        hostname: "i.ibb.co", // ImgBB-এর সঠিক hostname, আগের ভুল i.ibb.co.com ঠিক করে দিলাম
      }, // এন্ট্রি শেষ
    ], // তালিকা শেষ
  }, // images সেটিং শেষ
}; // কনফিগ অবজেক্ট শেষ

export default nextConfig; // Next.js যেন কনফিগটা খুঁজে পায় তাই export করছি