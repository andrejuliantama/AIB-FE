import '../styles/pages/home.scss';
import React, {Component, useState, useEffect} from 'react';
import Zoom from 'react-reveal/Zoom';
import {
  Link
} from "react-router-dom";

const Home = () =>{
	return(
		<div className="home">
			
			<div className="body">
			<Zoom>
				<div className="row justify-content-even align-items-center">
					<div className="col line justify-content-center" />
						<span className="col header">
							II4042 - Kecerdasan Buatan untuk Bisnis
						</span>
						<div className="col line" />
				</div> 
				<div className="subHeader mt-4 mb-4">
					Implementasi <i>Random Forest Resgression</i> pada Sistem Konkuren untuk Memprediksi Rata-rata Pengeluaran Konsumen Hotel (<i>Average Daily Spending </i>(ADR))
				</div>
				<div className="subHeader mt-4 mb-4">
					dibuat oleh:
				</div>
				<div className="subHeader mt-4">
					18217028 - Nicholaus Danispadmanaba Yosodipuro
				</div>
				<div className="subHeader mt-2">
					18217031 - Muhammad Fiqri Fatriansyah
				</div>
				<div className="subHeader mt-2">
					18217040 - Andre Juliantama
				</div>

				</Zoom>
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
						<Link to="/pages/admin/features">
							<div className="navigation mt-2">
								Feature Impotance
							</div>
						</Link>
						<div className="space mr-2" />
					</div>
				</div>
				
			</div>
			
		</div>
		
	)
}
export default Home;