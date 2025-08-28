'use client'

//esses hooks busca os dados da API
import { useEffect, useState } from "react";
import ExpenseCard from "./ExpenseCard"
import styled from "styled-components"

// ✅ Styled component para o título da categoria
const CategoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
`;


//ajuda a tipar os dados que vem da API
type Expense = {
  name: string
  description: string
  category: string
  price: number
}

//arrays de categorias
const categories = [
  { name: "Alimentação", icon: "🍽️" },
  { name: "Utilidades", icon: "🌐" },
  { name: "Saúde", icon: "🏋️" },
  { name: "Lazer", icon: "☕" },
]

export default function ExpenseList() {
  //estado local que armazenará as despesas recebida da API;
  const [expenses, setExpenses] = useState<Expense[]>([]);

  //useEffect que faz a requisição para a API ao montar o componente
  useEffect(() => {
    fetch('/api/expenses') //endpoint mockado
      .then(res => res.json()) //transforma resposta em JSON
      .then(data => setExpenses(data)) //atualiza estado com os dados recebido
  }, []);

  return(
    <>
      {categories.map(category => (
        <div key={category.name} className="mt-8">
          <CategoryTitle>{category.name}</CategoryTitle>
          {expenses
            .filter(expense => expense.category === category.name)
            .map((expense, index) => (
              <ExpenseCard
                key={index}
                name={expense.name}
                description={expense.description}
                price={expense.price}
                icon={category.icon}
              />
            ))}
        </div>
      ))}
    </>
  );
}