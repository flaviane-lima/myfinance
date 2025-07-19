'use client';

import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 1rem; // equivalente a 14px
  font-weight: 200;
  margin-bottom: 1rem;
  color: #374151;
  padding-left: 1.5rem;   
`;

export default function SectionHeader({ children }: { children: React.ReactNode }){
  return <Title>{children}</Title>
}
