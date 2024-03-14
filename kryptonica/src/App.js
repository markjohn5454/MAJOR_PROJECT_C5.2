import './App.css';
import LoginMain from './components/LoginMain.js';
import {BrowserRouter ,  Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import AgentLogin from "./components/AgentLogin"
import StudentLogin from './components/StudentLogin'
import MainLogin from './components/MainLogin'
import 'bootstrap/dist/css/bootstrap.min.css';
import Certificate from './components/Certificate.js';
import Web3 from 'web3';
import React,{Component} from 'react';

class App extends Component{
  
  async UNSAFE_componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockchainData()
  }

  
  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('No Ethereum')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    this.setState({account:account[0]})
    console.log(account)
  }
  
  constructor(props){
    super(props)
    this.state = {
      account: '0x0',
    }
  }
  
  render(){
    return (
      <div>
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path = "/LoginMain"  element = {<LoginMain/>}/>
          <Route path = "/AgentLogin"  element = {<AgentLogin/>}/>
          <Route path = "/StudentLogin"  element = {<StudentLogin/>}/>
          <Route path = "/MainLogin"  element = {<MainLogin/>}/>
          <Route path = "/Certificate"  element = {<Certificate/>}/>
        </Routes>
      </BrowserRouter>
        <div className='text-center'></div>
        <div account={this.state.account}></div>
      </div>
    )
  }
}



export default App;
