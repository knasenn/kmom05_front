import React, { Component } from 'react'


class Logg extends Component {
  //Constructor
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      adress: "localhost:8333",
      data: null,
      hits: [],
      submitta: 0
    };
  }

  // //PART 1
  // //Checks if name is OK
  // handleChangeName = (event) => {
  //   this.setState({ name: event.target.value });
  //   // console.log(this.state.name);
  //
  //   for (var i = 0; i < this.state.name.length; i++) {
  //     if (isNaN(this.state.name[i]) === true) {
  //       this.setState({ nameError: "" });
  //     } else {
  //       this.setState({ nameError: "Endas bokstäver" });
  //       break;
  //     }
  //   }
  // }

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


  //Executes on submit
  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("-this.state");
    // console.log(this.state);
    // console.log("-this.state");

    if (
      this.state.emailError === "" &&
      this.state.passwordError === "" &&
      this.state.email !== "" &&
      this.state.password !== "") {
      this.computePost()

    } else {
      console.log("nein");
    }
  }





  async computePost() {
    console.log(this.state.email);
    console.log(this.state.password);
    console.log("*XXXloginXXX*");
    //http://localhost:8333/logg
    //https://webhook.site/7ec34c58-bff5-4050-9201-4f83ab6dd210
    try {
        await fetch('http://localhost:8333/login/login_user', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password
            })
        }).then((response) => response.json())
    .then((responseData) => {
      console.log("555555555555555555555555555555555555555555");
      this.submitted(responseData);

    })
    } catch(err) {
        console.log("*error*");
        console.log(err);
        console.log("**catch**");
        this.submitted_user_exist()
    }
  }


  submitted(data) {
    console.log(data);
    console.log(data.token);
    sessionStorage.setItem('token', data.token);
    let testing = sessionStorage.getItem('token');
    console.log(testing);
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




  render() {


    //Draws out the form
    if (this.state.submitta === 0) {
      return (
        <div className="form-wrapper">
          <div>
            <h4>Login</h4>
            <form onSubmit={this.handleSubmit} noValidate method="post">
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
              <div className="createAccount">

                <button type="submit" className="myButton">Logg in</button>

              </div>

              </form>
          </div>
        </div>
      )
    } else if (this.state.submitta === 1) {
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

export default Logg
