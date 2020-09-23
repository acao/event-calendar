import React from 'react';
import Layout from '../components/Layout';
import { Heading, Text, Main, Button, Box } from 'grommet';
import { Link } from 'grommet-icons';
import getEventType from '../utils/getEventType';
import styled from 'styled-components';
import BLMEndorsedBadge from '../components/BLMEndorsedBadge';

const LabelledText = ({ label, text }: { label: string; text: string }) => {
  return (
    <Text size="large" margin={{ top: 'small' }} a11yTitle={`Event ${label}`}>
      <strong>{label}</strong> {text}
    </Text>
  );
};

const EventPage = (props: { pageContext: { event: EventInfo } }) => {
  const { event } = props.pageContext;
  const eventType = getEventType(event.eventtype);
  return (
    <Layout>
      <Main pad="large" animation="fadeIn">
        <Heading>
          <EventBadge background={`calendar-type-${eventType}-background`} />{' '}
          {event.eventname}
        </Heading>
        <Wrapper background="white">
          <LabelledText label="Date:" text={event.eventdate} />
          <LabelledText label="Time:" text={event.eventtime} />
          <LabelledText label="Type:" text={event.eventtype} />
          <LabelledText label="Location:" text={event.location} />
          <BLMEndorsedBadge isEndorsed={event.blmendorsed} />
          <p>{event.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box margin={{ top: 'small' }}>
              <StyledButton
                alignSelf="start"
                label={`Back to calendar`}
                href="/"
                primary
                color="black"
              />
            </Box>
            <Box margin={{ top: 'small' }}>
              {event.eventlink && (
                <StyledButton
                  alignSelf="start"
                  label="External Link"
                  href={event.eventlink}
                  primary
                  color="black"
                />
              )}
            </Box>
          </div>
        </Wrapper>
      </Main>
    </Layout>
  );
};

const StyledButton = styled(Button)`
  border-radius: 3px;
  color: #f1f1f1;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(Box)`
  padding: 6px 20px 20px 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
`;

const EventBadge = styled(Box)`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  display: inline-block;
  position: relative;
  top: -10px;
`;

export default EventPage;
