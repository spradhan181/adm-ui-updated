
import axios from "../axios-adm";
import { Component } from "react";
import loginImage from "../resources/login.png";
import affiliateimg from "../resources/affiliate.png";
import brandlogo from"../resources/ADM-logos_black.png";
import brandlogo1 from"../resources/ADM-logos_transparent.png";
import brandlogo2 from"../resources/ADM-logo1.jpeg";
import loginJson from "../resources/login.json";
import "./Login.css";
import { FaFacebook,FaTwitter,FaLock,FaUser,FaInstagram} from "react-icons/fa";
import { faUser } from "@fortawesome/free-solid-svg-icons";



class Login extends Component {
    state = {
        userdata:{
            username: "",
            password: ""
        },
        message: "",
        displayResult: false
    }


    changeUsername = (event) =>{
        let data = {...this.state.userdata}
        data.username  = event.target.value;
        this.setState({userdata : data})
        this.setState({displayResult : false})
    }

    changePassword = (event) =>{
        let data = {...this.state.userdata}
        data.password  = event.target.value;
        this.setState({userdata : data})
        this.setState({displayResult : false})
    }

    submitData = () =>{
        this.setState({displayResult : true})
        if(this.state.userdata.username === "" || this.state.userdata.password === ""){
            this.setState({message : " Please provide required credentials."})
        } else{
            axios.post('http://localhost:8080/signin', this.state.userdata)
        .then(response => {
            console.log(response);
            this.setState({message : response.data.result})
        })
        .catch( error =>{
            console.log(error);
            this.setState({message : loginJson.result})
            this.props.history.push("/search");
        })
        }
    }

    handleClick = () => {
        this.props.history.push("/signup");
    }
    redirectToForgotPassword = () =>{
        this.props.history.push("/forgot")
    }

    render(){
        let result = null;
        if(this.state.displayResult){
            result = <div style={{color : "red"}}>{this.state.message}</div>
        }
        return(
        <div className="main-div-1">
           
           <div>
             <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <img src={ brandlogo } height = "50px" width = "100px" />
                 <span className="navbar-brand">
                 </span>
                    <ul className="navbar-nav">
                       <li className="nav-item">
                             <a href="#contact-page" className="nav-link" >Contact</a>
                       </li>
                       <li className="nav-item">
                             <span className="nav-link" >Pricing</span>
                       </li>
                       <li className="nav-item">
                             <span className="nav-link" >Download</span>
                       </li>
                    </ul>
             </nav>
            </div>
            <h3>WELCOME TO AFFILIATED DIGITAL MARKETING</h3>
          
           
            <div  className = "main-div-2">
                
                <img className="brand-logo"src = {loginImage}  alt= "Not Found" height="60px" width= "60px" margin-left="20px"/>
                
                <div className="p-field p-grid" style={{paddingTop : "30px", paddingBottom : "10px"}}>
                    <div className="p-col">
                    <i className="login-icon" ><FaUser/></i>
                     <input id="userid-text"
                                type="text" 
                                value= {this.state.username} 
                                name= "username" 
                                onChange= {this.changeUsername}
                                placeholder="User Name"
                             />
                    </div>
                </div>
                <div className="p-field p-grid" style={{paddingTop : "10px", paddingBottom : "10px"}}>
                    <div className="p-col">
                    <i className="login-icon"><FaLock/></i>
                            <input id="userid-text"
                                type="password" 
                                value= {this.state.password} 
                                name= "password" 
                                onChange= {this.changePassword}
                                placeholder="Password"
                            />
                    </div>
                </div>
                <div style={{paddingTop : "10px", paddingBottom : "10px"}}>
                    <button className ="btn" type="submit" onClick={this.submitData}> Login </button>
                </div>
                <div>
                <span>or</span>
                <hr className="hr"/>
                </div>

                {result}

                <div style={{paddingTop : "10px", paddingBottom : "10px"}}>
                    <div> <span>Don't have an account ? </span> 
                        <span className="span"  onClick={this.handleClick}>
                            Create One.
                        </span> 
                    </div>
                    <div className="span" s onClick={this.redirectToForgotPassword}>
                            Forgot Password ?
                    </div>
                </div>
                <div>
                    <img src = {affiliateimg} height="200px" alt= "Not Found" />
                </div>
              </div>
              < div id="contact-page">
                    <a href="https://www.instagram.com/" alt="Facebook">
                             <span className="social-icons"><FaInstagram/></span>
                    </a>
                   <a href="https://www.facebook.com/" alt="Facebook">
                            <span className="social-icons"><FaFacebook/></span>
                    </a>  
                    <a href="https://twitter.com/?lang=en" alt="Facebook">
                            <span className="social-icons"><FaTwitter/></span>
                    </a>
                <br/>
                     <p style={{marginTop: "15px", marginBottom:"0px"}}>copyright@2021</p>
                      <span>email: </span> 
                      <a href="https://mail.google.com/mail/u/0/#inbox" alt="Facebook">
                             premprakash.jena@gmail.com
                      </a>
                      <img src = {brandlogo1} style={{height:"100px"  ,width:"100px"}}/>
                </div>
        </div>
        )
    };

}

export default Login;
