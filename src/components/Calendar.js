import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {DateClickArg} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "@fullcalendar/common/main.css";
import "../App.css";
import {ButtonGroup} from "react-bootstrap";

export default class Calendar extends React.Component {

    calendarComponentRef = React.createRef();

    state={
        modalInsert: false,
        modalOptions: false,
        modalEdit: false,
        modalDelete: false,
        calendarWeekends: true,
        form: {
            title: '',
            owner: '',
            start: '',
            end: '',
            backgroundColor: ''
        },
        calendarEvents: [
            {
                title: 'Event Now',
                start: new Date(),
                owner: 'Fátima',
                backgroundColor: 'pink'
            },
            {
                title: 'Hola Mundo',
                owner: 'Fátima',
                start: '2021-04-20',
                end: '2021-04-22',
                backgroundColor: 'lightblue'
            }
        ],
    };

    // Funciones especificas

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
                title: "",
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

    // Handlers de las secciones

    handleDateClick = (click) => {
        //alert(click.dateStr)
    }

    handleChange = (event) => {
        this.setState({
            form:{
                ...this.state.form,
                [event.target.name]: event.target.value,
            }
        });
    };

    handleEventContent = (eventInfo) => {
        console.log(eventInfo);
        let datos = {
            title: eventInfo.event._def.title,
            owner: eventInfo.event._def.extendedProps.owner,
            start: eventInfo.event._instance.range.start,
            end: eventInfo.event._instance.range.end,
            backgroundColor: eventInfo.event._def.ui.backgroundColor
        };
        console.log(eventInfo.event._def.title);
        console.log(eventInfo.event._instance.range.start);
        console.log(eventInfo.event._instance.range.end);
        console.log(eventInfo.event._def.extendedProps.owner);
        console.log(eventInfo.event._def.ui.backgroundColor);
        this.setState({form: datos})
        console.log(this.state.form);
        this.openModalOptions();
    };

    handleEditEvent = () => {
        this.closeModalOptions();
        this.openModalEdit();
    };

    handleDeleteEvent = () => {
        this.closeModalOptions();
        this.openModalDelete();
    };

    // Open y Close de los Modals

    showModalInsert = () => {
        this.setState({modalInsert: true});
    }

    closeModalInsert = () => {
        this.setState({modalInsert: false});
    }

    openModalOptions = () => {
        this.setState({modalOptions: true})
    }

    closeModalOptions = () => {
      this.setState({modalOptions: false})
    };

    openModalEdit = () => {
        this.setState({modalEdit: true})
    };

    closeModalEdit = () => {
        this.setState({modalEdit: false})
    };

    openModalDelete = () => {
        this.setState({modalDelete: true})
    };

    closeModalDelete = () => {
        this.setState({modalDelete: false})
    };

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
                            <Label> Title: </Label> <Input className="form-control" name='title' type='text' required="true" onChange={this.handleChange} placeholder="Enter title here"/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Owner: </Label>
                            <select className="form-control" name="owner" onChange={this.handleChange}>
                                <option selected disabled> Who is the owner? </option>
                                <option name="owner" value="bruno"> Bruno </option>
                                <option name="owner" value="diego"> Diego </option>
                                <option name="owner" value="fatima"> Fátima </option>
                                <option name="owner" value="francisco"> Francisco </option>
                                <option name="owner" value="gaston"> Gaston </option>
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label> Start Date: </Label> <Input className="form-control" name='start' type='date' required="true" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> End Date: </Label> <Input className='form-control' name="end" type='date' onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Colour: </Label> <Input className="form-control"  name="backgroundColor" type='color' required="true" onChange={this.handleChange} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={this.agregarEvento}> Add Event </Button>
                        <Button color='danger' onClick={this.closeModalInsert}> Cancelar </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalOptions}>
                    <ModalHeader>
                        What do you want to do?
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label> Title: </Label> <Input className="form-control" name='title' type='text' readOnly value={this.state.form.title}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Owner: </Label> <Input className="form-control" name="owner" readOnly value={this.state.form.owner}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Start Date: </Label> <Input className="form-control" name='start' type='text' readOnly value={this.state.form.start}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> End Date: </Label> <Input className='form-control' name="end" type='text' readOnly value={this.state.form.end}/>
                        </FormGroup>
                        <FormGroup>
                            <Label> Colour: </Label> <Input className="form-control"  name="backgroundColor" type='text' readOnly value={this.state.form.backgroundColor}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button color='danger' onClick={this.closeModalOptions}> Cancel </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button color='success' onClick={this.handleEditEvent}> Edit Event </Button> {'  '}
                            <Button color='danger' onClick={this.handleDeleteEvent}> Delete </Button> {'   '}
                        </ButtonGroup>
                    </ModalFooter>

                </Modal>

                <Modal isOpen={this.state.modalDelete}>
                    <ModalHeader>
                        Delete Panel:
                    </ModalHeader>
                    <ModalBody>
                        Do you want to delete this event?
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button color='success' onClick={this.handleDeleteEvent}> Yes </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button color='danger' onClick={this.closeModalDelete}> No </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>

                <div className='calendar'>
                    <FullCalendar
                        plugins={[ dayGridPlugin, interactionPlugin, timeGridPlugin]}
                        initialView="dayGridMonth"
                        dateClick={this.handleDateClick}
                        eventClick={this.handleEventContent}
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
