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

  @media (max-width: 600px) {
    padding: 1.5rem 0.5rem; /* menos espaço nas laterais */
  }

  @media (max-width: 400px) {
    padding: 1rem 0.25rem; /* quase toda a tela usada */
  }
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