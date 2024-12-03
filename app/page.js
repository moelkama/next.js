// import React from 'react';

// export const dynamic = 'force-static';
// export const revalidate = 20;

// async function getData() {
//   const id = Math.floor(Math.random() * 100);
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     next: { revalidate: 20 },
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return res.json();
// }

// import mongoose from 'mongoose';

// const client = new MongoClient("mongodb+srv://moh:XdYveZup1ziV0YKG@cluster0.ldqwo.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0");

// export const connectToDatabase = async () => {
//   // if (!client.isConnected()) {
//     console.log("hellow world");
//     await client.connect();
//     console.log("client connected successfully");
//   // }
//   // const db = client.db(process.env.MONGODB_DB);
//   // return { db, client };
// };

// export default async function ISRPage() {
//   // const data = await getData();???????????????????????????????????????????????????????????
//   return (
//     <div>
//     </div>
//   );
// }

export default async function handler() {
  // if (req.method === 'GET') {
    // const users = await prisma.user.findMany();
    // console.log(users);
  // } else if (req.method === 'POST') {
  //
  return (<h1 className="bg-yellow-500">hello world!</h1>)
}
