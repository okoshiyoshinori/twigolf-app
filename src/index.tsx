import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Route} from  'react-router-dom'
import Top from './page/top'
import Home from './page/home'
ReactDOM.render(
  <React.StrictMode>
   <Router>
    <App> 
      <Route exact path="/" component={Top}></Route>
      <Route path="/home" component={Home}></Route>
    </App>
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
