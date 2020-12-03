import React, { Component } from 'react';

class Release extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: !props.seen ? '#dfaa3a' : '#5d9447',
      owner: props.owner, 
      repository: props.repository, 
      seen: props.seen, 
      selected: false, 
      id: props.id, 
      height: 'auto',
      releaseNotes: props.releaseNotes
    };
  }

  handleClick = () => {

    if (!this.state.seen) {
      this.props.handleReleaseClick(this.state.id);
      this.setState({color: '#5d9447', seen: true})
    }
    !this.state.selected ? this.setState({selected: true, height: '50%'}) : this.setState({selected: false, height: 'auto'})

  }

  render() {
    return (
        <div className='Release' id={this.state.id} key={this.state.id} onClick={this.handleClick.bind(this)} style={{ backgroundColor: this.state.color, height: this.state.height}}>
            {this.state.height === '50%' ? <div className='release_notes'>{this.state.releaseNotes}</div> : <div className='release_banner'>{this.state.owner}<br/>{this.state.repository}</div>}
        </div>
    );
  }
}

export default Release;