import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

// import DatePicker from './components/DatePicker.js'



class Report3 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: null
    }
  }

  //SPARA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!?
  // //hämtar fån textfil skriven i markdown
  // componentWillMount() {
  //   // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
  //   fetch(readme).then((response) => response.text()).then((text) => {
  //     this.setState({ termz: text })
  //   })
  // }

  componentDidMount() {
    // Simple GET request using fetch
    // fetch('https://me-api.thisisabad.site/reports/week/3')
    fetch('http://localhost:8333/reports/week/3')
        .then(response => response.json())
        .then(data => this.setState({ text: data.text }));
  }


  render() {
    return (
      <div className="content">
        <h3><a href="https://github.com/knasenn/jsramverk">Github link</a></h3>
        <ReactMarkdown source={ this.state.text } />
      </div>
    )
  }
}

export default Report3
