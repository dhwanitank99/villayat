const Footer: React.FC = () => {
  return (
    <footer className='w-full flex px-20 py-6 flex justify-center'>
      <p className='font-medium text-gray-800 dark:text-white'>
        <span>
          {`© ${new Date().getFullYear()} `}
          <a
            href='https://ajackus.com/'
            target='_blank'
            className='text-cadet-blue items-center font-semibold tracking-wide hover:underline'>
            Ajackus
          </a>
          {'. All Rights Reserved.'}
        </span>
      </p>
    </footer>
  );
};

export default Footer;
