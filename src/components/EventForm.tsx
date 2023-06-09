import React, {FC, useState} from 'react';
import {Form, Input, DatePicker, Button, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Dayjs} from "dayjs";
import {formatDate} from "../utils/date";
import {useTapedSelector} from "../hooks/useTapedSelector";

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent);

    const {user} = useTapedSelector(state => state.auth);

    const selectDate = (date: Dayjs | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())});
        }
    };

    const submitForm = () => {
        props.submit({...event, author: user.username});
    };

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description}
                    onChange={e => setEvent({...event, description: e.target.value})}
                />
            </Form.Item>

            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required(), rules.idDateAfter('It is not possible to create event in the past!')]}>
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>

            <Form.Item
                label="Choose a guest"
                name="guest"
                rules={[rules.required()]}>

                <Select
                    onChange={(guest: string) => setEvent({...event, guest})
                }>
                    {props.guests.map(guest =>
                        <Select.Option value={guest.username} key={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>

            <Row justify="end">
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;