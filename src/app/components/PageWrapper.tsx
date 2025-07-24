// components/PageWrapper.tsx
'use client'

type PageWrapperProps = {
  children: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    
      <div className="w-full">
        {children}
      </div>
    
  )
}