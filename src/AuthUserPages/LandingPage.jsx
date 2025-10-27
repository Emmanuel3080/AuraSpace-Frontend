import React from "react";

import "../AuthStyles/SelectAccount.css";

import "../MediaQuery/AccountType.css";

const LandingPage = () => {
  return (
    <div className="account-Section">
      <h2
        style={{ textAlign: "center", marginTop: "20px" }}
        className="auraTitle"
      >
        {/* Aura<sup>Space</sup> */}
        AuraSpace
      </h2>
      <div className="accountText">
        <h2 style={{ textAlign: "center" }} className="accountTitle">
          Create An Account
        </h2>
        <h2 style={{ textAlign: "center" }} className="accountSubTitle">
          Select your account type to continue with the registration process.
        </h2>
        <div className="account-container">
          <div className="account-users">
            <div className="userTypeSec">
              <div className="userText">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div>
                <p className="userType">Attendes</p>
              </div>
            </div>

            <p className="userTypeRole">Sign Up as an Attendee</p>
            <p className="userTypeRole">
              Explore a wide variety of events, from concerts and conferences to
              workshops and festivals. Book tickets, save your favorite events,
              and join vibrant communities with just a few clicks.
            </p>
            <button className="continue-button">
              <a href="/user/signup" className="userTypeLink">
                Continue as User
              </a>
            </button>
          </div>
          <div className="account-users">
            <div className="userTypeSec">
              <div className="userText">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div>
                <p className="userType">Event Manager</p>
              </div>
            </div>
            <p className="userTypeRole">Sign Up as an Event Mananger</p>
            <p className="userTypeRole">
              Access to powerful tools to create and manage your events with
              ease. Publish event details, set ticket pricing, monitor
              registrations, and track sales in real-time.
            </p>
            <button className="continue-button">
              <a href="/admin/signup" className="userTypeLink">
                Continue as Event Manager
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
