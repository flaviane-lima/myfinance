'use client'

import ExpenseList from "../../components/ExpenseList";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: #f9fafb; // ✅ Cinza bem clarinho
  min-height: 100vh; // ✅ Garante que ocupa toda a altura da tela
  padding: 1rem 0; // ✅ Adiciona um pouco de espaço vertical
`

export default function List() {

    return(
        <PageContainer>
            <ExpenseList />
        </PageContainer>    
        
    )
}
