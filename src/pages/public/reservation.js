import '../../styles/pages/public/reservation.scss';
import React, {Component, useState, useEffect} from 'react';
import { Radio } from "../../components/radio.js";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {
  Link
} from "react-router-dom";
import Zoom from 'react-reveal/Zoom';
import userEvent from '@testing-library/user-event';

window.$sesi = new Array();

const PublicReservation = () =>{
	const [email, setEmail] = useState("");
	const [hotel, setHotel] = useState("");
	const [meal, setMeal] = useState("");
	const [country, setCountry] = useState("");
	const [channel, setChannel] = useState("");
	const [room, setRoom] = useState("");
	const [customer, setCustomer] = useState("");
	const [deposit, setDeposit] = useState("");

	const countries = [
		'Asia', 'Europe', 'Caribbean',{ value: 'Central_America', label: 'Central America' },{ value: 'South_America', label: 'South America' },{ value: 'North_America', label: 'North America' }, 'Africa', 'Oceania'
	];
	const defaultCountry = countries[0];

	const rooms = [
		'A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','O','P'
	];
	const defaultRoom = rooms[0];

	const customers = [
		'Contract', 'Group', 'Transient','Transient-Party'
	];
	const defaultCustomer = customers[0];

  const sesi = window.$sesi;

  function handleChange(e) {
    window.$sesi[e.target.name] = e.target.value;
    console.log(e.target.name + " changed to "+e.target.value)
	}

	function handleCountry(e){
		setCountry(e.value)
	}

	function handleRoom(e){
		setRoom(e.value)
	}

	function handleCustomer(e){
		setCustomer(e.value)
	}


  useEffect(() => {
		window.$sesi['email'] = email;
		window.$sesi['hotel'] = hotel;
		window.$sesi['meal'] = meal;
		window.$sesi['country'] = country;
		window.$sesi['channel'] = channel;
		window.$sesi['room'] = room;
		window.$sesi['deposit'] = deposit;
		window.$sesi['customer'] = customer;
    console.log(
			'email: '+window.$sesi['email']+
			'hotel: '+window.$sesi['hotel']+
			', meal: '+window.$sesi['meal']+
			', country: '+window.$sesi['country']+
			', channel: '+window.$sesi['channel']+
			'room: '+window.$sesi['room']+
			', deposit: '+window.$sesi['deposit']+
			'customer: '+window.$sesi['customer'])  
	});


    return(
			<div className="reservation">
				<div className="body">
					<div className="row justify-content-even align-items-center">
						<div className="col line justify-content-center" />
						<span className="col header">
								Please Fill This Form!
						</span>
						<div className="col line" />
					</div> 
					<div className="form mt-4">
						<div className="headerText">Your Email</div>
						<input type="email" className="mt-2 " placeholder="example@mail.com"></input>

						<div className="headerText mt-4">Hotel Type</div>
						<div className="row mt-2">
							<Radio
								value="Resort Hotel"
								selected={hotel}
								text="Resort Hotel"
								onChange={setHotel}
							/>
							<div className="space mr-4"/>
							<Radio 
								value="City Hotel"
								selected={hotel}
								text="City Hotel"
								onChange={setHotel}
							/>
						</div>

						<div className="headerText mt-4">Reservation Date</div>
						<div className="row mt-2">
							<div className="numberInput mr-4">
								<div className="text mb-1">Date</div>
								<input type="number" className="smallInput" placeholder="DD"></input>
							</div>
							<div className="numberInput mr-4">
								<div className="text mb-1">Month</div>
								<input type="number" className="smallInput" placeholder="MM"></input>
							</div>
							<div className="numberInput">
								<div className="text mb-1">Year</div>
								<input type="number" className="smallInput" placeholder="YY"></input>
							</div>
						</div>

						<div className="headerText mt-4">Arrival Date</div>
						<div className="row mt-2">
							<div className="numberInput mr-4">
								<div className="text mb-1">Date</div>
								<input type="number" className="smallInput" placeholder="DD"></input>
							</div>
							<div className="numberInput mr-4">
								<div className="text mb-1">Month</div>
								<input type="number" className="smallInput" placeholder="MM"></input>
							</div>
							<div className="numberInput">
								<div className="text mb-1">Year</div>
								<input type="number" className="smallInput" placeholder="YY"></input>
							</div>
						</div>

						<div className="headerText mt-4">Guests</div>
						<div className="row mt-2">
							<div className="numberInput mr-4">
								<div className="text mb-1">Adults</div>
								<input type="number" className="smallInput" defaultValue={1}></input>
							</div>
							<div className="numberInput mr-4">
								<div className="text mb-1">Children</div>
								<input type="number" className="smallInput" defaultValue={0}></input>
							</div>
							<div className="numberInput">
								<div className="text mb-1">Babies</div>
								<input type="number" className="smallInput" defaultValue={0}></input>
							</div>
						</div>
						
						<div className="headerText mt-4">Meal Type</div>
						<div className="row mt-2">
							<Radio
								value="BB"
								selected={meal}
								text="Bed and Breakfast"
								onChange={setMeal}
							/>
							<div className="space mr-4"/>
							<Radio 
								value="HB"
								selected={meal}
								text="Half Board"
								onChange={setMeal}
							/>
							<div className="space mr-4"/>
							<Radio 
								value="FB"
								selected={meal}
								text="Full Board"
								onChange={setMeal}
							/>
						</div>

						<div className="headerText mt-4">Country</div>
						<Dropdown className="dropdown mt-2" options={countries} onChange={handleCountry} value={defaultCountry} placeholder="Select a country" />

						<div className="headerText mt-4">Distribution Channel</div>
						<div className="row mt-2">
							<Radio
								value="TA"
								selected={channel}
								text="Travel Agents"
								onChange={setChannel}
							/>
							<div className="space mr-4"/>
							<Radio 
								value="TO"
								selected={channel}
								text="Tour Agencies"
								onChange={setChannel}
							/>
						</div>

						<div className="headerText mt-4">Room Type</div>
						<Dropdown className="dropdown mt-2" options={rooms} onChange={handleRoom} value={defaultRoom} placeholder="Select a country" />

						<div className="headerText mt-4">Deposit Type</div>
						<div className="row mt-2">
							<Radio
								value="No Deposit"
								selected={deposit}
								text="No Deposit"
								onChange={setDeposit}
							/>
							<div className="space mr-4"/>
							<Radio 
								value="Non Refund"
								selected={deposit}
								text="Non Refundable"
								onChange={setDeposit}
							/>
							<Radio 
								value="Refundable"
								selected={deposit}
								text="Refundable"
								onChange={setDeposit}
							/>
						</div>

						<div className="headerText mt-4">Customer Type</div>
						<Dropdown className="dropdown mt-2" options={customers} onChange={handleCustomer} value={defaultCustomer} placeholder="Select a country" />


						<div className="headerText mt-4">Required Car Parking Space</div>
						<div className="numberInput mt-2">
								<input type="number" className="smallInput" defaultValue={0}></input>
						</div>

						<div className="headerText mt-4">Number of Special Requests</div>
						<div className="numberInput mt-2">
								<input type="number" className="smallInput" defaultValue={0}></input>
						</div>

						<button className="mt-4 mb-4">Submit</button>
					


					


							

					</div>
				</div>
			</div>
    )
}
export default PublicReservation;