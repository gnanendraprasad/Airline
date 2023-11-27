import React, { Component } from 'react'
import Select from 'react-select'
import { Button, Carousel, Nav } from 'react-bootstrap'
import 'animate.css'
import { MDBTable } from 'mdbreact';
import FlightService from '../Service/FlightService'
import { GiCommercialAirplane } from "react-icons/gi";
import { Col, Card, } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import banner_1 from "../assets/img/banner_1.png";
import banner_2 from "../assets/img/banner_2.png";
import banner_3 from "../assets/img/banner_3.png";
import { toast } from 'react-toastify';
import airplane from "../assets/img/airplane.svg";
import travel from "../assets/img/travel.svg";
class Homepage extends Component {
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
    handleContact() {
        toast.success("Submitted Query Successfully!")
    }

    componentDidMount() {
        this.getOptions();
        this.getOptions2();
    }
    
    render() {


        const style1 = {
            backgroundColor: "rgba(230,230,230, 0.9000)",
            padding: "10px",
            color: "black",

        };
        const footerStyle = {
            backgroundColor:"black",
            padding:"20px",
            color:"white",
            fontFamily:"serif",
            fontWeight:"700"
        }
        const imageholder={
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
        }
        const imageholder1={
            display:"flex",
            justifyContent:"center",
            alignItems:"flex-start",
            flexDirection:"column"
        }
        let display = this.state.displayInfo;
        const cost = this.state.displayCost;
        let View;
        if (display === 2) {
            View =
                (
                    <div className="animate__animated animate__fadeInDown container blurDiv-roundCorners" align="center" style={style1}>
                        <h2 className="text-center serif">Available Flights</h2>
                        <div className="row container">
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
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.flights.map(
                                                flight =>
                                                    <tr key={flight.flight_No}>
                                                        <td >{flight.flight_Name}</td>
                                                        <td >{flight.source}</td>
                                                        <td >{flight.destination}</td>
                                                        <td >{flight.takeoff_Time}</td>
                                                        <td >{flight.landing_Time}</td>
                                                        <td >{flight.available_Tickets}</td>
                                                        <td >
                                                            {
                                                                cost ? (flight.business_Cost) : (flight.economy_Cost)
                                                            }
                                                        </td>
                                                    </tr>
                                            )
                                        }
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
                        <div className="animate__animated animate__fadeInDown blurDiv-roundCorners">
                            <h5 >Source and Destination cannot be same</h5>
                        </div>
                    );
            }
            else {
                View =
                    (
                        <div className="animate__animated animate__fadeInDown blurDiv-roundCorners">
                            <h5 >No flights available</h5>
                        </div>
                    );
            }
        }


        const font = {
            textShadow: " 2px 2px 2px black"
        }

        const rounded = {
            borderRadius: "20px",
            boxShadow: "1px 1px 10px 5px #778899"
        }

        return (
            <div class="homePageBg overflow-home">
                <br></br>
                {/* <div class="row">
                <div class="container-fluid col-sm-12" style={{ backgroundColor: "coral", padding: "15px" }}>
  <h1 class="animate__animated animate__fadeIn animate__delay-1s" align="right" style={{ color: "white", fontFamily: "serif" }}>Welcome to SkyLine Airways</h1>
</div>

                </div> */}

                <div class="row">
                    <div class="container-fluid">


                        {/* Carousel starts */}
                        <Carousel fade>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={banner_1}
                                    alt="First slide"
                                    style={{ 'height': "100vh" }}
                                />
                                <Carousel.Caption>
                                    <h1  class="card-img-top overflow serif">Journey made memorable.</h1>
                                    <p class="card-img-top overflow serif">The moment you doubt whether you can fly, you cease for ever to be able to do it</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={banner_2}
                                    alt="Second slide"
                                    style={{ 'height': "100vh" }}
                                />

                                <Carousel.Caption>
                                    <h1 class="card-img-top overflow serif" >Fly in comfort</h1>
                                    <p class="card-img-top overflow serif">“Remember that happiness is a way of travel, not a destination.”</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={banner_3}
                                    alt="Third slide"
                                    style={{ 'height': "100vh" }}
                                />

                                <Carousel.Caption>
                                    <h1 class="card-img-top overflow serif" >Dedicated for happy flying experience</h1>
                                    <p class="card-img-top overflow serif">“Travel. Your money will return. Your time won’t.”</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>
                {/* Carousel ends */}

                {/*check Flights starts */}
                <div class="row " >
                    <div class="col-md-12 cardHover" style={style1} >


                        <br /><br />
                        <div>
                            <form onSubmit={this.showFlights} >
                                <div className="row ">
                                    <div className="offset-md-2 col-md-4">
                                        <h5 align="center" >Source</h5>
                                        {/* <div style={rounded} class="roundHover "> */}
                                            <Select style={rounded} options={this.state.selectOptions} onChange={this.handleChange.bind(this)} required />
                                        {/* </div> */}
                                        <p align="center" >You have selected <strong>{this.state.source_n}</strong></p>
                                    </div>
                                    <div className="col-md-4">
                                        <h5 align="center" >Destination</h5>
                                        {/* <div style={rounded} class="roundHover "> */}
                                            <Select style={rounded} options={this.state.selectOptions2} onChange={this.handleChange2.bind(this)} required />
                                        {/* </div> */}
                                        <p align="center" >You have selected <strong>{this.state.destination_n}</strong></p>
                                    </div>
                                </div>

                                <h5 align="center" >Class</h5>
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

                                <div className="form-group offset-md-4 col-md-4" align="center">
                                    <h5 >Travel Date</h5>
                                    <input type="date" placeholder="Travel Date" name="travel_Date" className="form-control " required
                                        value={this.state.travel_Date} onChange={this.changeTravelDate} />
  
                                </div>

                                <br></br>
                                <div align="center">
                                    <button type="Submit" class="btn btn-outline-success serif" >Check Flights</button>
                                </div>
                            </form>
                        </div>
                        <br /><br />

                    </div>
                    <br></br>
                    <div align="center" class="container-fluid animate__animated animate__fadeInDown ">
                        <br></br>
                        {View}
                    </div>
                    <br></br>
                </div>
                {/*check Flights ends */}

                {/*page Details starts */}
                <div class="row d-flex justify-content-center">
                    <div class="col-md-5 offset-md-1" style={imageholder}>
                        <br></br>
                        <h6 >&nbsp;&nbsp;#1 Flight booking site</h6>
                        <br />
                        <h2 >Welcome to SkyLine Airways</h2>
                        <br />
                        <div class="row">
                            <div class="col-sm-6"><p >From quick breaks to epic adventures, find the best prices across millions of flights right here. No hidden fees. No hidden charges.</p></div>
                            <div class="col-sm-6"><p >Smart search filters, such as number of stops and departure time, help you find your perfect flight. Plus we’ve got heaps of tips and tricks to help you save more.</p></div>
                        </div>
                    </div>
                    <div class="col-md-5 offset-md-1" style={imageholder}>
                        <img src={travel}></img>
                    </div>

                </div>
                {/* page details ends */}

                {/* page details 2 starts */}
                <br></br>
                <div class="row" style={style1} >
                    <div class="col-md-5 offset-md-1" style={imageholder}>
                        <br></br>
                        <h1  style={{ color: "blue" }}>What we mean by modern travel</h1>
                        <img class="plane-img overflow" src={airplane}></img>
                    </div>
                    <div class="col-md-6 " style={imageholder1}>
                        <p >Travel is all about freedom. So it makes sense that planning and booking your trip should be simple, not a chore.</p>
                        <br />
                        <p >We know you're looking for the best prices and most flexibilty to choose what's right for you. Which is why we're always hard at work making sure our website are super straightforward and speedy.</p>
                        <br />
                        <p >Choose where you want to go, when you want to go and get the very best price from thousands of sites without having to look anywhere else. Plus, check out all the ways we can help you find a trip that's tailored to what you’re looking for, no matter your travel style or your budget.</p>
                        <br />
                        <p >Feeling flexible? Search ‘Everywhere’ to see where you can go for a great price. Got a destination in mind? Use our Price Alerts to find out when the fare changes.</p>
                        <br />
                        <br/>
                    </div>
                </div>
                <div id="contact" class="container p-4 bg-grey">
  <h2 class="text-center">CONTACT</h2>
  <div class="row">
    <div class="col-sm-5">
      <p>Contact us and we'll get back to you within 24 hours.</p>
      <p><span class="glyphicon glyphicon-map-marker"></span> Chicago, US</p>
      <p><span class="glyphicon glyphicon-phone"></span> +00 1515151515</p>
      <p><span class="glyphicon glyphicon-envelope"></span>skylineairways@gmail.com</p>
    </div>
    <div class="col-sm-7 slideanim">
    <form onSubmit={this.handleContact} >
      <div class="row">
        <div class="col-sm-6 form-group py-3">
          <input class="form-control" id="name" name="name" placeholder="Name" type="text" required />
        </div>
        <div class="col-sm-6 form-group py-3">
          <input class="form-control" id="email" name="email" placeholder="Email" type="email" required />
        </div>
      </div>
      <textarea class="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea>
      <div class="row">
        <div class="col-sm-12 form-group py-3">
          <Button type='submit'>Send</Button>
        </div>
      </div>
      </form>
    </div>
  </div>
</div>
<footer  style={footerStyle} class="text-center bg-dark">
  <p>Copyright@skyline airlines 2023</p> 
</footer>
            </div>


        )
    }
}

export default Homepage