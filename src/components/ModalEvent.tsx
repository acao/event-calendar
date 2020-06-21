import React, { ReactNode, Fragment } from 'react';
import { Layer, Box, Text, Button } from 'grommet';
import { FormClose, Checkmark } from 'grommet-icons';
import { format } from 'date-fns';
import getEventType from '../utils/getEventType';
import styled from 'styled-components';
import BLMEndorsedBadge from './BLMEndorsedBadge';

type Props = ModalData & {
  onClose: () => void;
};

const ModalEvent = ({ onClose, date, events }: Props) => (
  <Layer position="center" onClickOutside={onClose} onEsc={onClose} modal>
    <Header onClick={onClose}>{format(date, 'cccc d, MMMM')}</Header>
    <Box
      direction="column"
      align="center"
      tag="section"
      margin="small"
      overflow="scroll"
    >
      {events.map((event, i, arr) => (
        <Fragment key={event.id}>
          <EventDescription event={event} />
          {i !== arr.length - 1 && (
            <Box
              margin={{ vertical: 'small' }}
              background="calendar-modal-separator"
              height="3px"
              width="100%"
              style={{ borderRadius: '50%' }}
              flex="grow"
            />
          )}
        </Fragment>
      ))}
    </Box>
  </Layer>
);

type HeaderProps = {
  children: ReactNode;
  onClick: () => void;
};

const Header = ({ onClick, children }: HeaderProps) => (
  <Box
    direction="row"
    align="center"
    tag="header"
    elevation="small"
    justify="between"
  >
    <Text
      margin={{ left: 'small' }}
      color="calendar-modal-text"
      a11yTitle="Selected day"
    >
      <b>{children}</b>
    </Text>
    <StyledButton
      icon={<FormClose />}
      a11yTitle="Close popup button"
      onClick={onClick}
    />
  </Box>
);

const EventDescription = ({ event }: { event: EventInfo }) => {
  const eventType = getEventType(event.eventtype);

  return (
    <Box direction="column" flex="grow">
      <Box
        style={{ borderRadius: '50px' }}
        direction="row"
        background="calendar-modal-background"
        justify="center"
      >
        <Box margin="small" width="small" direction="column">
          <Text
            a11yTitle="Event time"
            margin={{ bottom: 'small' }}
            color="calendar-modal-text"
          >
            {event.eventtime}
          </Text>
          <Text
            color="calendar-modal-text"
            a11yTitle="Event Type"
            margin={{ bottom: 'small' }}
          >
            <strong>Type:</strong> {event.eventtype}{' '}
          </Text>
        </Box>
        <Box margin="small" width="medium" direction="column">
          <Text
            a11yTitle="Event name"
            weight="bold"
            color="calendar-modal-text"
            size="large"
          >
            <EventBadge background={`calendar-type-${eventType}-background`} />{' '}
            {event.eventname}
          </Text>

          {event.location && (
            <Text
              a11yTitle="Event location"
              color="calendar-modal-text"
              margin={{ top: 'small' }}
            >
              <strong>Location:</strong> {event.location}
            </Text>
          )}
          <BLMEndorsedBadge isEndorsed={event.blmendorsed} />
        </Box>
      </Box>
      <Box
        direction="row"
        background="calendar-modal-background"
        alignSelf="end"
        style={{ marginTop: 22 }}
      >
        <StyledButton
          href={`/event/${event.id}/`}
          label="Read More"
          a11yTitle="Read More"
          target="_blank"
          primary
          alignSelf="end"
          color="black"
        />
      </Box>
    </Box>
  );
};

const EventBadge = styled(Box)`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  display: inline-block;
  position: relative;
  top: -2px;
`;

const EndorsedBadge = styled(Box)`
  border-radius: 3px;
  display: flex;
`;

const StyledButton = styled(Button)`
  border-radius: 3px;
  color: #f1f1f1;
`;

export default ModalEvent;
