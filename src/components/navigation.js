import React, { Component } from "react";
import "../styles/components/navbar.scss";
import {
  Link
} from "react-router-dom";

export class NavBar extends Component {

  render() {
    const { selected, onChange, text, value } = this.props;
    return (
      <div className="navbar">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span className="title">Healthy Meal Planner!</span>
          </Link>
      </div>
    );
  }
}

