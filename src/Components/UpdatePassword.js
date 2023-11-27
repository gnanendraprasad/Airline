import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FlightService from "../Service/FlightService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiCheckCircle } from "react-icons/bi";
import { VscError } from "react-icons/vsc";
import "animate.css";

export default function UpdatePassword() {
	const [id, setId] = useState(sessionStorage.getItem("Id"));
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	function handleSubmit(event) {
		let LoginObj = { id, password };
		console.log("LoginObj=>" + JSON.stringify(LoginObj));
		if (password === confirmPassword) {
			FlightService.updatePassword(LoginObj).then((res) => {
				toast.success(
					<div>
						&nbsp;
						<BiCheckCircle />
						&nbsp;{" Password has been updated successfully"}
					</div>,
					{
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: true,
						pauseOnHover: false,
					}
				);

				setTimeout(function () {
					window.location.replace("/homepage");
				}, 3000);
			});
		} else {
			toast.error(
				<div>
					&nbsp;
					<VscError />
					&nbsp;{"Password and Confirm Password did not match"}
				</div>,
				{
					position: "top-center",
					hideProgressBar: false,
					pauseOnHover: false,
				}
			);
		}
		event.preventDefault();
	}

	const parentStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const style1 = {
		backgroundColor: "white",
		width: "400px",
		padding: "20px",
		borderRadius: "6px",
	};

	const rounded = {
		borderRadius: "6px",
		boxShadow: "0px 3px 6px #7d7b7a",
	};
	return (
		<div class="changePassBgImg overflow" style={parentStyle}>
			<div class="col-md-8" style={style1}>
				<div class="updatepassword">
					<h1 align={"center"}>Update Password</h1>
					<br />
					<form onSubmit={handleSubmit}>
						<div class="updatepassword1">
							<Form.Group controlId="formBasicPassword" className=" my-3">
								<Form.Label>Password</Form.Label>
								<Form.Control
									value={password}
									type="password"
									placeholder="Enter New Password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</Form.Group>

							<Form.Group controlId="formBasicPassword" className=" my-3">
								<Form.Label>Confirm Password</Form.Label>
								<Form.Control
									value={confirmPassword}
									type="password"
									placeholder="Confirm Password"
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</Form.Group>

							<br />
							<Button
								style={rounded}
								type="submit"
								align={"center"}
								variant="success"
							>
								Update
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
