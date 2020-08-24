import React, { Component } from 'react'


class Form extends Component {
  //Constructor
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      chosenYear: '1900',
      chosenMonth: 'Januari',
      chosenDay: '1',
      nameError: '',
      emailError: '',
      passwordError: '',
      submitError: '',
      year: [],
      month: [],
      day: [],
      adress: "localhost:8333",
      data: null,
      hits: [],
      submitta: 0
    };
  }

  //PART 1
  //Checks if name is OK
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
    // console.log(this.state.name);

    for (var i = 0; i < this.state.name.length; i++) {
      if (isNaN(this.state.name[i]) === true) {
        this.setState({ nameError: "" });
      } else {
        this.setState({ nameError: "Endas bokstäver" });
        break;
      }
    }
  }

  //Checks if email is OK
  handleChangeEmail = (event) => {
    // console.log(event.target.value);
    this.setState({ email: event.target.value });
    // console.log(this.state.email);

    for (var i = 0; i < this.state.email.length; i++) {
      if (this.state.email[i].includes("@") !== true) {
        this.setState({ emailError: "Måste finnas @" });
      } else {
        this.setState({ emailError: "" });
        break;
      }
    }
  }

  //Checks if password is OK
  handleChangePassword = (event) => {
    // console.log(event.target.value);
    this.setState({ password: event.target.value });
    // console.log(this.state.password);
    if (this.state.password.length > 11) {
      this.setState({ passwordError: "Max 10 bokstäver" });
    } else {
      this.setState({ passwordError: "" });
    }
  }

  //Sets value for year
  handleYear = (event) => {
    this.setState({chosenYear: event.target.value});
  }

  //Sets value for month
  handleMonth = (event) => {
    this.setState({chosenMonth: event.target.value});
  }

  //Sets value for day
  handleDay = (event) => {
    this.setState({chosenDay: event.target.value});
  }

  //Executes on submit
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("-this.state");
    // console.log(this.state);
    // console.log("-this.state");

    if (
      this.state.nameError === "" &&
      this.state.emailError === "" &&
      this.state.passwordError === "" &&
      this.state.name !== "" &&
      this.state.email !== "" &&
      this.state.password !== "") {
      this.computePost()

    } else {
      console.log("nein");
    }
  }





  async computePost() {
    console.log(this.state.name);
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.chosenYear);
    console.log(this.state.chosenMonth);
    console.log(this.state.chosenDay);
    console.log("*compPostX200!*");
    //http://localhost:8333/logg
    //https://webhook.site/7ec34c58-bff5-4050-9201-4f83ab6dd210
    try {
        await fetch('http://localhost:8333/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              year: this.state.chosenYear,
              month: this.state.chosenMonth,
              day: this.state.chosenDay
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
    this.setState({
      submitta: 1
    })
    this.forceUpdate();
  }





  // submit_form() {
  //   console.log("yehawzzz!!!");
  //   console.log(this.state);
  //   this.compPost()
  //   console.log("yehawzzz!!!");
  // }

  //PART 2
  //Creates arrays with years and days
  componentDidMount() {
    var varYear = [];
    var varDay = [];

    //creates data for the year list
    for (let i = 1900; i <= 2019; i++) {
        let x = 1;
        varYear.push({id: x, name: i.toString()});
        x++;
    }
    //creates data for the day list
    for (let i = 1; i <= 31; i++) {
        let x = 1;
        varDay.push({id: x, name: i.toString()});
        x++;
    }
    //creates data for the month lists
    this.setState({
      year: varYear,
      month: [
        {id: '1', name: 'Januari'},
        {id: '2', name: 'Februari'},
        {id: '3', name: 'Mars'},
        {id: '3', name: 'April'},
        {id: '3', name: 'Maj'},
        {id: '3', name: 'Juni'},
        {id: '3', name: 'Juli'},
        {id: '3', name: 'Augusti'},
        {id: '3', name: 'September'},
        {id: '3', name: 'Oktober'},
        {id: '3', name: 'November'},
        {id: '3', name: 'December'}
      ],
      day: varDay
    })
  }





  render() {
    //Creates the lists
    const { year } = this.state;
    const { month } = this.state;
    const { day } = this.state;
    // console.log("*asdasdasd*");
    // console.log(this.state);
    // console.log("+asdasdasd+");

    let yearList = year.map((item, i) => {
      return (
        <option key={i} value={item.name} >{item.name}</option>
      )
    });

    let monthList = month.map((item, i) => {
      return (
        <option key={i} value={item.name} >{item.name}</option>
      )
    });

    let dayList = day.map((item, i) => {
      return (
        <option key={i} value={item.name}>{item.name}</option>
      )
    });

    //Draws out the form
    if (this.state.submitta === 0) {
      return (
        <div className="form-wrapper">
          <div>
            <h4>Create Account</h4>
            <form onSubmit={this.handleSubmit} noValidate method="post">
              <div className="name">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="mytext"
                  placehodler="Name"
                  name="name"
                  onChange={this.handleChangeName}
                  value={this.state.name}
                />
                <div style={{ color: "red" }}>{this.state.nameError}</div>
              </div>

              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="mytext"
                  placehodler="Email"
                  name="email"
                  onChange={this.handleChangeEmail}
                  value={this.state.email}
                />
                <div style={{ color: "red" }}>{this.state.emailError}</div>
              </div>

              <div className="password">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="mytext"
                  placehodler="Password"
                  name="password"
                  onChange={this.handleChangePassword}
                />
                <div style={{ color: "red" }}>{this.state.passwordError}</div>
              </div>


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


              <div className="createAccount">

                <button type="submit" className="myButton">Create Account</button>
                <small>Already have an account?</small>
              </div>

              </form>
          </div>
        </div>
      )
    } else if (this.state.submitta === 1) {
      return (
        <div className="form-wrapper">
          <div>
            <h5>You have submitted. Please go to login.</h5>s
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

export default Form
