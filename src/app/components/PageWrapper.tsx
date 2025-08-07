// components/PageWrapper.tsx
'use client'

import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
  box-sizing: border-box;
  box-sizing: border-box;
`;



type PageWrapperProps = {
  children: React.ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <Wrapper>
      {children}
    </Wrapper>
    
  )
}