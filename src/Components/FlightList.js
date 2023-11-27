import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import 'animate.css'
import '../App.css'
import { MDBTable } from 'mdbreact';
import { BsFillTrashFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { FaEye } from 'react-icons/fa'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { BiCheckCircle } from 'react-icons/bi'
import {IoMdAddCircle} from 'react-icons/io'
import { Table } from 'react-bootstrap';


class FlightList extends Component {
    constructor(props) {
        super(props);
        this.state = { flights: [] }
        this.addFlight = this.addFlight.bind(this);
        this.editFlight = this.editFlight.bind(this);
        this.deleteFlight = this.deleteFlight.bind(this);
        this.viewFlight = this.viewFlight.bind(this);
    }

    deleteFlight = (flight_No) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => FlightService.deleteFlight(flight_No).then(res => {
                        this.setState({ flights: this.state.flights.filter(flight => flight.flight_No !== flight_No) });
                        toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{"Flight Number: " + flight_No + " has been cancelled successfully"}</div>, {
                            position: "top-center",
                            hideProgressBar: false
                        });
                    })
                },
                {
                    label: 'No',
                    onClick: () => this.props.history.push('/flights')
                }
            ]
        });
    };


    viewFlight(flight_No) {
        this.props.history.push(`/view-flight/${flight_No}`);
    }

    editFlight(flight_No) {
        this.props.history.push(`/add-flight/${flight_No}`);
    }

    componentDidMount() {
        FlightService.getFlights().then((res => {
            this.setState({ flights: res.data });
            console.log(this.state.flights)
        }));
    }

    addFlight() {
        this.props.history.push('/add-flight/_add')
    }

    render() {
        const rounded = {
            borderRadius: "6px",
            boxShadow: "0px 3px 6px #778899",
            color: "white"
        }

        const font = {
            fontFamily: "serfif"
        };

        return (
            <>
            <div className='container mt-5'>
            <nav class="navbar navbar-light" >
                        <form class="container-fluid justify-content-start">
                            <button class="btn btn-success me-2 btn-zoom" style={rounded} type="button" onClick={this.addFlight}>&nbsp;<IoMdAddCircle/>&nbsp;Add Flight</button>
                            <br></br>
                        </form>
                    </nav>
                    {/* <MDBTable scrollY maxHeight="260px"> */}
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th >Flight Number</th>
                                    <th >Flight Name</th>
                                    <th >Source</th>
                                    <th >Destination</th>
                                    <th >Available Tickets</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.flights.map(
                                        flight =>
                                            <tr key={flight.flight_No}>
                                                <td >{flight.flight_No}</td>
                                                <td >{flight.flight_Name}</td>
                                                <td >{flight.source}</td>
                                                <td >{flight.destination}</td>
                                                <td >{flight.available_Tickets}</td>
                                                <td>
                                                    <button onClick={() => this.editFlight(flight.flight_No)} style={rounded} className="btn btn-warning">&nbsp;&nbsp;<FaEdit />&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;
                                                    <button style={rounded} onClick={() => this.deleteFlight(flight.flight_No)} className="btn btn-danger">&nbsp;&nbsp;<BsFillTrashFill />&nbsp;&nbsp;</button>&nbsp;&nbsp;&nbsp;
                                                    <button style={rounded} onClick={() => this.viewFlight(flight.flight_No)} className="btn btn-success">&nbsp;&nbsp;<FaEye />&nbsp;&nbsp;</button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </Table>
            </div>

            </>
        )
    }
}

export default FlightList