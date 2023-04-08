// rcc ==> TAB
// classlar state bir yapıdadır. state yazarız: statefull
// unutma: classta return vardır.
// JSX => JS  almak istiyorsanız {} eklemelisiniz.
// JSX => CSS almak istiyorsanız {{}} eklemelisiniz.
// JSX ==> Fonkiyonlarda ve props başına mutlaka this yazmalısınız.

// life cycle 
// 1-) constructor 
// 2-) render
// 3-) CDM

import React, { Component } from 'react'
import UserRegisterApiServices from '../../services/UserRegisterApiServices';


export default class CreateOrUpdateRegister extends Component {
    //constructor 
    constructor(props) {
        super(props);

        //STATE :default value
        this.state = {
            id: this.props.match.params.id,
            username: "",
            email: "",
            passwd: "",
            check:true
        }

        //BIND
        this.homePage = this.homePage.bind(this);
        // Satırda yapacağım => this.cancel = this.cancel.bind(this);
        this.titleDynamicsSaveOrUpdate = this.titleDynamicsSaveOrUpdate.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePasswd = this.onChangePasswd.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeCheck = this.onChangeCheck.bind(this);

        
    }

    //CDM 
    componentDidMount() {
        //EKLEME     => undefined 
        //GÜNCELLEME => 1

        //EKLEME 
        if (this.state.id === "create") {
            return;
        } else { //GÜNCELLEME
            UserRegisterApiServices.getFindByRegister(this.state.id).then(
                response => {
                    const registerDto = response.data;
                    console.log(registerDto);
                    this.setState({
                        username: registerDto.username,
                        email: registerDto.email,
                        passwd: registerDto.passwd,
                        check: !registerDto.check,
                    })//end setState
                }//end response
            ).catch(error => {
                alert("Güncelle hatası")
            })//end catch
        } //end else
    }//end  componentDidMount

    //FUNCTION
    //HOME
    homePage() {
        return this.props.history.push("/")
    }

    //CANCEL
    cancel() {
        return this.props.history.push("/add-register")
    }

    //Dynamics Save or update 
    titleDynamicsSaveOrUpdate() {
        if (this.state.id === "create") {
            return <h1 className="text-center mt-3 display-3 text-primary">REGISTER CREATE</h1>
        } else
            return <h1 className="text-center mt-3 display-3 text-primary">REGISTER UPDATE</h1>
    }

    //FORM
    //username
    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    //password
    onChangePasswd = (event) => {
        this.setState({
            passwd: event.target.value
        });
        console.log(this.state.passwd);
    }

    //email
    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

     //isActive
    onChangeCheck = (event) => {
      this.setState({
        check: !this.state.check
      });
  }

    //SUBMIT 
    saveOrUpdateUserRegister = (event) => {
        //browser sen dur !!! birşey yapma 
        event.preventDefault();

        //CDM => registerDto doldurmuştuk
        const registerDto = {
            username: this.state.username,
            email: this.state.email,
            passwd: this.state.passwd,
            check: this.state.check,
        }
        console.log(this.state.check)

        //Eğer Create => createRegister
        if (this.state.id === "create") {
            UserRegisterApiServices.createRegister(registerDto).then(
                response => {
                    if (response.status === 200) {
                        this.props.history.push("/")
                    }
                }
            ).catch(err => {
                console.log("Create Wrong" + err.response.data)
            })
        } else {//UPDATE
            UserRegisterApiServices.updateRegister(this.state.id, registerDto).then(
                response => {
                    if (response.status === 200) {
                        this.props.history.push("/")
                    }
                } // end response
            ).catch(err => {
                console.log("Update Wrong" + err.response.data)
            })// endcatch
        } // end else 
    } //end saveOrUpdateUserRegister

    //RENDER
    render() {
        return (
            <>
                {this.titleDynamicsSaveOrUpdate()}
                <div className="container">
                    <div className="row">
                        <form action="">

                            {/* username */}
                            <div className="form-group mb-3">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" className="form-control" placeholder="Kullanıcı adınız" onChange={this.onChangeUsername} value={this.state.username} />
                            </div>

                            {/* passwd */}
                            <div className="form-group mb-3">
                                <label htmlFor="passwd">passwd</label>
                                <input type="text" name="passwd" id="passwd" className="form-control" placeholder="Kullanıcı şifreniz" onChange={this.onChangePasswd} value={this.state.passwd} />
                            </div>

                            {/* email */}
                            <div className="form-group mb-3">
                                <label htmlFor="email">email</label>
                                <input type="text" name="email" id="email" className="form-control" placeholder="Kullanıcı email" onChange={this.onChangeEmail} value={this.state.email} />
                            </div>
                            
                            {/* isActive */}
                            <div className="form-group mb-3">
                                <label htmlFor="check">check</label>
                                <input type="checkbox" name="check" id="check"  onChange={this.onChangeCheck}  />
                            </div>

                            {/* submit */}
                            <div className="form-group mt-3 mb-3">
                                <button className="btn btn-danger" onClick={this.cancel.bind}>Temizle</button>
                                <button className="btn btn-primary ms-2" onClick={this.saveOrUpdateUserRegister}>Gönder</button>
                                <button className="btn btn-success ms-2" onClick={this.homePage}>Anasayfa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    } // end render
} // end class
