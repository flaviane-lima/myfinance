'use client'

import ExpenseList from "../../components/ExpenseList";
import styled from "styled-components";
import HomeButton from "@/app/components/HomeButton/HomeButton";

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
        <NavBar>
          <HomeButton />
        </NavBar>
            <ExpenseList />
        </PageContainer>    
        
    )
}
