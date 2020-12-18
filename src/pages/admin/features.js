import '../../styles/pages/admin/features.scss';
import React, {Component, useState, useEffect} from 'react';
import Slide from 'react-reveal/Slide';
import {
  Link
} from "react-router-dom";
import Axios from 'axios';

const Features = () =>{
	const [features, setFeatures] = useState([])
	

	useEffect(() =>{
		let config ={
			method: 'get',
			url: 'http://159.65.129.134/api/admin/features',
			headers:{
				'Content-Type':'application/json',
			},
		};
		
		Axios(config)
		.then((response) =>{
			console.log(response.data.message)
			setFeatures(response.data.message)
			console.log('ini'+features)
		})
		.catch(function (error){
			console.log(error)
		})
	},[])
	
	const renderTable = () => {
    return features.map(feature => {
      return (
				<Slide top>
        <tr className="mt-1">
          <td>{feature}</td>
        </tr>
				</Slide>
      )
    })
  }
    return(
			<div className="features">
					<div className="body">
						<div className="row justify-content-even align-items-center">
							<div className="col line justify-content-center" />
							<span className="col header">
								Feature Importance
							</span>
							<div className="col line" />
						</div> 
						<table className="mt-4">
							<tbody>
								{renderTable()}
							</tbody>
						</table>

					
		
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
							<Link to="/pages/admin/reservation">
								<div className="navigation mt-2">
									Admin Console Reservation History
								</div>
							</Link>
							<div className="separatorV" />
							<Link to="/">
								<div className="navigation mt-2">
									Back to Home
								</div>
							</Link>
							<div className="space mr-2" />
						</div>
					</div>
			</div>
    )
}
export default Features;