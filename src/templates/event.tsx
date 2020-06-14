import React from 'react';
import GithubCorner from '../components/GithubCorner';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import { Heading, Text, Main, Button } from 'grommet';

const LabelledText = ({ label, text }: { label: string; text: string }) => {
  return (
    <Text size="large" margin={{ top: 'small' }} a11yTitle={`Event ${label}`}>
      <strong>{label}</strong> {text}
    </Text>
  );
};

const EventPage = (props: { pageContext: { event: EventInfo } }) => {
  const { event } = props.pageContext;
  return (
    <Layout>
      <Main pad="large" animation="fadeIn">
        <Heading>{event.eventname}</Heading>
        <LabelledText label="Date" text={event.eventdate} />
        <LabelledText label="Time" text={event.eventtime} />
        <LabelledText label="Type" text={event.eventtype} />
        <LabelledText label="Location" text={event.location} />
        <p>{event.description}</p>
        {event.eventlink && (
          <Button
            alignSelf="start"
            label={`More Details`}
            href={event.eventlink}
          />
        )}

        <Button alignSelf="start" label={`Back to calendar`} href="/" />
      </Main>
      <Footer />
    </Layout>
  );
};

export default EventPage;
