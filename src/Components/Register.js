import React, { useState } from 'react';
import LoginModelClass from './LoginModelClass'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightService from '../Service/FlightService'
import 'animate.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiCheckCircle } from 'react-icons/bi'
import { VscError } from 'react-icons/vsc'
import { RiErrorWarningLine } from 'react-icons/ri'

export default function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



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
  
  function handleSubmit(event) {
    let LoginObj = new LoginModelClass(id, first_Name, last_Name, gender, contact, password);
    console.log('LoginObj=>' + JSON.stringify(LoginObj));
    if (password === confirmPassword) {
      FlightService.register(LoginObj).then(res => {
        toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{"Acoount created successfully"}</div>, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        });

        setTimeout(function () {
          window.location.replace('/Login');
        }, 3000);
      },
        (error) => {
          toast.error(<div>&nbsp;<VscError />&nbsp;{"User Id not available, Please try different one!!"}</div>, {
            position: "top-center",
            hideProgressBar: true,
            pauseOnHover: false,
          });
        }
      );
    }
    else {
      toast.warn(<div>&nbsp;<RiErrorWarningLine />&nbsp;{"Password and Confirm Password did not match"}</div>, {
        position: "top-center",
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }

    event.preventDefault();
  }
  return (
    <div class="regBgImg overflow" style={parentStyle}>

   

        <div style={style1}>

          <div class="container col-md-10">
            <h1 align="center" >Registration Form</h1>
            <form onSubmit={handleSubmit}>

              <div class="form-group">
                <label for="Name"><b >User ID</b></label>
                <div>
                  <input style={rounded} type="email" value={id} placeholder="example@email.com" class="form-control input-md" onChange={(e) => setId(e.target.value)} required />

                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class="col-md-4 " for="Name"><b >First Name</b></label>

                    <input style={rounded} type="text" value={first_Name} placeholder="First Name" class="form-control input-md" required onChange={(e) => setFirst_Name(e.target.value)} />

                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class="col-md-4 " for="Name"><b >Last Name</b></label>

                    <input style={rounded} type="text" value={last_Name} placeholder="Last Name" class="form-control input-md" required onChange={(e) => setLast_Name(e.target.value)} />

                  </div>
                </div>
              </div>

              <div class="form-group">
                <br />
                <label for="Name"><b >Contact</b></label>
                <div>
                  <input style={rounded} type="text" value={contact} placeholder="Contact number" class="form-control input-md" required minLength="10" maxLength="10" pattern="(0|91)?[7-9][0-9]{9}" onChange={(e) => setContact(e.target.value)} />

                </div>
              </div>


              <div class="form-group">
                <br />
                <label class="col-md-4 control-label" for="gender"><b >Gender</b></label>
                <br />
                <div class="row">
                  <div class="col-md-4">
                    <label class="radio-inline" for="gender-0">
                      <input type="radio" name="gender" id="gender-0" value="Male" required onChange={(e) => setGender(e.target.value)} />
                      &nbsp;Male
                    </label></div>
                  <div class="col-md-4" align="center">
                    <label class="radio-inline" for="gender-1">
                      <input type="radio" name="gender" id="gender-1" value="Female" required onChange={(e) => setGender(e.target.value)} />
                      &nbsp;Female
                    </label></div>
                  <div class="col-md-4" align="center">
                    <label class="radio-inline" for="gender-2">
                      <input type="radio" name="gender" id="gender-2" value="other" required onChange={(e) => setGender(e.target.value)} />
                      &nbsp;Other
                    </label></div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class="col-md-4 " for="Name"><b >Password</b></label>

                    <input style={rounded} type="password" value={password} placeholder="Password" class="form-control input-md" required minlength="5" onChange={(e) => setPassword(e.target.value)} />

                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class=" " for="Name"><b >Confirm Password</b></label>

                    <input style={rounded} type="password" value={confirmPassword} placeholder="Confirm Password" class="form-control input-md" required onChange={(e) => setConfirmPassword(e.target.value)} />

                  </div>
                </div>
              </div>
              <br />

              <div align="center">
                <Button style={rounded} type="submit" variant="success" >Register</Button> <br /><br />
              </div>

            </form>
          </div>
        </div>
      </div>
  );
}