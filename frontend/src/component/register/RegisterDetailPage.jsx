import React, { Component } from 'react'
import UserRegisterApiServices from '../../services/UserRegisterApiServices';

export default class RegisterDetailPage extends Component {
  //constructor
  constructor(props) {
    super(props);

    //state
    this.state = {
      id: this.props.match.params.id,
      registerDto: {} //içi boş 
    }
    //bind
  }  //end constructor

  //cdm ==>TAB
  //1-) Constructor
  //2-) Render
  //3-) CDM

  //CDM
  componentDidMount() {
    UserRegisterApiServices.getFindByRegister(this.state.id).then(
      response => this.setState({
        registerDto: response.data
      })
    );
  }

  //functiron start
  //functiond end

  //render
  render() {
    //Js kodları buraya
    const {id,uname,passwd,email,check}=this.state.registerDto;
    //RETURN
    return (
      <>
      <div className="container">
        <div className="row">
          <div className="card mt-5 shadow" style={{padding:"1rem"}}>
          <div className="card-body">
            <h4 className="card-title">Register Details Page</h4>
            <p className="card-title"><i className="fa-solid fa-fingerprint"></i>: {id} </p>
            <p className="card-text"><i className="fa-solid fa-user"></i>: {uname}</p>
            <p className="card-text"><i className="fa-solid fa-key"></i>: {passwd}</p>
            <p className="card-text"><i className="fa-solid fa-envelope-circle-check"></i>: {email}</p>
            <p className="card-text"><i className="fa-solid fa-envelope-circle-check"></i>: {check}</p>
            <p className="card-text text-danger ">  <i className="fa-solid fa-clock"></i>: {this.state.registerDto.createdDate}</p>
          </div>
        </div></div>
      </div>
      </>
    ) //end return
  } // end render
} //end RegisterDetailPage
