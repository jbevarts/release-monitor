import React, { Component } from 'react';
import '../ButtonForm.css';

class ButtonForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', repository: ''};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleRepoChange = this.handleRepoChange.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleRepoChange = (event) => {
    this.setState({repository: event.target.value});
  }

  handleSubmit = (event) => {
    this.props.handleSubmit(event);
  }

  render() {
    return (
      <div className='button_form_container'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Name<br/><input type="text"  onChange={this.handleNameChange} /></label><br/>
          <label>Repo<br/><input type="text"  onChange={this.handleRepoChange} /></label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default ButtonForm;