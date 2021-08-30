import Head from 'next/head';
import { useRouter } from 'next/router';

export default function FourOhFour() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Tacnique | 404</title>
      </Head>
      <div className='min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative'>
        <div className='flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left'>
          <div className='w-full md:w-1/2'>
            <div className='mb-10 md:mb-20 text-gray-600 font-light'>
              <h1 className='font-black uppercase text-3xl lg:text-5xl text-cadet-blue mb-10'>
                You seem to be lost!
              </h1>
              <p>The page you're looking for isn't available.</p>
              <p>
                Try searching again or use the <b>Go Back</b> button below.
              </p>
            </div>
            <div className='mb-20 md:mb-0'>
              <button
                onClick={() => router.back()}
                className='px-4 py-2 rounded-lg text-cadet-blue text-lg font-semibold hover:bg-gray-200 outline-none focus:outline-none transform transition-all'>
                Go Back
              </button>
              <button
                onClick={() => router.push('/')}
                className='px-4 py-2 rounded-lg text-cadet-blue text-lg font-semibold hover:bg-gray-200 outline-none focus:outline-none transform transition-all'>
                Go to Home Page
              </button>
            </div>
          </div>
        </div>
        <div className='w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform'></div>
        <div className='w-96 h-full bg-cadet-blue bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform'></div>
      </div>
    </>
  );
}
