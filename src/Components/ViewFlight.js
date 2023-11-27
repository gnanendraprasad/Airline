import React, { Component } from 'react';
import FlightService from '../Service/FlightService';
import 'animate.css'
import {BiArrowBack} from 'react-icons/bi'

class ViewFlight extends Component {
    constructor(props) {
        super(props)

        this.state = { flight_No: this.props.match.params.flight_No, flight: {} }

        this.cancel = this.cancel.bind(this);
    }
    cancel() {
        this.props.history.push('/flights');
    }

    componentDidMount() {
        FlightService.DisplayFlightByFLightNo(this.state.flight_No).then(res => {
            this.setState({ flight: res.data });
        })
    }

    render() {



        const font = {
            fontFamily: "monospace"
        };


        const parentStyle={
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }
            const style1 = {
              backgroundColor: "white",
              width:"50vw",
              padding:"20px",
              borderRadius:"6px"
          
            };
          
            const rounded = {
              borderRadius: "6px",
              boxShadow: "0px 3px 6px #7d7b7a"
            }

        return (
            <div class="viewFlightBgImg overflow" style={parentStyle}>


                <div className="" style={style1}>
                    <br></br><br></br>
                    <h3 className="text-center" >Flight Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3" ><label><h5 >Flight Number : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.flight_No}</h5></div>

                            <div className="col-md-3" ><label><h5 >Flight Name : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.flight_Name}</h5></div>
                        </div><hr />
                        <div className="row">
                            <div className="col-md-3"><label><h5 >Source : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.source}</h5></div>

                            <div className="col-md-3"><label><h5 >Destination : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.destination}</h5>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <label><h5 >Takeoff Time : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.takeoff_Time}</h5>
                            </div>

                            <div className="col-md-3">
                                <label><h5 >Landing Time : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.landing_Time}</h5>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <label><h5 >Business Cost : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.business_Cost}</h5>
                            </div>

                            <div className="col-md-3">
                                <label><h5 >Economy Cost : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.economy_Cost}</h5>
                            </div>
                        </div>

                        <hr />
                        <div className="row">
                            <div className="col-md-3">
                                <label><h5 >Available Tickets : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.available_Tickets}</h5>
                            </div>



                            <div className="col-md-3">
                                <label><h5 >Travel Date : </h5></label></div>
                            <div className="col-md-3"><h5 >{this.state.flight.travel_Date}</h5>
                                <br></br>
                            </div>
                        </div>
                        <center>
                            <button style={rounded} className="btn btn-danger" onClick={this.cancel} ><BiArrowBack/>&nbsp;Back</button>
                        </center>
                    </div>
                </div>
            </div>
        )
    }


}

export default ViewFlight