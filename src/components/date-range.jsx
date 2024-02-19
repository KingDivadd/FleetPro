import * as React from 'react';
import dayjs from 'dayjs';
import { Box } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';

export default function DateRange() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer  components={[ 'DateRangePicker', 'MobileDateRangePicker', 'DesktopDateRangePicker', 'StaticDateRangePicker', ]}>

            <DemoItem label="Responsive variant" component="DateRangePicker">
            <DateRangePicker
                defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
            />
            </DemoItem>
            
        </DemoContainer>
        </LocalizationProvider>
    );    
}
