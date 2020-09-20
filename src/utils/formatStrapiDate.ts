import { parse, format } from 'date-fns';

import { DATE_FORMAT } from './parseDate';

export const formatStrapiDate = (date: string) => {
  return format(parse(date, 'yyyy-MM-dd', 0), DATE_FORMAT);
};
