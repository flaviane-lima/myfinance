'use client'

import ExpenseList from "../../components/ExpenseList";
import DashboardLayout from "@/app/components/DashboardLayout";
import { useRouter } from 'next/navigation'




export default function List() {
  // Hook do Next.js para navegação entre páginas
  const router = useRouter()
  
  const handleEdit = (expense: any) => {
    // Loga no console o item que foi clicado
    console.log("clicou em editar", expense)
    
    // Redireciona para a página de registro passando o id na URL
    router.push(`/dashboard/register?id=${expense.id}`)
  }


  return (
    <DashboardLayout>
      <ExpenseList onEdit={handleEdit} />
    </DashboardLayout>
  )
}
