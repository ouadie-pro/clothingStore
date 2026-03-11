import { FaExclamationCircle, FaRedo } from 'react-icons/fa';
import Button from './Button';

const Error = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <FaExclamationCircle className="text-5xl text-red-400 mb-4" />
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-slate-500 mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="flex items-center gap-2">
          <FaRedo />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;
