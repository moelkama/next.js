
export default function Home() {
  const n : number = Math.floor(Math.random() * 500);
  console.log(n);
  return (
    <h1>{n}</h1>
  );
}
