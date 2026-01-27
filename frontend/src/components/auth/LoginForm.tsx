import { useRouter } from '@tanstack/react-router';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { authClient } from '../../lib/auth-client';
import { useAuth } from '../../context/AuthContext';
import { AuthLayout } from './AuthLayout';

export const LoginForm = () => {
  const router = useRouter();
  const { refreshSession } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || 'Failed to sign in');
      } else {
        await refreshSession();
        router.navigate({ to: '/chat' });
      }
    } catch (err: any) {
        console.error(err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkTo="/signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/20">
                {error}
            </div>
        )}
        
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:bg-zinc-950 dark:text-white"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:bg-zinc-950 dark:text-white"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </AuthLayout>
  );
};
