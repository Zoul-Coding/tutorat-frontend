import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div className='min-h-screen w-full  flex flex-col px-4 gap-6 justify-center items-center'>
      <h1 className='font-black text-7xl text-marronFonce'>404!</h1>
      <h4 className='text-xl'>Il n'y a rien ici {':('}</h4>
      <p>
        Retourner à{' '}
        <Link to='/' className='text-marronFonce underline'>
          l'accueil
        </Link>
      </p>
    </div>
  );
};

export default Notfound;
