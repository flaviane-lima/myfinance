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
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb; 
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const  LeftContent = styled.div`
display: flex;
align-items: center;
gap: 0.75rem;

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
`;

const Texts = styled.div``;

const Title = styled.h3`
font-size: 1rem;
font-weight: 600;
color: #1f2937;
margin-bottom: 0.25rem;
`;

const Description = styled.p`
font-size: 1rem;
color: #4b5563; 
`;

const Price = styled.span`
font-size: 1rem;
font-weight: 600;
color: #10b981;
`;

export default function ExpenseCard({ name, description, price, icon } : ExpenseProps) {
    return(
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