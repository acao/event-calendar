import React from 'react';
import GithubCorner from '../components/GithubCorner';
import Footer from '../components/Footer';
import Layout from '../components/Layout';

const EventPage = (props: { pageContext: { event: EventInfo } }) => {
  return (
    <Layout>
      <pre>{JSON.stringify(props.pageContext.event, null, 2)}</pre>

      <GithubCorner href="https://github.com/EmaSuriano/gatsby-starter-event-calendar" />
      <Footer />
    </Layout>
  );
};

export default EventPage;
