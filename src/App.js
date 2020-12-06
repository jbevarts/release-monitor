import { Component } from 'react';
import { Octokit } from "@octokit/core";
import ButtonForm from "./Components/ButtonForm";
import { ImSearch } from 'react-icons/im';
import { IoReload } from 'react-icons/io5';
import Release from './Components/Release';
import './App.css';

const octokit = new Octokit();

class App extends Component {

  constructor(props) {
    super(props);
    var releaseMonitorData = JSON.parse(localStorage.getItem('release-monitor-data'));
    this.state = {data: releaseMonitorData};
  }


  handleSeen = (id) => {
    let seen = this.state.data.find((elem) => elem.id === id);
    seen.seen = true;
    let array = this.state.data;
    let index = array.findIndex((elem) => elem.id === id);
    array.splice(index, 1, seen);
    this.setState({data: array});
    localStorage.setItem('release-monitor-data', JSON.stringify(array));
  }

  handleSubmit = (event) => { 
    event.preventDefault();

    let owner = event.target[0].value;
    let repo = event.target[1].value;

    octokit.request('GET /repos/{owner}/{repo}/releases', {
      owner: owner,
      repo: repo
    })
    .then((response) => {
      if (response.status === 200 && !(response.data === undefined || response.data.length === 0)) {
        let releaseData = this.state.data === null ? [] : this.state.data;
        let exists = releaseData.find((elem) => elem.id === response.data[0].id );
        if (!exists) {
          let newData = [
            {
              owner: owner,
              repository: repo,
              id: response.data[0].id,
              seen: false,
              releaseNotes: response.data[0].body
            }];
          releaseData = newData.concat(releaseData);
        
        } 
        this.updateState(releaseData);
      }
    })
    .catch((err) => console.log(err));
  }

  updateState = (releaseData) => {
    this.setState({data: releaseData});
    localStorage.setItem('release-monitor-data', JSON.stringify(releaseData));
  }

  handleReload(event) {
    this.handleReloadHelper(event);
  }

  handleReloadHelper(event) {
    let currentState = this.state.data;
    var promises = [];

    currentState.forEach((elem, index) => {
      promises.push(
        octokit.request('GET /repos/{owner}/{repo}/releases', {
          owner: elem.owner,
          repo: elem.repository
        })
        .then((response) => {
          if (response.data[0].id !== elem.id) {
            let newElem = elem;
            newElem.releaseNotes = response.data[0].body;
            newElem.id = response.data[0].id;
            newElem.seen = false;
            return newElem;
          } else {
            let newElem = elem;
            return newElem;
          }
        })
      )
    });
    Promise.all(promises).then((finishedPromises) => {
      this.handleShuffle(finishedPromises);
      this.updateState(finishedPromises);
      window.location.reload();
    });
}

handleShuffle(array) {
  array.sort((a, b) => {
    if (a.seen && b.seen) {
      return 0;
    } else if (a.seen) {
      return 1;
    } else if (b.seen) {
      return -1;
    } else {
      return 0;
    }
  })
}

handleCollection() {
  let data = this.state.data;
  this.handleShuffle(data);
  return data.map((release, index) => {
    return <Release {... release} handleReleaseClick={this.handleSeen.bind(this)} key={release.id} />
  })
}

  render() {
    return (
      <div className='parent_container'>
        <div className='left_panel'>
          <div className='button_slide'>
            <ImSearch size={80} />
            <div className="button_inner">
              <ButtonForm handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
        <div className='middle_panel'>
          <div className='collection_container'>
            {null === this.state.data ? "no data" : this.handleCollection()}
          </div>
        </div>
        <div className='right_panel'>
          <div className='refresh_button' onClick={this.handleReload.bind(this)}>
          <IoReload size={100} style={{float: 'left'}}/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
