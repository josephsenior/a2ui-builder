'use client';

import { A2UIBuilder } from '@/components/workspace/A2UIBuilder';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-screen w-full">
            <A2UIBuilder />
            {/* 
          Children is kept here to follow Next.js conventions, 
          but A2UIBuilder is the main UI. 
      */}
            {children}
        </div>
    );
}
