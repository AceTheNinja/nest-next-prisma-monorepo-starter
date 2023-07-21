export default function HomePage() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <h1 className='mt-4'>Next.js + Nest.js + Prisma Starter</h1>
          <p className='mt-2 text-sm text-gray-800'>
            A starter for Next.js, Nest.js, Tailwind CSS, Prisma and TypeScript <br />with Authentication (next-auth) in a monorepo.
          </p>
          <p className='mt-2 text-sm text-gray-700'>
            <a className="underline" href='https://github.com/AceTheNinja/next-nest-prisma-starter'>
              See the repository
            </a>
          </p>

          <footer className='absolute bottom-2 text-sm text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <a href='https://twitter.com/asyncninja'>
              Tapan Rai
            </a>
          </footer>
        </div>
      </section>
    </main>
  );
}