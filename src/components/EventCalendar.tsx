import React, {FC} from "react";
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import {Dayjs} from "dayjs";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
    function dateCellRender(value: Dayjs) {
        const formattedDate = formatDate(value.toDate());
        const currentDayEvents = props.events.filter(event => event.date === formattedDate);

        return (
            <ul
                style={{paddingInlineStart: '15px'}}
            >
                {currentDayEvents.map((event, index) => (
                    <li
                        key={index}
                    >
                        {event.description}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <Calendar
            style={{padding: '15px'}}
            dateCellRender={dateCellRender}
        />
    )
}

export default EventCalendar;
