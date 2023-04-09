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
import ResuabilityUserRegisterIInput from '../../resuability/ResuabilityUserRegisterIInput';


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
            check: false,//Kullanıcı aktif veya pasif olmasını sağlamak
            read: false,//okumadan submit yapmayalım
            multipleRequestIsCloseSubmit: false, //çoklu istekleri kapatmak
            validationErrors: {} //backentten gelen hata isteklerini yakalamak
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
        //Read
        this.onChangeRead = this.onChangeRead.bind(this);
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

        //Hataları yakalamak için burada çalışacağız.
        //ES ...(üç nokta=> copy için kullanacağım)
        const validationErrors = { ...this.state.validationErrors };
        validationErrors[name] = undefined;
        this.setState({
            [name]: value,
            validationErrors
        })
    }

    // okunmadan submit butonu aktif olunmasın
    onChangeRead = (event) => {
        this.state.read = event.target.checked;
        console.log(this.state.read)
        this.setState({
            read: event.target.checked
        });
    }

    //SUBMIT 
    // destructing: Object destructing: az kod çok iş
    // destructing: ortak neler var sorusuna cevap bulmaya çalış.
    saveOrUpdateUserRegister = async (event) => {
        //browser sen dur !!! birşey yapma 
        event.preventDefault();

        //CDM => registerDto doldurmuştuk
        //1.YOL destructing
        const { username, email, passwd, check } = this.state;
        const registerDto = {
            username, email, passwd, check
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

        //submit butonuna aynı anda basıldığında sadece 1 kere kaydetsin
        this.setState({
            multipleRequestIsCloseSubmit: true
        })

        //Eğer Create => createRegister
        if (this.state.id === "create") {
            /*1.YOL: Promise 
            UserRegisterApiServices.createRegister(registerDto).then(
                response => {
                    if (response.status === 200) {
                        this.setState({
                            multipleRequestIsCloseSubmit: false
                        })
                        this.props.history.push("/")
                    }
                }
            ).catch(err => {
                console.log("Create Wrong" + err.response.data)
                this.setState({
                    multipleRequestIsCloseSubmit: false
                })
            })*/
            /*2.YOL*/
            try {
                const response = await UserRegisterApiServices.createRegister(registerDto);
                if (response.status === 200) {
                    this.setState({
                        multipleRequestIsCloseSubmit: false
                    })
                    this.props.history.push("/")
                }
            } catch (error) {
                if (error.response.data.validationErrors) {
                    this.setState({
                        validationErrors: error.response.data.validationErrors
                    });
                    console.error("HATA =>" + error.response.data.validationErrors)
                }
                console.log("Create Wrong" + error)
                this.setState({
                    multipleRequestIsCloseSubmit: false
                })
            }
        } else {//UPDATE
            //Promise kullandık
            UserRegisterApiServices.updateRegister(this.state.id, registerDto).then(
                response => {
                    if (response.status === 200) {
                        this.props.history.push("/")
                    }
                } // end response
            ).catch(error => {
                if (error.response.data.validationErrors) {
                    this.setState({
                        validationErrors: error.response.data.validationErrors
                    });
                    console.error("HATA =>" + error.response.data.validationErrors)
                }
                console.log("Update Wrong" + error)
                this.setState({
                    multipleRequestIsCloseSubmit: false
                })
            })// endcatch
        } // end else 
    } //end saveOrUpdateUserRegister

    //RENDER
    render() {
        /*JavaScript kodları buraya yazacağım*/
        /* object destructing */
        const{multipleRequestIsCloseSubmit,validationErrors}=this.state;
        //this.state.validationErrors.username
        const{username,email,passwd}=validationErrors 
        //RETURN
        return (
            <>
                {this.titleDynamicsSaveOrUpdate()}
                <div className="container">
                    <div className="row">
                        <form action="">
                            {/* username: normal resuability olmayan */}
                            <div className="form-group mb-3">
                                <label htmlFor="username">Username</label>
                                <input type="text" 
                                name="username" id="username" 
                                className={username?"is-invalid form-control mb-3":"form-control mb-3"}
                                placeholder="Kullanıcı adınız" 
                                onChange={this.onChangeAllInput} 
                                value={this.state.username} autoFocus/>
                                <div className="invalid-feedback">{username}</div>
                            </div>

                            {/* passwd */}
                            {/* <div className="form-group mb-3">
                                <label htmlFor="passwd">passwd</label>
                                <input type="text" 
                                name="passwd" id="passwd" 
                                className={passwd?"is-invalid form-control mb-3":"form-control mb-3"}
                                placeholder="Kullanıcı şifreniz" 
                                onChange={this.onChangeAllInput} 
                                value={this.state.passwd} />
                                  <div className="invalid-feedback">{passwd}</div>
                            </div> */}

                            <ResuabilityUserRegisterIInput 
                            type="password" 
                            name="passwd"  
                            id="passwd"
                            placeholder="Kullanıcı şifreniz" 
                            onChange={this.onChangeAllInput} 
                            />

                            {/* email */}
                            <div className="form-group mb-3">
                                <label htmlFor="email">email</label>
                                <input type="text" 
                                name="email" id="email" 
                                className={email?"is-invalid form-control mb-3":"form-control mb-3"}
                                placeholder="Kullanıcı email" 
                                onChange={this.onChangeAllInput} 
                                value={this.state.email} />
                                <div className="invalid-feedback">{email}</div>
                            </div>

                            {/* isActive */}
                            <div className="form-group mb-3">
                                <label className="form-check-label me-3" htmlFor="check">Register Active ?</label>
                                <input type="checkbox" 
                                name="check" id="check" 
                                className="form-check-input" 
                                onChange={this.onChangeCheck} />
                            </div>

                            {/* read */}
                            <div className="form-group mb-3">
                                <label className="form-check-label me-2" htmlFor="read">Are you reading ?</label>
                                <input type="checkbox" className="form-check-input" name="read" id="read" onChange={this.onChangeRead} />
                            </div>

                            {/* submit */}
                            <div className="form-group mt-3 mb-3">
                                <button className="btn btn-danger" onClick={this.cancel.bind}>Temizle</button>
                                {/* !this.state.read && */}
                                <button
                                    className="btn btn-primary ms-2"
                                    onClick={this.saveOrUpdateUserRegister}
                                    disabled={multipleRequestIsCloseSubmit}
                                > {multipleRequestIsCloseSubmit ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ""} Gönder</button>
                                <button className="btn btn-success ms-2" onClick={this.homePage}>Anasayfa</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    } // end render
} // end class
