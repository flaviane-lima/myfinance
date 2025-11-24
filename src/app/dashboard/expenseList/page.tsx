'use client'

import ExpenseList from "../../components/ExpenseList";
import DashboardLayout from "@/app/components/DashboardLayout";


export default function List() {

    return(
      <DashboardLayout>
        <ExpenseList />
      </DashboardLayout>
    )
}
