import '../../styles/pages/public/reservation.scss';
import React, {Component, useState, useEffect} from 'react';
import { Radio } from "../../components/radio.js";
import Jump from 'react-reveal/Jump';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Modal from 'react-modal';
import {
  Link
} from "react-router-dom";
import Axios from 'axios';

window.$sesi = new Array();

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const PublicReservation = () =>{
	const [email, setEmail] = useState("");
	const [hotel, setHotel] = useState("");
	//reservation date
	const [revDate, setRevDate] = useState("");
	const [revMon, setRevMon] = useState("");
	const [revYear, setRevYear] = useState("");

	//arrival date
	const [arrDate, setArrDate] = useState("");
	const [arrMon, setArrMon] = useState("");
	const [arrYear, setArrYear] = useState("");
	const [arrWeek, setArrWeek] = useState("");

	//leave date
	const [leaveDate, setLeaveDate] = useState("");
	const [leaveMon, setLeaveMon] = useState("");
	const [leaveYear, setLeaveYear] = useState("");

	//guests
	const [adults, setAdults] = useState(1);
	const [children, setChildren] = useState(0);
	const [babies, setBabies] = useState(0);

	const [meal, setMeal] = useState("");
	const [country, setCountry] = useState("Asia");
	const [channel, setChannel] = useState("");
	const [room, setRoom] = useState("A");
	const [customer, setCustomer] = useState("Contract");
	const [deposit, setDeposit] = useState("");

	const [car, setCar] = useState(0);
	const [request, setRequest] = useState(0);

	const [modalText, setModalText] = useState("");

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

	const months = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
  const sesi = window.$sesi;

  function handleChange(e) {
    window.$sesi[e.target.name] = e.target.value;
    console.log(e.target.name + " changed to "+e.target.value)
	}

	function handleEmail(e){
		setEmail(e.target.value)
	}

	function handleCountry(e){
		setCountry(e.value)
	}

	function handleRoom(e){
		setRoom(e.value)
	}

	//guests
	function handleAdult(e){
		setAdults(e.target.value)
	}
	function handleChildren(e){
		setChildren(e.target.value)
	}
	function handleBabies(e){
		setBabies(e.target.value)
	}

	//arrival date
	function handleArrivalDate(e){
		setArrDate(e.target.value)
	}
	function handleArrivalMonth(e){
		const arrIdx = e.target.value
		setArrMon(months[arrIdx-1])
	}
	function handleArrivalYear(e){
		setArrYear(e.target.value)
	}

	//reservation date
	function handleRevDate(e){
		setRevDate(e.target.value)
	}
	function handleRevMonth(e){
		setRevMon(e.target.value)
	}
	function handleRevYear(e){
		setRevYear(e.target.value)
	}

	//leave date
	function handleLeaveDate(e){
		setLeaveDate(e.target.value)
	}
	function handleLeaveMonth(e){
		const arrIdx = e.target.value
		setLeaveMon(months[arrIdx-1])
	}
	function handleLeaveYear(e){
		setLeaveYear(e.target.value)
	}

	const weekNights = async(leaveYear, leaveMonth, leaveDay, arrivalYear, arrivalMonth, arrivalDay) => {
		const arrivalMonthConv = await monthConverter(arrivalMonth)
  		const dayDiff = await leadTime(leaveYear, leaveMonth, leaveDay, arrivalYear, arrivalMonthConv, arrivalDay);
  		const arrivalDate = new Date(arrivalYear, arrivalMonthConv - 1, arrivalDay);
  		let weekEndNights = 0;
  		let weekDayNights = 0;
  		let dayNumIter = arrivalDate.getDay();
  		for (let i=0; i < dayDiff; i++) {
    		if (dayNumIter === 0) {
      			weekEndNights += 1;
      			dayNumIter+=1;
    		} else if (dayNumIter === 6) {
      			weekEndNights +=1;
      			dayNumIter = 0;
    		} else {
      			weekDayNights +=1;
      			dayNumIter+=1;
   		 	}
  		}
  			return {
    			week_nights: weekDayNights,
    			weekend_nights: weekEndNights,
  			}
	}
	
	const monthConverter = async(month) => {
		if (typeof month === 'string') {
			const monthMap = {
				January :1,
				February:2,
				March :3,
				April:4,
				May :5,
				June:6,
				July:7,
				August: 8,
				September: 9,
				October: 10,
				November: 11,
				December: 12
			}
			return monthMap[month];
		}
		return month;
	}
	
	
	const arrivalDateWeekNumber = async(year, month, day) => {
		// calculate difference from January 1
		const daysSinceJanuary1 = await leadTime(year, month, day, year, 1, 1);
		let weekNumber = Math.ceil(daysSinceJanuary1 / 7);
		if (weekNumber === 0) {
		  weekNumber += 1;
		}
		return weekNumber;
	}
	
	const leadTime = async(arrivalYear, arrivalMonth, arrivalDay, reservationYear, reservationMonth, reservationDay) => {
		const arrivalMonthConv = await monthConverter(arrivalMonth);
		const arrivalDate = new Date(arrivalYear, arrivalMonthConv-1, arrivalDay);
		const reservationDate = new Date(reservationYear, reservationMonth-1, reservationDay);
		const secondsDiff = (arrivalDate.valueOf() - reservationDate.valueOf()) / 1000;
		const hours = secondsDiff / 3600;
		const days = Math.ceil(hours / 24);
		return days;
	}

	function handleCustomer(e){
		setCustomer(e.value)
	}

	function handleCar(e){
		setCar(e.target.value)
	}

	function handleRequest(e){
		setRequest(e.target.value)
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
		window.$sesi['car'] = car;
		window.$sesi['request'] = request;
    console.log(
			'email: '+window.$sesi['email']+
			'hotel: '+window.$sesi['hotel']+
			', meal: '+window.$sesi['meal']+
			', country: '+window.$sesi['country']+
			', channel: '+window.$sesi['channel']+
			'room: '+window.$sesi['room']+
			', deposit: '+window.$sesi['deposit']+
			'customer: '+window.$sesi['customer']+
			'car: '+window.$sesi['car']+
			'request: '+window.$sesi['request']
			)  
	});

	const onSubmit = async (e) =>{
		const week_obj= await weekNights(parseInt(leaveYear), leaveMon, parseInt(leaveDate),parseInt(arrYear), arrMon, parseInt(arrDate))
		const week_nights = week_obj.week_nights
		const weekend_nights = week_obj.weekend_nights
		const op1 = leadTime(parseInt(arrYear), arrMon, parseInt(arrDate), parseInt(revYear), parseInt(revMon), parseInt(revDate))
		const op2 = arrivalDateWeekNumber(parseInt(arrYear), parseInt(arrMon),parseInt(arrDate))		
		
		const [lead, week_number] = await Promise.all([op1, op2])
		

		let data ={
				email: email,
				booking_info:{
					hotel: hotel,
					is_canceled: 0,
					lead_time: lead,
					arrival_date_year: parseInt(arrYear),
					arrival_date_month: arrMon,
					arrival_date_week_number: week_number,
					arrival_date_day_of_month: parseInt(arrDate),
					stays_in_weekend_nights: weekend_nights,
					stays_in_week_nights: week_nights,
					adults: parseInt(adults),
					children: parseInt(children),
					babies: parseInt(babies),
					meal: meal,
					country: country,
					market_segment: channel,
					distribution_channel: channel,
					is_repeated_guest: 1,
					reserved_room_type: room,
					deposit_type: deposit,
					customer_type: customer,
					reservation_status: "Check-Out",
					reservation_status_date_year: parseInt(revYear),
					reservation_status_date_month: parseInt(revMon),
					reservation_status_date_day: parseInt(revDate),
					agent: 101,
					days_in_waiting_list: 0,
					required_car_parking_spaces: parseInt(car),
					total_of_special_requests: parseInt(request),
					booking_changes: 0
				}
		
		}

		let config ={
			method: 'post',
			url: 'http://159.65.129.134/api/public/reservation',
			headers:{
				'Content-Type':'application/json',
			},
			data:data
		};

		Axios(config)
		.then((response) =>{
			console.log(response)
			setModalText("Data berhasil dikirim")
			openModal()
		})
		.catch(function (error){
			console.log(data)
			console.log(error)
			setModalText("Terjadi kesalahan. Silahkan coba lagi")
			openModal()
		})
	}
	var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#000000';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

    return(
			<div className="reservation">
				
				<div className="body">
					<div className="row justify-content-even align-items-center">
						<div className="col line justify-content-center" />
						<Jump>
							<span className="col header">
								Please Fill This Form!
						</span>
						</Jump>
						<div className="col line" />
					</div> 
					<div className="form mt-4">
						<div className="headerText">Your Email</div>
						<input type="email" className="mt-2 " onChange={handleEmail} placeholder="example@mail.com"></input>

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
								<input type="number" className="smallInput" onChange={handleRevDate} placeholder="30"></input>
							</div>
							<div className="numberInput mr-4">
								<div className="text mb-1">Month</div>
								<input type="number" className="smallInput" onChange={handleRevMonth} placeholder="9"></input>
							</div>
							<div className="numberInput">
								<div className="text mb-1">Year</div>
								<input type="number" className="smallInput" onChange={handleRevYear} placeholder="2017"></input>
							</div>
						</div>

						<div className="headerText mt-4">Arrival Date</div>
						<div className="row mt-2">
							<div className="numberInput mr-4">
								<div className="text mb-1">Date</div>
								<input type="number" className="smallInput" onChange={handleArrivalDate} placeholder="3"></input>
							</div>
							<div className="numberInput mr-4">
								<div className="text mb-1">Month</div>
								<input type="number" className="smallInput" onChange={handleArrivalMonth} placeholder="11"></input>
							</div>
							<div className="numberInput">
								<div className="text mb-1">Year</div>
								<input type="number" className="smallInput" onChange={handleArrivalYear} placeholder="2017"></input>
							</div>
						</div>

						<div className="headerText mt-4">Leave Date</div>
						<div className="row mt-2">
							<div className="numberInput mr-4">
								<div className="text mb-1">Date</div>
								<input type="number" className="smallInput" onChange={handleLeaveDate} placeholder="5"></input>
							</div>
							<div className="numberInput mr-4">
								<div className="text mb-1">Month</div>
								<input type="number" className="smallInput" onChange={handleLeaveMonth} placeholder="11"></input>
							</div>
							<div className="numberInput">
								<div className="text mb-1">Year</div>
								<input type="number" className="smallInput" onChange={handleLeaveYear} placeholder="2017"></input>
							</div>
						</div>

						<div className="headerText mt-4">Guests</div>
						<div className="row mt-2">
							<div className="numberInput mr-4">
								<div className="text mb-1">Adults</div>
								<input type="number" className="smallInput" onChange={handleAdult} defaultValue={1}></input>
							</div>
							<div className="numberInput mr-4">
								<div className="text mb-1">Children</div>
								<input type="number" className="smallInput" onChange={handleChildren} defaultValue={0}></input>
							</div>
							<div className="numberInput">
								<div className="text mb-1">Babies</div>
								<input type="number" className="smallInput" onChange={handleBabies} defaultValue={0}></input>
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
						<Dropdown className="dropdown mt-2 smallDrop" options={rooms} onChange={handleRoom} value={defaultRoom} placeholder="Select a country" />

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
								<input type="number" className="smallInput" onChange={handleCar} defaultValue={0}></input>
						</div>

						<div className="headerText mt-4">Number of Special Requests</div>
						<div className="numberInput mt-2">
								<input type="number" className="smallInput" onChange={handleRequest} defaultValue={0}></input>
						</div>

						<button className="mt-4 mb-4" onClick={(e) => {onSubmit(e)}}>Submit</button>

					</div>

					<Modal
						isOpen={modalIsOpen}
						onAfterOpen={afterOpenModal}
						onRequestClose={closeModal}
						style={customStyles}
					>
	
						<h2 ref={_subtitle => (subtitle = _subtitle)}>{modalText}</h2>
						<button onClick={closeModal}>close</button>
						
					</Modal>

				</div>
				<div className="bottomBar">
						<div className="row justify-content-between align-items-center mt-1">
							<div className="space ml-2" />
							<Link to="/">
								<div className="navigation mt-2">
								Back to Home
								</div>
							</Link>
							<div className="separatorV" />
							<Link to="/pages/admin/reservation">
								<div className="navigation mt-2">
									Admin Console Reservation History
								</div>
							</Link>
							<div className="separatorV" />
							<Link to="/pages/admin/features">
								<div className="navigation mt-2">
									Feature Importance
								</div>
							</Link>
							<div className="space mr-2" />
						</div>
					</div>
			</div>
    )
}
export default PublicReservation;