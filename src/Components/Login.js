import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightService from '../Service/FlightService'
import { useHistory } from 'react-router-dom';
import 'animate.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VscError } from 'react-icons/vsc'


export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [user_Type, setUser_Type] = useState("");
  let history = useHistory();


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



  function handleSubmit(event) {

    let LoginObj = { id, password, user_Type }
    console.log('LoginObj=>' + JSON.stringify(LoginObj));


    sessionStorage.setItem('Id', id);
    sessionStorage.setItem('UserType', user_Type);
    FlightService.login(LoginObj).then(res => {
      if (user_Type === "admin") {
        history.push('/flights');
        window.location.reload(false);
      }

      if (user_Type === "user") {

        history.push('/homepage');
        window.location.reload(false);
      }
    },

      (error) => {
        toast.error(<div>&nbsp;<VscError />&nbsp;{"Invalid credentials!!"}</div>, {
          position: "top-center",
          hideProgressBar: true,
          pauseOnHover: false,
        });
      }
    )
    event.preventDefault();
  }
  return (
    <div class="LoginBgImg container-fluid overflow" style={parentStyle}>
      <div style={style1}>
        <h1  align="center">Login</h1>
        <form onSubmit={handleSubmit} >


          {/* <div class="form-group">
            <label class="col-md-4 " for="Name"><b >User ID</b></label>
            <div class="col-md-5"> */}
            {/* <div class="col-md-5"> */}
            <Form.Group controlId="formBasicEmail">
    <Form.Label>User ID</Form.Label>
    <Form.Control value={id} type="email" placeholder="Enter email" onChange={(e) => setId(e.target.value)} required />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  {/* </div> */}
              {/* <input type="email" value={id} placeholder="example@email.com" class="form-control input-md" style={rounded} onChange={(e) => setId(e.target.value)} required /> */}
            {/* </div>
          </div> */}
          {/* <div class="form-group">
            <br />
            <label class="col-md-4 " for="Name"><b >Password</b></label> */}
            {/* <div class="col-md-5 my-2"> */}
            <Form.Group controlId="formBasicPassword" className=' my-3'>
    <Form.Label>Password</Form.Label>
    <Form.Control value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
  </Form.Group>
              {/* <input type="password" value={password} placeholder="Password" class="form-control input-md" style={rounded} onChange={(e) => setPassword(e.target.value)} required /> */}
            {/* </div> */}
          {/* </div> */}
          {/* <br /> */}

          <div class="form-group">
            <label class="col-md-4 control-label" for="gender"><b >Select Role</b></label>
            <br />
            <div class="col-md-6">
              <label class="radio-inline" for="role-0">
                <input type="radio" name="role" id="role-0" value="user" required onChange={(e) => setUser_Type(e.target.value)} />
                &nbsp;<h5 >User</h5>
              </label> &nbsp;  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;

              <label class="radio-inline" for="role-1">
                <input type="radio" name="role" id="role-1" value="admin" required onChange={(e) => setUser_Type(e.target.value)} />
                &nbsp;<h5 >Admin</h5>
              </label>

            </div>
          </div>
          <br />


          <Button variant="success" style={rounded} type="Submit">Login</Button> <br /><br />

          <h5 > Dont have an account? </h5>   <NavLink to="/Register" exact activeStyle={{ color: 'magenta' }}>    click here</NavLink>
        </form>
      </div>
    </div>
  )
}