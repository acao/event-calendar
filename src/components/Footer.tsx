import React from 'react';
import { Box, Text, Anchor } from 'grommet';

const Footer = () => (
  <Box tag="footer" justify="between" direction="row" pad="medium">
    <Text>Abolish the Police! &nbsp; ❤</Text>
    <Text>
      Developed by &nbsp;
      <Anchor href="http://cdsdc.org/">CDSDC</Anchor>
    </Text>
  </Box>
);

export default Footer;
