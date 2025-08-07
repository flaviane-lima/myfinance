import { NextResponse } from 'next/server'

type Expense = {
  name: string
  description: string
  category: string
  price: number
}

// Dados mockados em português
const expenses: Expense[] = [
  {
    name: 'Mercado',
    description: 'Compras semanais no supermercado',
    category: 'Alimentação',
    price: 120.50,
  },
  {
    name: 'Internet',
    description: 'Assinatura mensal da internet',
    category: 'Utilidades',
    price: 89.99,
  },
  {
    name: 'Academia',
    description: 'Mensalidade da academia',
    category: 'Saúde',
    price: 59.90,
  },
  {
    name: 'Café',
    description: 'Café fora de casa',
    category: 'Lazer',
    price: 4.75,
  },
]

export async function GET() {
  return NextResponse.json(expenses)
}
