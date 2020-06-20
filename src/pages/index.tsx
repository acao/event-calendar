import React, { useState, useMemo, useCallback } from 'react';
import { Box } from 'grommet';
import { graphql, useStaticQuery } from 'gatsby';
import Footer from '../components/Footer';
import ModalEvent from '../components/ModalEvent';
import Month from '../components/Calendar/Month';
import Layout from '../components/Layout';
import groupEventsByMonth from '../utils/groupEventsByMonth';
import { format } from 'date-fns';
import Hero from '../components/Hero';

// override this query with your own questions!
const SPREADSHEET_QUERY = graphql`
  query AllRows {
    site {
      siteMetadata {
        limitMonthInTheFuture
      }
    }
    rows: allGoogleSheetEventsRow(
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
      }
    }
  }
`;

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const { rows, site } = useStaticQuery(SPREADSHEET_QUERY);
  const { limitMonthInTheFuture } = site.siteMetadata;

  const __NODES = [
    ...rows.nodes,
    {
      description: null,
      eventdate: '7/20/2020',
      eventlink:
        'https://www.facebook.com/events/s/all-black-lives-matter-march/570178697031350',
      eventname: 'All Black Lives Matter March',
      eventtime: '2:00:00 PM',
      eventtype: 'Action',
      id: 'd9e74a6a-d65d-53ef-a55d-c46bfb3ecec6',
      location: '1430 Abbey Avenue 44113↵Cleveland, Ohio 44113',
      shouldpublish: true,
    },
  ].map((x, i) => {
    switch (i) {
      case 8:
        return { ...x, eventtype: 'other' };
      case 3:
        return { ...x, eventtype: 'training' };
      case 2:
        return { ...x, eventtype: 'meeting' };
      default:
        return x;
    }
  });

  const months = useMemo(
    // () => groupEventsByMonth(rows.nodes, limitMonthInTheFuture),
    () => groupEventsByMonth(__NODES, limitMonthInTheFuture),
    [rows.nodes, limitMonthInTheFuture],
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
