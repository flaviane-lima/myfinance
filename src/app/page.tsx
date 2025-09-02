'use client'

import styled from "styled-components"
import Link from 'next/link'
import SectionHeader from "./components/SectionHeader";
import PageWrapper from "./components/PageWrapper";
import Header from "./components/Header";


// ✨ NOVO WRAPPER EXCLUSIVO COM FUNDO CINZA CLARO
const BackgroundWrapper = styled.div`
 background-color: #f3f4f6;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #374151;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #059669;
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.75rem;
  }
`;

export default function Page() {

  return (
    <BackgroundWrapper>
      <PageWrapper>
        <Header />
        <section>
          <SectionHeader>Bem vindo ao seu gerenciador financeiro!</SectionHeader>
        </section>
        <nav style={{ display: 'flex', justifyContent: 'center' }}>
          <StyledLink href="/dashboard/expenseList">Entrar</StyledLink>
        </nav>
      </PageWrapper>
    </BackgroundWrapper>
  );

}

