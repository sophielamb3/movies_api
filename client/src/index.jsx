import React from 'react';
import ReactDOM from 'react-dom';

import {MainView} from './components/main-view/main-view';

//Import statement to indicate you need to bundle './index.scss'
import './index.scss';

//Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView/>;
  }
}

//Find root of your app
const container = document.getElementsByClassName('app-container') [0];

//Tells react to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
