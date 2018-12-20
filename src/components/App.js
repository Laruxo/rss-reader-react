import React, {Component} from 'react';
import '../styles/App.scss';
import Feed from './Feed';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>RSS Feed Reader</h1>
        <Feed/>
      </div>
    );
  }
}

export default App;
