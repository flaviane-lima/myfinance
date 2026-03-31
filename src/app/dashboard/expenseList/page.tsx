'use client'

import ExpenseList from "../../components/ExpenseList";
import DashboardLayout from "@/app/components/DashboardLayout";
import { useRouter } from 'next/navigation'




export default function List() {

   const router = useRouter()

  const handleEdit = (expense: any) => {
    console.log("clicou em editar", expense)

    router.push(`/dashboard/register?id=${expense.id}`)
  }


    return(
      <DashboardLayout>
        <ExpenseList  onEdit={handleEdit} />
      </DashboardLayout>
    )
}
