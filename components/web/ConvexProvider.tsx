// components/web/ConvexProviderWithAuth.tsx
import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";
import { getToken } from "@/lib/auth-server";

export async function ConvexProviderWithAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();
  return (
    <ConvexClientProvider initialToken={token}>{children}</ConvexClientProvider>
  );
}
