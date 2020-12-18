import '../../styles/pages/admin/reservation.scss';
import React, {Component, useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import {
  Link
} from "react-router-dom";
import Axios from 'axios';

const AdminReservation = () =>{
	const [object, setObject] = useState([])
	

	useEffect(() =>{
		let config ={
			method: 'get',
			url: 'http://159.65.129.134/api/admin/reservation',
			headers:{
				'Content-Type':'application/json',
			},
		};
		
		Axios(config)
		.then((response) =>{
			console.log(response.data.message)
			setObject(response.data.message)
			console.log('ini'+object)
		})
		.catch(function (error){
			console.log(error)
		})
	},[])
	
	const renderTable = () => {
    return object.map(data => {
      return (
        <tr className="mt-2">
          <td>{data.id}</td>
          <td>{data.email}</td>
          <td>{data.hotel}</td>
          <td>{data.adr}</td>
        </tr>
      )
    })
  }
    return(
			<div className="reservation">
				
					<div className="body">
						<div className="row justify-content-even align-items-center">
							<div className="col line justify-content-center" />
							<span className="col header">
								Reservation History
							</span>
							<div className="col line" />
						</div> 
						<Slide bottom>
						<table className="mt-4">
							<thead>
								<tr>
									<th>ID</th>
									<th>E-mail</th>
									<th>Hotel Type</th>
									<th>ADR</th>
								</tr>
							</thead>
							<tbody>
								{renderTable()}
							</tbody>
						</table>
						</Slide>
					</div>
					
					<div className="bottomBar">
					<div className="row justify-content-between align-items-center mt-1">
						<div className="space ml-2" />
						<Link to="/pages/public/reservation">
							<div className="navigation mt-2">
								Guests Reservation
							</div>
						</Link>
						<div className="separatorV" />
						<Link to="/">
							<div className="navigation mt-2">
								Back to Home
							</div>
						</Link>
						<div className="separatorV" />
						<Link to="/pages/admin/features">
							<div className="navigation mt-2">
								Feature Impotance
							</div>
						</Link>
						<div className="space mr-2" />
					</div>
				</div>
			</div>
    )
}
export default AdminReservation;