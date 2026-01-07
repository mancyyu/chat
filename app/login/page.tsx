'use client';

import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 dark:bg-white rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white dark:text-gray-900" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
            AI Chat
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isLogin ? '欢迎回来' : '创建新账户'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-3xl p-8 shadow-xl shadow-gray-900/5 dark:shadow-gray-950/50">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              注册
            </button>
          </div>

          {/* Form */}
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          继续即表示您同意我们的{' '}
          <Link href="#" className="text-gray-900 dark:text-gray-100 hover:underline">
            服务条款
          </Link>{' '}
          和{' '}
          <Link href="#" className="text-gray-900 dark:text-gray-100 hover:underline">
            隐私政策
          </Link>
        </p>
      </div>
    </div>
  );
}

