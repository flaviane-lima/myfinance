'use client';

import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #f3f4f6;
  width: 100%;
  max-width: 1024px;
  padding: 2rem 1rem;
  color: #1f2937;
  text-align: left;
  box-sizing: border-box;

  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    margin: 0;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Gestão Financeira</h1>
    </StyledHeader>
  );
}
