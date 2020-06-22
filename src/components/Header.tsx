import React, { useContext } from 'react';
import {
  Box,
  Text,
  Button,
  Header as GrommetHeader,
  ResponsiveContext,
} from 'grommet';
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
  const size = useContext(ResponsiveContext);
  const isPhone = size === 'small';

  const { title, formLink } = data.site.siteMetadata;
  return (
    <>
      <GrommetHeader background="header-background" pad="small">
        <StyledLink to="/">
          <Text color="header-text" weight="bold" size="small">
            {title}
          </Text>
        </StyledLink>
        {!isPhone && (
          <EventButton
            isPhone={isPhone}
            href={formLink}
            label="Add your event"
            a11yTitle="Add your event"
            color="white"
            target="_blank"
          />
        )}
      </GrommetHeader>
      {isPhone && (
        <EventButton
          isPhone={isPhone}
          href={formLink}
          label="Add your event"
          a11yTitle="Add your event"
          color="white"
          target="_blank"
        />
      )}
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const EventButton = styled(Button)<{ isPhone: boolean }>`
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #111;
  color: #111;
  margin: ${({ isPhone }) => (isPhone ? '12px' : 0)};
`;

export default Header;
