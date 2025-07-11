import { NextResponse } from 'next/server'

type Expense = {
  name: string
  description: string
  category: string
  price: number
}

// Dados mockados
const expenses: Expense[] = [
  {
    name: 'Groceries',
    description: 'Weekly supermarket shopping',
    category: 'Food',
    price: 120.50,
  },
  {
    name: 'Internet',
    description: 'Monthly broadband subscription',
    category: 'Utilities',
    price: 89.99,
  },
  {
    name: 'Gym Membership',
    description: 'Monthly fitness center fee',
    category: 'Health',
    price: 59.90,
  },
  {
    name: 'Coffee',
    description: 'Latte at the local cafe',
    category: 'Leisure',
    price: 4.75,
  },
]

export async function GET() {
  return NextResponse.json(expenses)
}
