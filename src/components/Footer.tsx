import React, { useContext } from 'react';
import {
  Box,
  Text,
  Anchor,
  Footer as GrommetFooter,
  ResponsiveContext,
} from 'grommet';
import styled from 'styled-components';

const Footer = () => {
  const size = useContext(ResponsiveContext);
  const isPhone = size === 'small';

  return (
    <GrommetFooter
      background="footer-background"
      tag="footer"
      justify="between"
      direction={isPhone ? 'column' : 'row'}
      pad="small"
    >
      <Text size="small" weight="bold">
        Abolish the Police! &nbsp; ❤
      </Text>
      <Text size="small" weight="bold">
        Developed by &nbsp;
        <StyledAnchor
          color="footer-developer-link-color"
          target="_blank"
          href="http://cdsdc.org/"
        >
          CDSDC
        </StyledAnchor>
      </Text>
    </GrommetFooter>
  );
};

const StyledAnchor = styled(Anchor)`
  border-bottom: 2px solid tomato;
  transition: border-bottom 230ms;

  &:hover {
    text-decoration: none;
    border-bottom: 2px solid black;
  }
`;

export default Footer;
