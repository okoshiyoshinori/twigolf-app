import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router,Route} from  'react-router-dom'
import Top from './page/top'
import Layout from './layout/layout'
import store from './store'
import {Provider}  from 'react-redux'
import ScrollToTop from './components/scrollToTop'
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
   <Router>
    <ScrollToTop>
    <App> 
      <Route exact path="/" component={Top}></Route>
      <Route path={["/users/:snsid","/events","/events/:id","/search","/guid","/dm","/config","/creation","/pa_management","/compe_management","/combinations/:cid","/about"]}  component={Layout}/>
    </App>
    </ScrollToTop>
   </Router>
   </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
