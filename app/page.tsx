import React from 'react';

export const dynamic = 'force-static'; // Ensures static generation (optional, defaults to static)
export const revalidate = 60; // Revalidate the page every 60 seconds

async function getData() {
  const id = Math.floor(Math.random() * 100);
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function ISRPage() {
  const data = await getData();

  return (
    <div>
      <h1>Incremental Static Regeneration</h1>
      <h1>{data.title}</h1>
    </div>
  );
}
