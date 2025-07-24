'use client';

import styled from "styled-components";

type ExpenseProps = {
    name: string;
    description: string;
    price: number;
};

const Card = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb; 
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
font-size: 1rem;
font-weight: 600;
color: #1f2937;
margin-bottom: 0.25rem;
`;

const Description = styled.p`
font-size: 1rem;
font-weight: 500;
margin-bottom: 0.5rem; 
`;

const Price = styled.span`
font-size: 1rem;
font-weight: 500;
color: #10b981;
`;

export default function ExpenseCard({ name, description, price } : ExpenseProps) {
    return(
        <Card>
            <Title>{name}</Title>
            <Description>{description}</Description>
            <Price>{price}</Price>
        </Card>
    );
}