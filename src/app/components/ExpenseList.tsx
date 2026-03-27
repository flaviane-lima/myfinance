'use client'

//esses hooks busca os dados da API
import { useEffect, useState } from "react";
import ExpenseCard from "./ExpenseCard"

import styled from "styled-components"

//tipagem dos props(recebe a função do pai)
type ExpenseListProps = {
  onEdit: (id : number) => void;
}


const CategorySection = styled.section`
  margin-top: 2rem;
  width: 100%;


`;

// ✅ Styled component para o título da categoria
const CategoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: #1f2937;
  text-align: left;
  max-width: 700px;
  margin-left: 0;
  margin-right: 0;

`;


//ajuda a tipar os dados que vem da API
type Expense = {
  id: number;
  name: string
  description: string
  price: number
  categoryId: number
  category: {
    id: number
    name: string
  }
}

// Container para centralizar os cards
const CardsContainer = styled.div`
  width: min(700px, 100% - 2rem);
  margin-inline: auto;      /* centraliza */

`;

//arrays de categorias
const categories = [
  { name: "Alimentação", icon: "🍽️" },
  { name: "Utilidades", icon: "🌐" },
  { name: "Saúde", icon: "🏋️" },
  { name: "Lazer", icon: "☕" },
]
//agora o componente RECEBE onEdit
export default function ExpenseList({onEdit}: ExpenseListProps) {
  //estado local que armazenará as despesas recebida da API;
  const [expenses, setExpenses] = useState<Expense[]>([]);

  //useEffect que faz a requisição para a API ao montar o componente
  useEffect(() => {
    fetch('/api/expenses') //endpoint mockado
      .then(res => res.json()) //transforma resposta em JSON
      .then(data => setExpenses(data)) //atualiza estado com os dados recebido
  }, []);

  //Função responsável por deletar uma despesa via API
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar?")) return;

    const response = await fetch('/api/expenses', {
      method: 'DELETE',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setExpenses(prev => prev.filter (expense => expense.id !== id));
      alert("Deletado com sucesso")
    } else {
      alert("Erro ao deletar");
    }
  }

  return(
    <>
      {categories.map(category => (
        <CategorySection key={category.name}>
          <CardsContainer>
            <CategoryTitle>{category.name}</CategoryTitle>
          {expenses
            .filter(expense => expense.category.name === category.name)
            .map((expense, index) => (
              <ExpenseCard
                key={index}
                id={expense.id}
                name={expense.name}
                description={expense.description}
                price={expense.price}
                icon={category.icon}
                onDelete={handleDelete}
                onEdit={onEdit}
              />
            ))}
            </CardsContainer>
        </CategorySection>
      ))}
    </>
  );
}