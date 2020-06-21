import React, { useContext } from 'react';
import { isBefore, isSameDay, format } from 'date-fns';
import { Text, Box, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import Events from './Events';
import CalendarBox from './CalendarBox';
import { Hide, Show } from '../Query';

type Props = ModalData & {
  onClick?: () => void;
};

const Day = ({ date, events, onClick }: Props) => {
  const size = useContext(ResponsiveContext);
  const today = new Date();

  const isToday = isSameDay(date, today);
  const hasPast = isBefore(date, today) && !isToday;
  const dayType = (isToday && 'today') || (hasPast && 'past') || 'day';
  const phoneViewport = size === 'small';

  if (phoneViewport && (hasPast || events.length === 0) && !isToday)
    return null;

  return (
    <CalendarBox
      isToday={isToday}
      background={`calendar-${dayType}-background`}
      border={{ color: `calendar-${dayType}-border` }}
      pad={phoneViewport ? 'small' : 'xsmall'}
      onClick={onClick}
      square
    >
      <Box direction="row" fill="vertical">
        <Show size="small">
          <RowDay date={date} type={dayType} />
        </Show>
        <Events events={events} hasPast={hasPast} />
        <Hide size="small">
          <CalendarDay date={date} type={dayType} isToday={isToday} />
        </Hide>
      </Box>
    </CalendarBox>
  );
};

type DayProps = { date: Date; type: string; isToday: boolean };

const RowDay = ({ date, type }: DayProps) => (
  <Box width="xsmall">
    <Text color={`calendar-${type}-text`} size="large" a11yTitle="Day number">
      {format(date, 'dd')}
    </Text>

    <Text color={`calendar-${type}-text`} size="small" a11yTitle="Day">
      {format(date, 'cccc')}
    </Text>
  </Box>
);

const CalendarDay = ({ date, type, isToday }: DayProps) => (
  <DayText
    color={`calendar-${type}-text`}
    weight={isToday ? 'bold' : 'normal'}
    type={type}
    size="medium"
    a11yTitle="Day number"
    textAlign="end"
    isToday={isToday}
  >
    {format(date, 'dd')}
  </DayText>
);

const DayText = styled(Text)<{ type: string; isToday: boolean }>`
  text-decoration: ${(props) =>
    props.type === 'past' ? 'line-through' : 'inherit'};
  position: absolute;
  bottom: 4px;
  line-height: 1;
  right: 10px;
  border-bottom: 3px solid
    ${(props) => (props.isToday ? 'tomato' : 'rgba(0, 0, 0, 0)')};
`;

export default Day;
