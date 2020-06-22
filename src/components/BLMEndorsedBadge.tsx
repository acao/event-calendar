import React, { useContext } from 'react';
import { Box, Text, ResponsiveContext } from 'grommet';
import { Checkmark } from 'grommet-icons';
import styled from 'styled-components';

type BLMEndorsedBadgeProps = {
  isEndorsed: boolean;
};

const BLMEndorsedBadge = ({ isEndorsed }: BLMEndorsedBadgeProps) => {
  const size = useContext(ResponsiveContext);
  const isPhone = size === 'small';

  if (isEndorsed) {
    return (
      <EndorsedBadgeWrapper background="tertiary">
        <Text
          color="calendar-modal-text"
          a11yTitle="BLM Endorsement?"
          size="small"
          weight="bold"
        >
          <CheckMarkWrapper>
            <Checkmark size="small" color="black" />
          </CheckMarkWrapper>{' '}
          {isPhone
            ? 'Endorsed by BLM Cleveland'
            : 'This event is endorsed by BLM Cleveland'}
        </Text>
      </EndorsedBadgeWrapper>
    );
  }

  return (
    <Box>
      <Text
        color="calendar-modal-text"
        a11yTitle="BLM Endorsement?"
        margin={{ top: 'small' }}
        size="small"
        weight="bold"
      >
        {isEndorsed && <Checkmark />}
        <i>This event is not endorsed by BLM Cleveland</i>
      </Text>
    </Box>
  );
};

const EndorsedBadgeWrapper = styled(Box)`
  border-radius: 100px;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  width: 340px;
  margin-top: 12px;
`;

const CheckMarkWrapper = styled.div`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

export default BLMEndorsedBadge;
