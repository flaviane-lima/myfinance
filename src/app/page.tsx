'use client'

import styled from "styled-components"
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

export default function Page() {

return (
    <BackgroundWrapper>
      <PageWrapper>
        <Header />
        <section>
          <SectionHeader>Bem vindo ao seu gerenciador financeiro!</SectionHeader>
        </section>
      </PageWrapper>
    </BackgroundWrapper>
  );

}

