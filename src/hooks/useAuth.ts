'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/lib/api/auth';
import { LoginRequest, RegisterRequest } from '@/types';

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, setUser, setTokens, logout, initAuth } = useAuthStore();

  useEffect(() => { initAuth(); }, []);

  const login = async (data: LoginRequest) => {
    const result = await authApi.login(data);
    setTokens(result.tokens.accessToken, result.tokens.refreshToken);
    setUser(result.user);
    if (typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  };

  const register = async (data: RegisterRequest) => {
    const result = await authApi.register(data);
    setTokens(result.tokens.accessToken, result.tokens.refreshToken);
    setUser(result.user);
    if (typeof window !== 'undefined') localStorage.setItem('user', JSON.stringify(result.user));
    return result.user;
  };

  const handleLogout = async () => {
    await authApi.logout().catch(() => {});
    logout();
  };

  return { user, isAuthenticated, isLoading, login, register, logout: handleLogout };
};
