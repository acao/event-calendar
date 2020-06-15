import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { Heading, Text, Main, Button, Box } from 'grommet';
import { Checkmark } from 'grommet-icons';
import getEventType from '../utils/getEventType';

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
        <Heading>{event.eventname}</Heading>
        <LabelledText label="Date" text={event.eventdate} />
        <LabelledText label="Time" text={event.eventtime} />
        <LabelledText label="Type" text={event.eventtype} />
        <Text
          size="large"
          a11yTitle="BLM Endorsement?"
          margin={{ top: 'small' }}
        >
          {event.blmendorsed && <Checkmark />}
          {`This event ${
            event.blmendorsed ? 'is' : 'is not'
          } endorsed by BLM Cleveland`}
        </Text>
        <LabelledText label="Location" text={event.location} />
        <p>{event.description}</p>
        <Box margin={{ top: 'small' }}>
          {event.eventlink && (
            <Button
              alignSelf="start"
              label={`External Link`}
              href={event.eventlink}
              primary
              color={`calendar-type-${eventType}-background`}
            />
          )}
        </Box>
        <Box margin={{ top: 'small' }}>
          <Button
            alignSelf="start"
            label={`< Back to calendar`}
            href="/"
            primary
            color={`calendar-type-${eventType}-background`}
          />
        </Box>
      </Main>
      <Footer />
    </Layout>
  );
};

export default EventPage;
