'use client';

import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-size:  1.125rem; // equivalente a 18px
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #374151;  
  text-align: center;

  @media (max-width: 600px){
     font-size: 1rem;
  }
  
  @media (max-width: 400px){
     font-size: 0.875rem;
  }
`;

export default function SectionHeader({ children }: { children: React.ReactNode }){
  return <Title>{children}</Title>
}
