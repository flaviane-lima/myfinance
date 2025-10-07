'use client'

import ExpenseList from "../../components/ExpenseList";
import styled from "styled-components";
import Link from 'next/link';

import { FaHome } from 'react-icons/fa';

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background-color: #374151;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
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

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background-color: #f9fafb;
  padding: 1rem;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
`;



const PageContainer = styled.div`
  background-color: #f9fafb; // ✅ Cinza bem clarinho
  min-height: 100vh; // ✅ Garante que ocupa toda a altura da tela
  padding: 1rem 0; // ✅ Adiciona um pouco de espaço vertical
`

export default function List() {

    return(
        <PageContainer>
            <nav style={{ display: 'flex', justifyContent: 'flex-start', padding: '0 1rem', marginBottom: '1rem' }}>
        <NavBar>
        <StyledLink href="/">
           <FaHome style={{marginRight: '8px'}} />
           Início
        </StyledLink>
        </NavBar>
      </nav>
            <ExpenseList />
        </PageContainer>    
        
    )
}
