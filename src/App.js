import { Component } from 'react';
import { Octokit } from "@octokit/core";
import ButtonForm from "./Components/ButtonForm";
import { FaSearchPlus } from 'react-icons/fa';
import Release from './Components/Release'
import './App.css';

const octokit = new Octokit();
// localStorage.clear();
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

  handleSubmit = (event) => { //  remove logic and test with dummy
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
          releaseData = releaseData.concat(
            {
              owner: owner,
              repository: repo,
              id: response.data[0].id,
              seen: false,
              releaseNotes: response.data[0].body
            })
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

  render() {
    return (
      <div className='parent_container'>
        <div className='left_panel'>
          <div className='button_slide'>
            <FaSearchPlus size={36} />
            <div className="button_inner">
              <ButtonForm handleSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
        <div className='middle_panel'>
          <div className='collection_container'>
            {null === this.state.data ? "no data" : 
            this.state.data.map((release, index) => {
              return <Release {... release} handleReleaseClick={this.handleSeen.bind(this)} key={release.id} />
            })}
          </div>
        </div>
        <div className='right_panel'></div>
      </div>
    );
  }
}


export default App;
