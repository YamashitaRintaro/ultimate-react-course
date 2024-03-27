import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyle';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <H1> App</H1>;
    </>
  );
}
