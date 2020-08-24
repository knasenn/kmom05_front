import React, { Component } from 'react'


class PostReport extends Component {
  //Constructor
  constructor(props) {
    super(props);

    this.state = {
      week: 0,
      text: '',
      submitta: 0
    };
  }

  //Sets value for week
  handleWeek = (event) => {
    this.setState({week: event.target.value});
  }

  //Sets value for text
  handleText = (event) => {
    this.setState({text: event.target.value});
  }



  //Checks if email is OK
  handleChangeWeek = (event) => {
    event.preventDefault();
    console.log(event);
  }




  //Checks if email is OK
  handleChangeText = (event) => {
    event.preventDefault();
    console.log(event);
  }









  //Executes on submit
  handleSubmit = (event) => {
    event.preventDefault();


    if (this.state.week !== 0 ) {
      // this.computePost()
      console.log("yazz");

    } else {
      console.log("nein");
    }
  }





  async computePost() {
    console.log(this.state.week);
    console.log(this.state.text);
    console.log("*PU!*");
    //http://localhost:8333/logg
    //https://webhook.site/7ec34c58-bff5-4050-9201-4f83ab6dd210
    try {
        let result = await fetch('http://localhost:8333/login/login_user', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
        }).then(this.submitted());
    } catch(err) {
        console.log("*error*");
        console.log(err);
        console.log("**catch**");
        this.submitted_user_exist()
    }
  }


  submitted() {
    this.state.submitta = 1;
    this.forceUpdate();
  }





  // submit_form() {
  //   console.log("yehawzzz!!!");
  //   console.log(this.state);
  //   this.compPost()
  //   console.log("yehawzzz!!!");
  // }




  render() {


    //Draws out the form
    if (this.state.submitta == 0) {
      return (
        <div className="form-wrapper">
          <div>
            <h4>Create </h4>
            <form onSubmit={this.handleSubmit} noValidate method="post">
            <div className="date">
              <label htmlFor="date">Birthday</label>
              <div>
                <select
                  type="text"
                  className="myDate"
                  onChange={this.handleYear}
                >
                  {yearList}
                </select>
                <select
                  type="text"
                  className="myDate"
                  onChange={this.handleMonth}
                >
                  {monthList}
                </select>
                <select
                  type="text"
                  className="myDate"
                  onChange={this.handleDay}
                >
                  {dayList}
                </select>
              </div>
            </div>

              <div className="password">
                <label htmlFor="password">Text</label>
                <input
                  type="text"
                  className="mytext"
                  placehodler="text"
                  name="text"
                  onChange={this.handleChangeText}
                />
              </div>
              <div className="createAccount">

                <button type="submit" className="myButton">Create Account</button>

              </div>

              </form>
          </div>
        </div>
      )
    } else if (this.state.submitta == 1) {
      return (
        <div className="form-wrapper">
          <div>
            <h5>You have submitted. Please go to login.</h5>
          </div>
        </div>
      )
    } else {
      return (
        <div className="form-wrapper">
          <div>
            <h4>error</h4>

          </div>
        </div>
      )
  }
}
}

export default PostReport
