import React, { ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Grommet } from 'grommet';
import styled from 'styled-components';
import Helmet from './Helmet';
import Footer from './Footer';
import Header from './Header';
import customTheme from '../utils/customTheme';

const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100%;
  }

  body {
    margin: 0;
    scroll-behavior: smooth;
        overflow-y: scroll;
  }

  h1 {
    margin-top: 0;
  }
`;

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <Grommet
    theme={customTheme}
    background={customTheme.global.colors.background}
    full
  >
    <GlobalStyle />
    <Helmet />
    <Wrapper>
      <Header />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </Wrapper>
  </Grommet>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Layout;
