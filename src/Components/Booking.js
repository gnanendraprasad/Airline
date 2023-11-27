import React, { Component } from 'react'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import 'animate.css'
import { MDBTable } from 'mdbreact';
import FlightService from '../Service/FlightService'

class Booking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flights: [],
            selectOptions: [],
            selectOptions2: [],
            flight_Name: '',
            source: '',
            source_n: '',
            destination: '',
            destination_n: '',
            class_Type: '',
            travel_Date: '',
            takeoff_Time: '',
            landing_Time: '',
            business_Cost: '',
            economy_Cost: '',
            displayInfo: 1,
            displayCost: false
        }

        this.changeClass_Type = this.changeClass_Type.bind(this);
        this.changeTravelDate = this.changeTravelDate.bind(this);
        this.showFlights = this.showFlights.bind(this);
    }
    async getOptions() {
        const res = await FlightService.getCities();
        const data = res.data
        const options = data.map(d => ({
            "label": d.source
        }))
        this.setState({ selectOptions: options })

    }

    async getOptions2() {
        const res = await FlightService.destination();
        const data = res.data
        const options = data.map(d => ({
            "label": d.destination
        }))
        this.setState({ selectOptions2: options })

    }


    handleChange(event) {
        this.setState({ source_n: event.label })
    }
    handleChange2(event) {
        this.setState({ destination_n: event.label })
    }
    changeClass_Type(event) {
        this.setState({ class_Type: event.target.value });
    }
    changeTravelDate(event) {
        this.setState({ travel_Date: event.target.value });
    }

    bookFlight(flight_No, cost, class_Type) {
        this.props.history.push({
            pathname: "/user-info",
            state: { flight_No: flight_No, cost: cost, class_Type: class_Type }
        });
    }

    showFlights(event) {
        event.preventDefault();
        console.log(this.state.source_n)
        console.log(this.state.destination_n)
        console.log(this.state.class_Type)
        console.log(this.state.travel_Date)

        if (this.state.class_Type === "Business") {
            FlightService.businessClass(this.state.source_n, this.state.destination_n, this.state.travel_Date).then((res => {
                this.setState({ flights: res.data });
                if (this.state.flights.length === 0) {
                    this.setState({ displayInfo: 3 })
                }
                else {
                    this.setState({ displayInfo: 2 })
                    this.setState({ displayCost: true })
                }
                console.log(this.state.flights)
            }));
        }
        if (this.state.class_Type === "Economy") {
            FlightService.economyClass(this.state.source_n, this.state.destination_n, this.state.travel_Date).then((res => {
                this.setState({ flights: res.data });
                if (this.state.flights.length === 0) {
                    this.setState({ displayInfo: 3 })
                }
                else {
                    this.setState({ displayInfo: 2 })
                    this.setState({ displayCost: false })
                }
                console.log(this.state.flights)
            }));
        }
    }

    componentDidMount() {
        this.getOptions();
        this.getOptions2();
    }
    render() {

        const parentStyle={
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }
            const style1 = {
              backgroundColor: "white",
              width:"40vw",
              padding:"20px",
              borderRadius:"6px"
          
            };
          
            const rounded = {
              borderRadius: "6px",
              boxShadow: "0px 3px 6px #7d7b7a"
            }
const align={
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column"
}
        let display = this.state.displayInfo;
        const cost = this.state.displayCost;
        let View;

        if (display === 2) {
            View =
                (
                    <div className="animate__animated animate__fadeInDown" align="center">
                        <h2 className="text-center serif">Available Flights</h2>
                        <div className="row">
                            <MDBTable scrollY maxHeight="320px">
                                <table className="table table-hover">
                                <thead>
    <tr>
        <th >Flight Name</th>
        <th >Source</th>
        <th >Destination</th>
        <th >Departure Time</th>
        <th >Arrival Time</th>
        <th >Tickets Available</th>
        <th >Cost</th>
        <th >Action</th>
    </tr>
</thead>

<tbody>
    {this.state.flights.map(flight => (
        <tr key={flight.flight_No}>
            <td >{flight.flight_Name}</td>
            <td >{flight.source}</td>
            <td >{flight.destination}</td>
            <td >{flight.takeoff_Time}</td>
            <td >{flight.landing_Time}</td>
            <td >{flight.available_Tickets}</td>
            <td >
                {cost ? flight.business_Cost : flight.economy_Cost}
            </td>
            <td>
                {cost ? (
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            this.bookFlight(
                                flight.flight_No,
                                flight.business_Cost,
                                this.state.class_Type
                            )
                        }
                        className="btn btn-success serif"
                    >
                        Book
                    </button>
                ) : (
                    <button
                        style={{ marginLeft: "10px" }}
                        onClick={() =>
                            this.bookFlight(
                                flight.flight_No,
                                flight.economy_Cost,
                                this.state.class_Type
                            )
                        }
                        className="btn btn-success serif"
                    >
                        Book
                    </button>
                )}
            </td>
        </tr>
    ))}
</tbody>

                                </table>
                            </MDBTable>
                        </div>
                    </div>

                );
        }

        if (display === 3) {
            if (this.state.source_n === this.state.destination_n) {
                View =
                    (
                        <div className="animate__animated animate__fadeInDown">
                            <h5>Source and Destination cannot be same</h5>
                        </div>
                    );
            }
            else {
                View =
                    (
                        <div className="animate__animated animate__fadeInDown">
                            <h5>No flights available</h5>
                        </div>
                    );
            }
        }



        return (
            <div class="bookBgImg overflow " style={parentStyle}>
                <div className='card' style={style1}> 
                    <h1 align="center" class="" style={{ fontFamily: "Georgia" }}>Book Your Ticket</h1>
                    <br></br>
                    <div>
                        <form onSubmit={this.showFlights} >
                            <div className="row">
                                <div className="offset-md-2 col-md-4">
                                    <h5  align="center">Source</h5>
                                    <div style={rounded} class="roundHover">
                                        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)} required />
                                    </div>
                                    <p  align="center">You have selected <strong>{this.state.source_n}</strong></p>

                                </div>
                                <div className="col-md-4">
                                    <h5  align="center">Destination</h5>
                                    <div style={rounded} class="roundHover">
                                        <Select options={this.state.selectOptions2} onChange={this.handleChange2.bind(this)} required />
                                    </div>
                                    <p  align="center">You have selected <strong>{this.state.destination_n}</strong></p>
                                </div>
                            </div>

                            <h5  align="center">Class</h5>
                            <div className="form-group row" align="center">

                                <div className="radio offset-md-3 col-md-3">
                                    <label>
                                        <input
                                            type="radio"
                                            name="class"
                                            value="Business"
                                            required
                                            checked={this.state.class_Type === "Business"}
                                            onChange={this.changeClass_Type}
                                        />
                                        &nbsp;<h5 >Business</h5>
                                    </label>
                                </div>
                                <div className="radio col-md-3 ">
                                    <label>
                                        <input
                                            type="radio"
                                            name="class"
                                            value="Economy"
                                            required
                                            checked={this.state.class_Type === "Economy"}
                                            onChange={this.changeClass_Type}
                                        />
                                        &nbsp;<h5 >Economy</h5>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group mt-3" style={align}>
                                <h5 >Travel Date</h5>
                                <input style={{...rounded,width:"400px"}} type="date" placeholder="Travel Date" name="travel_Date" className="form-control roundHover" required
                                    value={this.state.travel_Date} onChange={this.changeTravelDate} />
                            </div>

                            <br></br>
                            <div align="center">
                                <Button style={rounded}  type="Submit" variant="outline-success" >Check Flights</Button>
                            </div>
                        </form>
                    </div>
                    <br /><br />
                    <div align="center">
                        {View}
                    </div>
                </div>

            </div>


        )
    }
}

export default Booking