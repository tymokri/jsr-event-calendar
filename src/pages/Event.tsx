import React, {FC, ReactElement, useEffect, useState} from 'react';
import {Layout, Row, Button, Modal} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTapedSelector} from "../hooks/useTapedSelector";
import {IEvent} from "../models/IEvent";

const Event: FC = (): ReactElement => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {guests, events} = useTapedSelector(state => state.event);
    const {user} = useTapedSelector(state => state.auth);

    useEffect(() => {
        fetchGuests();
        fetchEvents(user.username);
    }, []);

    const addNewEvent = (event: IEvent) => {
        setIsModalVisible(false);
        createEvent(event);
    };

    return (
        <Layout>
            <Row
                style={{padding: '0 15px 15px', backgroundColor: '#001529'}}
                justify="center">
                <Button
                    style={ {width: '100%'} }
                    onClick={() => setIsModalVisible(true)}
                >
                    Add event
                </Button>
            </Row>

            <EventCalendar
                events={events}
            />

            <Modal
                title="Add event"
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;