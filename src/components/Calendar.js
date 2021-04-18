import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timegridplugin from "@fullcalendar/timegrid"

import "@fullcalendar/common/main.css";

export default class Calendar extends React.Component {

    calendarComponentRef = React.createRef();

    state={
        calendarWeekends: true,
        calendarEvents: [
            {
                title: 'Event Now',
                start: new Date()
            },
            {
                title: 'Hola Mundo',
                start: '2021-04-20',
                end: '2021-04-22'
            }
        ]
    };

    handleDateClick = (click) => {
        //alert(click.dateStr)
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
        console.log("CalendarApi");
        console.log(calendarApi);
        let fecha_S = prompt("fecha de inicio");
        let fecha_E = prompt("fecha de fin");
        let title = prompt("Titulo:");
        let color = prompt("Color");
        if (fecha_S < new Date()) {     //ver como comparar fechas
            alert("No se pueden crear eventos en el pasado");
        }
        else {
            if (window.confirm("Queres agregar un evento?")) {
                this.setState({
                    calendarEvents: this.state.calendarEvents.concat({
                        title: title,
                        start: fecha_S,
                        end: fecha_E,
                        backgroundColor :color,
                    })
                })
            }
        }
    };

    gotoADate = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        if(window.confirm("Queres ir una fecha en especifico?")) {
            //calendarApi.gotoDate();
            let date = prompt("A que fecha quieres ir? Formato: YYYY-MM-DD");
            calendarApi.gotoDate(date);
            calendarApi.select(date);
        }
        else{
            alert("Bye!")
        }
    };

    render() {
        return (
            <div>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin, timegridplugin]}
                    initialView="dayGridMonth"
                    dateClick={this.handleDateClick}
                    eventContent={this.renderEventContent}
                    //eventRender={this.handleEventRender}
                    editable={true}
                    droppable={true}
                    selectable={true}
                    selectHelper={true}
                    weekends={this.state.calendarWeekends}
                    events={this.state.calendarEvents}
                    ref={this.calendarComponentRef}
                    businessHours={
                        [
                            {
                                daysOfWeek: [1, 2, 3, 4, 5],
                                startTime: '09:00',
                                endTime: '22:00',
                                display: 'inverse-background',
                            }
                        ]
                    }
                    //themeSystem='bootstrap'
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