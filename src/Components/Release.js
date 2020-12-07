import React, { Component } from 'react';
import { GoTag } from 'react-icons/go';
import { MdFiberNew } from 'react-icons/md'
import { FcCancel } from 'react-icons/fc'


class Release extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: !props.seen ? 'linear-gradient(to left, #dfaa3a, #dfaa3a)' : 'linear-gradient(to left, #565996, #9d9fc7)',
      owner: props.owner, 
      repository: props.repository, 
      seen: props.seen, 
      selected: props.selected, 
      id: props.id, 
      height: '12vh',
      releaseNotes: props.releaseNotes
    };
  }

  handleClick = (e) => {
    if (e.target.parentElement.className.baseVal === 'cancel' || e.target.parentElement.className === 'release_right_panel') {
      this.handleRemove(e);
    } else {
      let selected, height, seen, color;
      
      if (!this.state.selected) {
        selected = true;
        height = '50%';
      } else {
        selected = false;
        height = '12vh';
      }
      
      if (!this.state.seen) {
        color = 'linear-gradient(to left, #565996, #9d9fc7)';
        seen = true;
      } else {
        color = this.state.color;
        seen = true;
      }
      this.props.handleReleaseClick(this.state.seen, this.state.selected, this.state.id);
      this.setState({color: color, seen: seen, height: height, selected: selected});
    }
  }

  handleRemove = (event) => {
    this.props.handleRemove(this.state.id);
  }

  render() {
    return (
        <div className='release' id={this.state.id} key={this.state.id} onClick={this.handleClick.bind(this)} style={{ backgroundImage: this.state.color, height: this.state.height}}>
            {this.state.height === '50%' ? <div className='release_notes'>{this.state.releaseNotes}</div> : 
            <div className='release_banner'>
              <div className='release_left_panel'>
                <GoTag size={55} />
                {this.state.seen === false ? <MdFiberNew size={55}/> : null }
              </div>
              <div className='release_middle_panel'>
                <div className='label'>{this.state.owner}</div><br />
                <div className='label'>{this.state.repository}</div>
              </div>
              <div className='release_right_panel'>
                <FcCancel className='cancel' size={30} />
              </div>
            </div>}
            
        </div>
        
    );
  }
}

export default Release;