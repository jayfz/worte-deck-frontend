import { FlexBase } from '@/ui/FlexBase';
import styled from 'styled-components';

export const Flex = {
  Column: styled(FlexBase).attrs({ $direction: 'column' })``,
  Row: styled(FlexBase).attrs({ $direction: 'row' })``,
};
