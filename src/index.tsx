import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Route} from  'react-router-dom'
import Top from './page/top'
import Layout from './layout/layout'
ReactDOM.render(
  <React.StrictMode>
   <Router>
    <App> 
      <Route exact path="/" component={Top}></Route>
      <Route path="/users/:uid" component={Layout}></Route>
      <Route path="/myevents" component={Layout}></Route>
      <Route path="/creation" component={Layout}></Route>
      <Route exact path="/events" component={Layout}></Route>
      <Route path="/events/:id" component={Layout}></Route>
      <Route path="/search" component={Layout}></Route>
      <Route path="/guid" component={Layout}></Route>
      <Route path="/dm" component={Layout}></Route>
      <Route path="/config" component={Layout}></Route>
    </App>
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
