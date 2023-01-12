import React, { Children, ComponentType, useEffect, useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { luxonLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Dialog } from "primereact/dialog";
import { Button } from 'primereact/button';
import { DateTime, Settings } from 'luxon'
import { DateHeaderProps } from "react-big-calendar";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const d1 = DateTime.now();
export const SignumCalendar = () => {
    const [events, setEvents] = useState<any>([
        {
            start: d1.toJSDate(),
            end: d1
                .plus({day:1})
                .toJSDate(),
            title: "Some title"
        }
    ]);
    const [showEvent, setShowEvent] = useState(false);
    const [showDialog, setShowDialog] = useState(false);


    useEffect(() => {
        console.log("events", events);

    }, [events])

    const onEventResize = (data: any) => {
        const { start, end } = data;

        setEvents((state: any) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    const onEventDrop = (data: any) => {
        console.log(data);
    };

    const modalFooter = () => {
        return (
            <div>
                <Button
                    label="close modal"
                    onClick={()=>setShowDialog(false)}
                />
            </div>
        )
    }
    const ColoredDateCellWrapper: React.ComponentType= (deneme:any) =>
        React.cloneElement(Children.only(deneme.children), {
            style: {
                ...deneme.children.style,
                backgroundColor: deneme.value < DateTime.now() ? 'lightgrey' : '',
            },
        });
    
    // const Header: React.ComponentType = (deneme: any) =>
    // {
    //     return (
    //         <div>
    //             <h2>sasda</h2>
    //         </div>
    //     )
    // };

    const MonthEvent = () => {
        return (
        <div style={{ backgroundColor: "red" }}>
            <div style={{ backgroundColor: "black" }}>a</div>
            <div style={{ backgroundColor: "orange" }}>b</div>
        </div> )
    };
    
    

    const myCustomMonthDateHeader = ({ label, date }: DateHeaderProps) => {
        return {
            label,
            date,
        }
    }

    return (
        <div style={{
        margin:"7%"}}>
            <div className="card">

                <Dialog
                    header="New Event"
                    visible={showDialog}
                    style={{ width: "50vw" }}
                    footer={modalFooter}
                    onHide={() => setShowDialog(false)}
                >
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Dialog>

                <Dialog
                    header="Event Details"
                    visible={showEvent}
                    style={{ width: "50vw" }}
                    footer={modalFooter}
                    onHide={() => setShowEvent(false)}
                >
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Dialog>

                {/* <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={events}
                    style={{ height: "100vh" }}
                    selectable={true}
                    max={moment().add(1, "week").toDate()}
                    min={moment().subtract(1, "week").toDate()}
                    onDoubleClickEvent={event => { console.log("event details", event) }}

                /> */}
                <DnDCalendar
                    defaultDate={DateTime.now().toJSDate()}
                    defaultView="month"
                    events={events}
                    localizer={localizer}
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    resizable
                    style={{ height: "100vh" }}
                    selectable={true}
                    onDoubleClickEvent={event => {
                        console.log("event details", event);
                        setShowEvent(true);
                    }}
                    onSelectSlot={(slotInfo: SlotInfo) => {
                        console.log("slot info", slotInfo)
                        let d1 = DateTime.now().toLocal().toJSDate();
                        console.log("date time now", DateTime.now());
                        console.log("date", d1);
                        if (slotInfo.start < d1) {
                            console.log("aaaaaaaa");

                        } else {
                            setShowDialog(true);

                        }

                    }}
                    components={{
                        dateCellWrapper: ColoredDateCellWrapper,
                        // header: Header,
                        // month: {
                        //     dateHeader: myCustomMonthDateHeader,
                        // },
                    }}
                
                
            />


            </div>
           
        </div>
    );

}
