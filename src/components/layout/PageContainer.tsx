
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  withPadding?: boolean;
  withNavBar?: boolean;
}

const PageContainer = ({ 
  children, 
  withPadding = true, 
  withNavBar = true, 
  className, 
  ...props 
}: PageContainerProps) => {
  return (
    <div
      className={cn(
        "min-h-screen w-full mx-auto max-w-lg",
        withPadding && "px-4 py-6",
        withNavBar && "pb-24",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default PageContainer;
