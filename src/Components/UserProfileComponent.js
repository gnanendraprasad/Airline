import React, { Component } from 'react';
import UserService from '../Service/UserService'
import { FaUserCircle } from "react-icons/fa";


class UserProfileComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            first_Name: '',
            last_Name: '',
            contact: '',
            gender: ''

        }
    }

    componentDidMount() {
        UserService.userProfile(sessionStorage.getItem('Id')).then(res => {
            this.setState({ user: res.data });
            this.setState({ first_Name: this.state.user[0].first_Name });
            this.setState({ last_Name: this.state.user[0].last_Name });
            this.setState({ gender: this.state.user[0].gender });
            this.setState({ contact: this.state.user[0].contact });
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
              width:"40vw",
              padding:"20px",
              borderRadius:"6px"
          
            };
          
            const rounded = {
              borderRadius: "6px",
              boxShadow: "0px 3px 6px #7d7b7a"
            }

        return (
            <div class="profileBgImg overflow" style={parentStyle}>

                <div className="card" style={style1}>
                    <br></br><br></br><br />
                    <h3 className="text-center serif"><FaUserCircle size={30} /> Profile</h3>
                    <div className="card-body">

                        <div className="row">
                            <div class="col-md-5 offset-md-1" ><h5 >Email-Id: </h5></div>
                            <div class="col-md-5 offset-md-1" > <h5 >{sessionStorage.getItem('Id')} </h5></div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 >First Name : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 >{this.state.first_Name}</h5> </div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 > Last Name   : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 >{this.state.last_Name}</h5> </div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 >Gender   : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 >{this.state.gender}</h5> </div>
                        </div><br />

                        <div className="row">
                            <div class="col-md-5 offset-md-1"><h5 >Contact   : </h5></div>
                            <div class="col-md-5 offset-md-1"> <h5 >{this.state.contact}</h5> </div>
                        </div><br />

                    </div>
                </div>
                
            </div>


        )
    }
}

export default UserProfileComponent