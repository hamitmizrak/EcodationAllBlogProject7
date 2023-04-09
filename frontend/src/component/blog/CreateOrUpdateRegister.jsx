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
            username: null,
            email: null,
            passwd: null,
            check: false,
            read:false,
        }

        //BIND
        this.homePage = this.homePage.bind(this);
        // Satırda yapacağım => this.cancel = this.cancel.bind(this);
        this.titleDynamicsSaveOrUpdate = this.titleDynamicsSaveOrUpdate.bind(this);

        //Destructing kullandığım için bunları kapattım.
        // this.onChangeUsername = this.onChangeUsername.bind(this);
        // this.onChangePasswd = this.onChangePasswd.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onChangeAllInput = this.onChangeAllInput.bind(this);

        this.onChangeRead=this.onChangeRead.bind(this);

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

    //FORM : bunların yerine artık destructing kullanıyorum.
    //username
    /*
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
    onChangeCheck = () => {
        this.setState({
            check: !this.state.check
        });
    }
    */


    // 1.YOL => destructing: az kod çok iş
    // Bütün Change'lerin yaptığını yapacak(username,password,email,isActive)
    /*onChangeAllInput(event){
    const key=event.target.name;
    const value=event.target.value;
    console.log(key+" => "+value)
    this.setState({
        [key]:value
    })
    }*/

    // 2.YOL => Object destructing: az kod çok iş
    // Bütün Change'lerin yaptığını yapacak(username,password,email,isActive)
    // destructing: ortak neler var sorusuna cevap bulmaya çalış.
    onChangeAllInput = (event) => {
        //const key=event.target.name;
        //const value=event.target.value;
        const { name, value } = event.target
        console.log(name + " => " + value)
        this.setState({
            [name]: value
        })
    }

    // okunmadan submit butonu aktif olunmasın
    onChangeRead=(event)=>{
     this.state.read=event.target.checked;
     console.log(this.state.read)
     this.setState({
        read:event.target.checked
     });
    }

    //SUBMIT 
    // destructing: Object destructing: az kod çok iş
    // destructing: ortak neler var sorusuna cevap bulmaya çalış.
    saveOrUpdateUserRegister = (event) => {
        //browser sen dur !!! birşey yapma 
        event.preventDefault();

        //CDM => registerDto doldurmuştuk
        //1.YOL destructing
        const {username,email,passwd,check}=this.state;
        const registerDto = {
            username,email,passwd,check
        }
        //2.YOL
        /*
        const registerDto = {
            username: this.state.username,
            email: this.state.email,
            passwd: this.state.passwd,
            check: this.state.check,
        }
        */
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
                                <input type="text" name="username" id="username" className="form-control" placeholder="Kullanıcı adınız" onChange={this.onChangeAllInput} value={this.state.username} />
                            </div>

                            {/* passwd */}
                            <div className="form-group mb-3">
                                <label htmlFor="passwd">passwd</label>
                                <input type="text" name="passwd" id="passwd" className="form-control" placeholder="Kullanıcı şifreniz" onChange={this.onChangeAllInput} value={this.state.passwd} />
                            </div>

                            {/* email */}
                            <div className="form-group mb-3">
                                <label htmlFor="email">email</label>
                                <input type="text" name="email" id="email" className="form-control" placeholder="Kullanıcı email" onChange={this.onChangeAllInput} value={this.state.email} />
                            </div>

                            {/* isActive */}
                            <div className="form-group mb-3">
                                <label className="form-check-label me-3" htmlFor="check">Register Active ?</label>
                                <input type="checkbox" className="form-check-input" name="check" id="check" onChange={this.onChangeCheck} />
                            </div>

                             {/* read */}
                             <div className="form-group mb-3">
                                <label className="form-check-label me-2" htmlFor="read">Are you reading ?</label>
                                <input type="checkbox" className="form-check-input" name="read" id="read" onChange={this.onChangeRead} />
                            </div>

                            {/* submit */}
                            <div className="form-group mt-3 mb-3">
                                <button className="btn btn-danger" onClick={this.cancel.bind}>Temizle</button>
                                <button className="btn btn-primary ms-2" onClick={this.saveOrUpdateUserRegister} disabled={!this.state.read}>Gönder</button>
                                <button className="btn btn-success ms-2" onClick={this.homePage}>Anasayfa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    } // end render
} // end class
