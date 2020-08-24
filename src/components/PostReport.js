import React, { Component } from 'react'


class PostReport extends Component {
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
    this.setState({ nameError: "" });
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
      this.state.name !== "" )
      {
      this.computePost()

    } else {
      console.log("nein");
    }
  }





  async computePost() {
    console.log(this.state.chosenDay);
    console.log(this.state.name);
    console.log("*ehh yo*");
    let week = this.state.chosenDay;
    let text = this.state.name;
    //http://localhost:8333/logg
    //https://webhook.site/7ec34c58-bff5-4050-9201-4f83ab6dd210
    try {
        let result = await fetch('http://localhost:8333/reports/create_update', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              week: week,
              text: text
            })
        }).then(this.submitted());
    } catch(err) {
        console.log("*error*");
        console.log(err);
        console.log("**catch**");
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

  //PART 2
  //Creates arrays with years and days
  componentDidMount() {

    var varDay = [];


    //creates data for the day list
    for (let i = 1; i <= 10; i++) {
        let x = 1;
        varDay.push({id: x, name: i.toString()});
        x++;
    }
    //creates data for the month lists
    this.setState({
      day: varDay
    })
  }





  render() {
    const { day } = this.state;

    let dayList = day.map((item, i) => {
      return (
        <option key={i} value={item.name}>{item.name}</option>
      )
    });

    //Draws out the form
    if (this.state.submitta == 0) {
      return (
        <div className="form-wrapper">
          <div>
            <h4>Create / update week</h4>
            <form onSubmit={this.handleSubmit} noValidate method="post">
              <div className="date">
                <label htmlFor="date">week</label>
                <div>
                  <select
                    type="text"
                    className="myDate"
                    onChange={this.handleDay}
                  >
                    {dayList}
                  </select>
                </div>
              </div>

              <div className="name">
                <label htmlFor="name">Text</label>
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


              <div className="createAccount">

                <button type="submit" className="myButton">Create / update</button>

              </div>

              </form>
          </div>
        </div>
      )
    } else if (this.state.submitta == 1) {
      return (
        <div className="form-wrapper">
          <div>
            <h5>You have created or updated report. </h5>
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
