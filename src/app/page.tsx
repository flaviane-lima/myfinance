import SectionHeader from "./components/SectionHeader";

//esses hooks busca os dados da API
import { useEffect, useState } from "react"; 

//ajuda a tipar os dados quem da API
type Expense = {
  name: string
  description: string
  category: string
  price: number
}


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
    <section className="p-6">
      <SectionHeader>Bem vindo ao seu gerenciador financeiro!</SectionHeader>
    </section>

  );
}