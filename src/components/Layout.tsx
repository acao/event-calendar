import React, { ReactNode } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Grommet } from 'grommet';
import Helmet from './Helmet';
import Footer from './Footer';
import Header from './Header';
import customTheme from '../utils/customTheme';

const GlobalStyle = createGlobalStyle`
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
    <Header />
    {children}
    <Footer />
  </Grommet>
);

export default Layout;
