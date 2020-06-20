import React from 'react';
import { Box, Text, Button, Header as GrommetHeader } from 'grommet';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const METADATA_QUERY = graphql`
  query {
    site {
      siteMetadata {
        title
        subTitle
        formLink
      }
    }
    imageSharp {
      original {
        src
      }
    }
  }
`;

const Header = () => {
  const data = useStaticQuery(METADATA_QUERY);

  const { title, subTitle, formLink } = data.site.siteMetadata;
  return (
    <GrommetHeader background="header-background" pad="small">
      <StyledLink to="/">
        <Text color="header-text" weight="bold" size="small">
          {title}
        </Text>
      </StyledLink>
      <EventButton
        href={formLink}
        label="Add your event"
        a11yTitle="Add your event"
        color="white"
        target="_blank"
      />
    </GrommetHeader>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const EventButton = styled(Button)`
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #111;
  color: #111;
`;

export default Header;
