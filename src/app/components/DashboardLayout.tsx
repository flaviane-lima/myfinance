'use client'

import styled from 'styled-components'
import HomeButton from './HomeButton/HomeButton'
import TopMenu from './Menu/TopMenu'
import { ReactNode } from 'react'

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  z-index: 10;
  display: flex;
  justify-content: space-between; // 👈 separa os dois lados
  align-items: center;
  border-bottom: 1px solid #e5e7eb; // ✅ Borda inferior adicionada aqui

  
`;



const PageContainer = styled.div`
  background-color: #f9fafb; // ✅ Cinza bem clarinho
  min-height: 100vh; // ✅ Garante que ocupa toda a altura da tela
  padding: 1rem 0; // ✅ Adiciona um pouco de espaço vertical
`

export default function DashboardLayout({ children }: { children: ReactNode }){
    return (
    <PageContainer>
    <NavBar>
    <HomeButton />
    <TopMenu />
    </NavBar>
    { children }
    </PageContainer>
)

}
