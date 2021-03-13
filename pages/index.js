import Link from 'next/link';

export default function home() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/post/david">post</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/coba">coba</Link>
          </li>
        </ul>
      </nav>
      <h1>Home Page</h1>
      <h1>Custom Server Express</h1>
      <p>We add Express to out project then create file server.js</p>
    </div>
  );
}
