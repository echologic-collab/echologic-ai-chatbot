import { Link } from '@tanstack/react-router';
import { MessageSquare } from 'lucide-react';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-black text-white dark:bg-white dark:text-black mb-4 shadow-lg">
                <MessageSquare className="w-6 h-6" />
            </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {subtitle}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
          {children}
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          {footerText}{' '}
          <Link
            to={footerLinkTo}
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-all"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};
