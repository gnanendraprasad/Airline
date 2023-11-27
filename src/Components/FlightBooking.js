import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import { MDBTable } from 'mdbreact';
import 'animate.css'
import '../App.css'


class FlightBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [],
            displayInfo: 1
        }


        this.viewTicket = this.viewTicket.bind(this);
    }


    viewTicket(booking_Id) {
        this.props.history.push(`/view-ticket/${booking_Id}`);
    }


    componentDidMount() {
        FlightService.getBookings(sessionStorage.getItem('Id')).then((res => {
            this.setState({ bookings: res.data });

            if (this.state.bookings.length === 0) {
                this.setState({ displayInfo: 2 });
            }
        }));
    }


    render() {
        const parentStyle={
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }
            const style1 = {
              backgroundColor: "white",
              width:"70vw",
              padding:"20px",
              borderRadius:"6px"
          
            };
          
            const rounded = {
              borderRadius: "6px",
              boxShadow: "0px 3px 6px #7d7b7a"
            }


        let display = this.state.displayInfo;

        if (display === 2) {
            return (
                <div class="bookingDetailsBgImg" style={parentStyle}>
                    <div align="center" class="card"  style={style1}>
                        <h2 >You have no bookings</h2>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div class="bookingDetailsBgImg overflow" style={parentStyle}>

                    <div className="row col-md-8 card" style={style1}>
                        <div>
                            <div class="container-fluid col-sm-12 " style={{ backgroundColor: "coral", padding: "10px", borderRadius: "5px" }}>
  <h1 class="" align="center" style={{ color: "white" }}>Your Bookings</h1>
</div>
                        </div>
                        <MDBTable scrollY maxHeight="200px">
                            <table className="table table-hover" >
                                <thead>
                                    <tr>
                                        <th >Booking Id</th>
                                        <th >Travel Date</th>
                                        <th >Source</th>
                                        <th >Destination</th>
                                        <th >Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.bookings.map(
                                            booking =>
                                                <tr key={booking.booking_Id}>
                                                    <td >{booking.booking_Id}</td>
                                                    <td >{booking.travel_Date}</td>
                                                    <td >{booking.source}</td>
                                                    <td >{booking.destination}</td>
                                                    <td>

                                                        <button style={rounded} onClick={() => this.viewTicket(booking.booking_Id)} className="btn btn-success">View Ticket</button>
                                                    </td>
                                                </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </MDBTable>
                    </div>
                    
                </div>
            )
        }
    }
}

export default FlightBooking