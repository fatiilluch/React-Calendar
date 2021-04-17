import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timegridplugin from "@fullcalendar/timegrid";
import $ from 'jquery';
// import 'moment/min/moment.min.js';

export default class Calendar extends React.Component {

    calendarComponentRef = React.createRef();

    state={
        calendarWeejends: true,
        calendarEvents: [
            {
                title: 'Event Now',
                start: new Date()
            }
        ]
    };

    handleDateClick = (click) => {
        alert(click.dateStr)
    }

    renderEventContent = (eventInfo) => {
        return (
            <>
                <b> {eventInfo.timeText} </b>
                <i> {eventInfo.event.title} </i>
            </>
        )
    }

    agregarEvento = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        //calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
        console.log("CalendarApi");
        console.log(calendarApi);
        let fecha_S = prompt("fecha de inicio En formato YYYY-MM-DD");
        let fecha_E = prompt("fecha de fin En formato YYYY-MM-DD");
        let title = prompt("Titulo:");
        let color = prompt("Color");
        if (window.confirm("Queres agregar un evento?")) {
            this.setState({
                calendarEvents: this.state.calendarEvents.concat({
                    title: title,
                    start: fecha_S,
                    end: fecha_E,
                    color: color
                })
            })
        }
    };

    gotoADate = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.gotoDate(prompt("A que fecha quieres ir? Formato: YYYY-MM-DD"));
    };

    render() {
        return (
            <div>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin, timegridplugin ]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    eventContent={this.renderEventContent}
                    //eventRender={this.handleEventRender}
                    editable={true}
                    events={this.state.calendarEvents}
                    eventClick={this.toggle}
                    ref={this.calendarComponentRef}
                    themeSystem="bootstrap"
                    customButtons={{
                        agregar : {
                            text: 'Agrega evento',
                            click: this.agregarEvento
                        },
                        goToADate: {
                            text: 'Go to a Date',
                            click: this.gotoADate
                        }
                    }}
                    headerToolbar={{
                        left: "prev,next today agregar goToADate",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                />
            </div>


        )
    }
}