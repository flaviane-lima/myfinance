'use client';

import styled from "styled-components";

type ExpenseProps = {
  name: string;
  description: string;
  price: number;
  icon?: string;
};


const Card = styled.div`
  background-color: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb; 
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  width: 100%;          // faz o Card ocupar 100% do espaço disponível
  margin-bottom: 1rem;
  box-sizing: border-box; // garante que padding e borda não aumentem o tamanho

   @media (max-width: 480px) {
    padding: 0.75rem;
  }

`;

const LeftContent = styled.div`
display: flex;
align-items: center;
gap: 0.75rem;
  flex: 1;
  min-width: 0; // 🔹 Permite que o conteúdo encolha

@media (max-width: 480px) {
    gap: 0.5rem;
  
  }

`;

const Icon = styled.span`
  font-size: 1.25rem;
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0; // 🔹 Impede que o ícone encolha

   @media (max-width: 480px) {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
    padding: 0.375rem;
  }

`;

const Texts = styled.div`
flex: 1;
min-width: 0; // 🔹 CRUCIAL para text-overflow funcionar
overflow: hidden; // 🔹 NECESSÁRIO para text-overflow

  @media (max-width: 480px) {
    max-width: calc(100% - 3rem); // 🔹 Considera ícone + espaçamento
  }

`;

const Title = styled.h3`
font-size: 1rem;
font-weight: 600;
color: #1f2937;
margin-bottom: 0.25rem;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

 @media (max-width: 480px) {
    font-size: 0.875rem;
    
  }

`;

const Description = styled.p`
font-size: 0.875rem;
color: #4b5563;
white-space: normal;
margin: 0;
width: 100%;

   @media (max-width: 480px) {
    font-size: 0.75rem;
  }

`;

const Price = styled.span`
font-size: 1rem;
font-weight: 600;
color: #10b981;
margin-right: 0.5rem;
margin-left: 1rem;
white-space: nowrap;
flex-shrink: 0; // 🔹 Impede que o preço encolha

@media (max-width: 480px) {
    font-size: 0.875rem;
    margin-left: 0.5rem;
     margin-right: 0.25rem;

`;

export default function ExpenseCard({ name, description, price, icon }: ExpenseProps) {
  return (
    <Card>
      <LeftContent>
        {icon && <Icon>{icon}</Icon>}
        <Texts>
          <Title>{name}</Title>
          <Description>{description}</Description>
        </Texts>
      </LeftContent>
      <Price>R$ {price.toFixed(2).replace('.', ',')}</Price>
    </Card>
  );
}