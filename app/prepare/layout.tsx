import { AuthGuard } from '@/modules/auth/interfaces/ui/components/AuthGuard';

export default function PrepareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}