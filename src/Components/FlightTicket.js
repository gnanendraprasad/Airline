import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import {BiPrinter, BiArrowBack} from 'react-icons/bi'
import 'animate.css'

class FlightTicket extends Component {
    constructor(props) {
        super(props)

        this.state = { booking_Id: this.props.match.params.booking_Id, booking: {} }

        this.cancel = this.cancel.bind(this);
    }
    
    cancel() {

        this.props.history.push('/bookings');
    }

    componentDidMount() {
        FlightService.DisplayTicketDetailsByBookingId(this.state.booking_Id).then(res => {
            this.setState({ booking: res.data });
        })
    }

    render() {
        const parentStyle={
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }
            const style1 = {
              backgroundColor: "white",
              width:"400px",
              padding:"20px",
              borderRadius:"6px"
          
            };
          
            const rounded = {
              borderRadius: "6px",
              boxShadow: "0px 3px 6px #7d7b7a"
            }
          


        return (
            <div class="viewTicketBgImg overflow" style={parentStyle}>


                <div className="col-md-10 card p-4">
                    <div class="container-fluid col-sm-12" style={{ backgroundColor: "coral", padding: "10px", borderRadius: "5px" }}>
  <h1 class="" align="right" style={{ color: "white"}}>SkyLine Airways</h1>
</div>
  <br />
                    <div class="row">
                        <div class="col-sm-4 " ><h3 >Your Ticket</h3></div>
                        <div class="col-sm-4" ></div>
                        <div class="col-sm-4 " ><h3 align="right" >Booking Id: {this.state.booking.booking_Id}</h3></div>
                    </div>
                    <br />
                    
                    <div>
                        <div class="row">
                            <div class="col-md-2"><h5 >Flight Name :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.flight_Name}</h6></div>
                            <div class="col-md-2"><h5 >Source :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.source}</h6></div>
                            <div class="col-md-2"><h5 >Destination :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.destination}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 >Takeoff Time :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.takeoff_Time}</h6></div>
                            <div class="col-md-2"><h5 >Landing Time :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.landing_Time}</h6></div>
                            <div class="col-md-2"><h5 >Passport Number :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.passport_No}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 >Passenger Name :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.name}</h6></div>
                            <div class="col-md-2"><h5 >Date of Birth :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.dob}</h6></div>
                            <div class="col-md-2"><h5 >Gender :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.gender}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 >Class :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.class_Type}</h6></div>
                            <div class="col-md-2"><h5 >Travel Date :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.travel_Date}</h6></div>
                            <div class="col-md-2"><h5 >Booking Date :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.booking_Date}</h6></div>
                        </div>

                        <hr/>

                        <div class="row">
                            <div class="col-md-2"><h5 >Total Amount :</h5></div>
                            <div class="col-md-2"><h6 >{this.state.booking.total_Amount}</h6></div>
                            <div class="col-md-2"><h5 >Baggage type :</h5></div>
                            <div class="col-md-2"><h6 ><h7 >Checked Baggage</h7></h6></div>
                            <div class="col-md-2"><h5 >Meal Type :</h5></div>
                            <div class="col-md-2"><h6 ><h7 >vegetarian</h7></h6></div>
                            <div class="col-md-2 offset-md-4" align="center">
                                <button style={rounded} className="btn btn-danger " onClick={this.cancel} >&nbsp;<BiArrowBack />&nbsp;Back</button>
                            </div>
                            <div class="col-md-2">
                                &nbsp;<button style={rounded} className="btn btn-warning " onClick={() => window.print()}>&nbsp;<BiPrinter/>&nbsp;Print</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        )
    }


}

export default FlightTicket