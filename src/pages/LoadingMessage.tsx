// components/LoadingScreen.tsx
import Navigation from '@/components/Navigation';

const LoadingScreen = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <>
      <Navigation />
      <div className="flex items-center justify-center h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">{message}</p>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;