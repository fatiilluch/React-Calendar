import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import timegridplugin from "@fullcalendar/timegrid";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "@fullcalendar/common/main.css";
import "../App.css";

export default class Calendar extends React.Component {

    calendarComponentRef = React.createRef();

    state={
        modalInsert: false,
        calendarWeekends: true,
        form: {
            title:'',
            start: '',
            end: '',
            backgroundColor: ''
        },
        calendarEvents: [
            {
                title: 'Event Now',
                start: new Date(),
                backgroundColor: 'brown'
            },
            {
                title: 'Hola Mundo',
                start: '2021-04-20',
                end: '2021-04-22',
                backgroundColor: 'lightblue'
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
        let valorNuevo = {...this.state.form};
        let lista = this.state.calendarEvents;
        lista.push(valorNuevo);
        this.setState({
            calendarEvents: lista.concat({
                title: '',
                start: '',
                end: '',
                backgroundColor: ''
            }),
            modalInsert: false})
        };

    gotoADate = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        if(window.confirm("Queres ir una fecha en especifico?")) {
            let date = prompt("A que fecha quieres ir? Formato: YYYY-MM-DD");
            calendarApi.gotoDate(date);
            calendarApi.select(date);
        }
        else{
            alert("Bye!")
        }
    };

    showModalInsert = () => {
        this.setState({modalInsert: true});
    }

    closeModalInsert = () => {
        this.setState({modalInsert: false});
    }

    handleChange = (event) => {
        this.setState({
            form:{
                ...this.state.form,
                [event.target.name]: event.target.value,
            }
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Button color="success" size="lg" className='boton-agregar' onClick={this.showModalInsert}> Agregar Evento </Button>
                </div>
                <Modal isOpen={this.state.modalInsert}>
                    <ModalHeader>
                        Add a new Event
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label> Title: </Label> <Input className="form-control" name='title' type='text' required={true} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Start Date: </Label> <Input className="form-control" name='start' type='text' required={true} onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> End Date: </Label> <Input className='form-control' name="end" type='text' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Colour: </Label> <Input className="form-control"  name="backgroundColor" type='text' required={true} onChange={this.handleChange} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={this.agregarEvento}> Add Event </Button>
                        <Button color='danger' onClick={this.closeModalInsert}> Cancelar </Button>
                    </ModalFooter>
                </Modal>
                <div className='calendar'>
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin, timegridplugin]}
                        initialView="dayGridMonth"
                        dateClick={this.handleDateClick}
                        eventContent={this.renderEventContent}
                        editable={true}
                        droppable={true}
                        selectable={true}
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
                        customButtons={{
                            goToADate: {
                                text: 'Go to a Date',
                                click: this.gotoADate
                            }
                        }}
                        headerToolbar={{
                            left: "prev,next today goToADate",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                    />
                </div>
            </div>
        )
    }
}
