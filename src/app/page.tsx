'use client'

import styled from "styled-components"
import ExpenseCard from "./components/ExpenseCard";
import SectionHeader from "./components/SectionHeader";
import PageWrapper from "./components/PageWrapper";
import Header from "./components/Header";


//esses hooks busca os dados da API
import { useEffect, useState } from "react"; 

//ajuda a tipar os dados que vem da API
type Expense = {
  name: string
  description: string
  category: string
  price: number
}

// ✨ NOVO WRAPPER EXCLUSIVO COM FUNDO CINZA CLARO
const BackgroundWrapper = styled.div`
 background-color: #f3f4f6;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`



export default function Page() {
  //estado local que armazenará as despesas recebida da API;
  const [expenses, setExpenses] = useState<Expense[]>([]);

  //useEffect que faz a requisição para a API ao montar o componente
  useEffect( () => {
    fetch('/api/expenses') //endpoint mockado
       .then(res => res.json()) //transforma resposta em JSON
       .then(data => setExpenses(data)) //atualiza estado com os dados recebido
  }, [])

  return (
     <BackgroundWrapper>
      <Header /> 
    <PageWrapper>
      <section className="max-w-4xl mx-auto p-6">
        <SectionHeader>Bem vindo ao seu gerenciador financeiro!</SectionHeader>

        {/* 🍽️ Food */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Food</h3>
          {expenses
            .filter(expense => expense.category === "Food")
            .map((expense, index) => (
              <ExpenseCard
                key={index}
                name={expense.name}
                description={expense.description}
                price={expense.price}
                icon="🍽️"
              />
            ))}
        </div>

        {/* 🌐 Utilities */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Utilities</h3>
          {expenses
            .filter(expense => expense.category === "Utilities")
            .map((expense, index) => (
              <ExpenseCard
                key={index}
                name={expense.name}
                description={expense.description}
                price={expense.price}
                icon="🌐"
              />
            ))}
        </div>

        {/* 🏋️ Health */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Health</h3>
          {expenses
            .filter(expense => expense.category === "Health")
            .map((expense, index) => (
              <ExpenseCard
                key={index}
                name={expense.name}
                description={expense.description}
                price={expense.price}
                icon="🏋️"
              />
            ))}
        </div>

        {/* ☕ Leisure */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Leisure</h3>
          {expenses
            .filter(expense => expense.category === "Leisure")
            .map((expense, index) => (
              <ExpenseCard
                key={index}
                name={expense.name}
                description={expense.description}
                price={expense.price}
                icon="☕"
              />
            ))}
        </div>
      </section>
    </PageWrapper>
    </BackgroundWrapper>
  )
}

