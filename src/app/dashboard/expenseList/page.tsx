'use client'

import ExpenseList from "../../components/ExpenseList";
import DashboardLayout from "@/app/components/DashboardLayout";

const handleEdit = (id: number) => {
  console.log("editar", id)
}


export default function List() {

    return(
      <DashboardLayout>
        <ExpenseList  onEdit={handleEdit} />
      </DashboardLayout>
    )
}
