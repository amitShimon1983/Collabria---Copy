import { useLocation, Navigate } from 'react-router-dom';

const RequireAuth = ({
  children,
  isAuthenticated,
  baseUrl,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
  baseUrl: string;
}) => {
  const location = useLocation();
  return <>{children}</>;
};

export default RequireAuth;
