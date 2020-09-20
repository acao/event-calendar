import React, { useState, useMemo, useCallback } from 'react';
import { Box } from 'grommet';
import { graphql, useStaticQuery } from 'gatsby';
import ModalEvent from '../components/ModalEvent';
import Month from '../components/Calendar/Month';
import Layout from '../components/Layout';
import groupEventsByMonth from '../utils/groupEventsByMonth';
import { format } from 'date-fns';
import { formatStrapiDate } from '../utils/formatStrapiDate';
import { formatStrapiTime } from '../utils/formatStrapiTime';

// override this query with your own questions!
const EVENTS_QUERY = graphql`
  query AllRows {
    site {
      siteMetadata {
        limitMonthInTheFuture
      }
    }
    strapi: allStrapiEvents {
      nodes {
        id
        eventname
        eventdate
        eventtime
        eventlink
        location
        description
        eventtype
        shouldpublish
        blmendorsed
      }
    }
    googleSheets: allGoogleSheetEventsRow(
      filter: {
        eventname: { ne: null }
        eventdate: { ne: null }
        shouldpublish: { ne: false }
      }
    ) {
      nodes {
        id
        eventname
        eventdate
        eventtime
        eventlink
        location
        description
        eventtype
        shouldpublish
        blmendorsed
      }
    }
  }
`;

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const { googleSheets, strapi, site } = useStaticQuery(EVENTS_QUERY);
  const { limitMonthInTheFuture } = site.siteMetadata;

  const nodes = [
    ...googleSheets.nodes,
    ...strapi.nodes.map((node: EventInfo) => ({
      ...node,
      eventdate: formatStrapiDate(node.eventdate),
      eventtime: formatStrapiTime(node.eventtime),
    })),
  ];

  const months = useMemo(
    () => groupEventsByMonth(nodes, limitMonthInTheFuture),
    [nodes, limitMonthInTheFuture],
  );

  const openModal = useCallback((data: ModalData) => {
    setModalData(data);
    setShowModal(true);
  }, []);

  return (
    <Layout>
      <Box id="calendars" animation="fadeIn">
        {months.map((month) => (
          <Month
            key={format(month.startDate, 'MM')}
            openModal={openModal}
            {...month}
          />
        ))}
      </Box>
      {showModal && (
        <ModalEvent onClose={() => setShowModal(false)} {...modalData!} />
      )}
    </Layout>
  );
};

export default CalendarPage;
