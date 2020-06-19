import React, { useState, useMemo, useCallback } from 'react';
import { Box } from 'grommet';
import { graphql, useStaticQuery } from 'gatsby';
import Footer from '../components/Footer';
import ModalEvent from '../components/ModalEvent';
import Month from '../components/Calendar/Month';
import Layout from '../components/Layout';
import groupEventsByMonth from '../utils/groupEventsByMonth';
import { format } from 'date-fns';

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

  const months = useMemo(
    () => groupEventsByMonth(rows.nodes, limitMonthInTheFuture),
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
