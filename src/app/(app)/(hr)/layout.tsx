"use client"
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Create QueryClient instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-row min-h-full">
        <Toaster />
        {/* <SideBarMenu /> */}
        <main className="flex-1">{children}</main>
      </div>
    </QueryClientProvider>
  );
}
