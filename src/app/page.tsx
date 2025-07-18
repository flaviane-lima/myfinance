'use client'

import Image from "next/image";

//esses hooks buscar os dados da API
import { useEffect, useState } from 'react'

//ajuda a tipar os dados que vêm da API
type Expense = {
  name: string
  description: string
  category: string
  price: number
}

export default function Home() {

  //buscar os dados com fetch
  const [expenses, setExpenses] = useState<Expense[]>([])

  useEffect(() => {
    fetch('/api/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))

  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-lg">Bem-vindo ao seu gerenciador financeiro!</p>
      <ul className="space-y-2 mt-6">
        {expenses.map((expense, index) => (
          <li key={index} className="border p-2 rounded">
            <strong>{expense.name}</strong> — {expense.description}
            <br />
            <span>Categoria: {expense.category}</span> | 💰 R$ {expense.price.toFixed(2)}
          </li>
        ))}
      </ul>

    </main>
  );
}
