const Loading = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizes[size]} border-4 border-slate-200 border-t-primary rounded-full animate-spin`} />
      {text && <p className="mt-4 text-slate-500 text-sm">{text}</p>}
    </div>
  );
};

export default Loading;
