import { useAuth } from '../UseAuth/useAuth'; // adjust import path

const useRole = () => {
  const { user } = useAuth();
  const role = user?.role || 'user'; // default to 'user' if no role

  const isAdmin = () => role === 'admin';
  const isMember = () => role === 'member';
  const isUser = () => role === 'user';

  // You can add helper to check multiple roles at once
  const hasRole = (...roles) => roles.includes(role);

  return { role, isAdmin, isMember, isUser, hasRole };
};

export default useRole;