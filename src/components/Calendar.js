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

    calendarEvents = [
        { id: 1, title: 'Event Now', start: '2021-04-05', end: '2021-04-10', owner: 'Fátima', backgroundColor: 'pink' },
        { id: 2, title: 'Hola Mundo', start: '2021-04-20', end: '2021-04-22', owner: 'Fátima', backgroundColor: 'lightblue' },
        { id: 3, title: 'Vaciones', start: '2021-04-21', end: '2021-04-27', owner: 'Fátima', backgroundColor: 'green' }
    ]

    state={
        modalInsert: false,
        modalOptions: false,
        modalEdit: false,
        modalDelete: false,
        calendarWeekends: true,
        form: {
            id: '',
            title: '',
            owner: '',
            start: '',
            end: '',
            backgroundColor: ''
        },
        calendarEvents: this.calendarEvents
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
        this.setState({form: {}})
        let valorNuevo = {...this.state.form};
        valorNuevo.id = this.state.calendarEvents.length+1;
        let lista = this.state.calendarEvents;
        lista.push(valorNuevo);
        this.setState({
            calendarEvents: lista.concat({
                id: "",
                title: "",
                start: '',
                end: '',
                backgroundColor: ''
            }),
            modalInsert: false})
        };

    deleteEvent = (dato) => {
        this.closeModalDelete();
        let lista = this.state.calendarEvents;
        console.log("lista", lista);
        let form = this.state.form;
        let contador = 0;
        console.log("form", form);
        lista.forEach((e) => {
            if (e.id.toString() === form.id){
                lista.splice(contador, 1);
                console.log("Aca llegue");
            }
            contador ++;
        });
        this.setState({calendarEvents: lista});
        //this.setState({form: { id: '', title: '', start: '', end: '', backgroundColor: ''}})
        console.log("Deleting...");
        console.log(lista);
    };

    editEvent = () => {
        console.log("Editing...");
        this.closeModalEdit();
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
            id: eventInfo.event._def.publicId,
            title: eventInfo.event._def.title,
            owner: eventInfo.event._def.extendedProps.owner,
            start: eventInfo.event._instance.range.start.toJSON().slice("T",10),
            end: eventInfo.event._instance.range.end.toJSON().slice("T",10),
            backgroundColor: eventInfo.event._def.ui.backgroundColor
        };
        //console.log(eventInfo.event._def.title);
        //console.log(eventInfo.event._instance.range.start);
        //console.log(eventInfo.event._instance.range.end);
        //console.log(eventInfo.event._def.extendedProps.owner);
        //console.log(eventInfo.event._def.ui.backgroundColor);
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
                            <Label> Id: </Label> <Input className="form-control" readOnly name='id' type='text' value={this.state.calendarEvents.length+1}/>
                        </FormGroup>
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
                            <Label> Id: </Label> <Input className="form-control" readOnly name='id' type='text' value={this.state.form.id}/>
                        </FormGroup>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button className="flex-box" color='danger' onClick={this.closeModalOptions}> Cancel </Button>
                        <Button className="flex-box" color='success' onClick={this.handleEditEvent}> Edit Event </Button> {'  '}
                        <Button className="flex-box" color='danger' onClick={this.handleDeleteEvent}> Delete </Button> {'   '}
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
                            <Button color='success' onClick={this.deleteEvent}> Yes </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button color='danger' onClick={this.closeModalDelete}> No </Button>
                        </ButtonGroup>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEdit}>
                    <ModalHeader>
                        Edit Panel:
                    </ModalHeader>
                    <ModalBody>
                        MODAL UNDER CONSTRUCTION
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button color='success' onClick={this.editEvent}> Edit </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button color='danger' onClick={this.closeModalEdit}> Exit </Button>
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
