
import axios from "../axios-adm";
import { Component } from "react";
import loginImage from "../resources/login.png";
import affiliateimg from "../resources/affiliate.png";
import brandlogo1 from"../resources/ADM-logos_transparent.png";
import brandlogo2 from"../resources/hand.png";
import brandlogo3 from "../resources/carts.png"
import "./Login.css";
import { FaFacebook,FaTwitter,FaLock,FaUser,FaInstagram,FaEnvelope} from "react-icons/fa";



class Login extends Component {
    state = {
        userdata:{
            email: "",
            password: ""
        },
        message: "",
        displayResult: false,
        authUserData: {}
    }
    componentDidMount(){
        localStorage.removeItem("user");
    }
    
    changeUsername = (event) =>{
        let data = {...this.state.userdata}
        data.email  = event.target.value;
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
        if(this.state.userdata.email === "" || this.state.userdata.password === ""){
            this.setState({message : " Please provide required credentials."})
        } 
        else
        {
            axios.post('http://localhost:8080/signin', this.state.userdata)
             .then(response => {
            console.log(response);
            if(response.data.result === "Success"){
                this.setState({authUserData: response.data.userData});
                localStorage.setItem("user", this.state.userdata.email);
                this.props.history.push({
                    pathname : "/search",
                    state: {data : this.state.authUserData}
                });
            } else if(response.data.result === "Invalid"){
                this.setState({message : "Invalid username or password"})  
            }
        })
        .catch( error =>{
            console.log(error);
            this.setState({message : "Unexpected error occured while login"})  
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
             <nav style={{padding:"0px"}}className="navbar navbar-expand-lg navbar-dark bg-dark">
                 <a className="navbar-brand" href="#" style={{margin:"0px 5px"}}>MonkeyMart</a>
                
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
             <h5>WELCOME TO AFFILIATED DIGITAL MARKETING</h5>
            </div>
            <div className="description-left">
            
            <p style={{marginTop:"30px"}}>
                <i>"Affiliate marketing has made businesses millions and ordinary people millionaires."</i> 
            </p>
            <img style={{height:"150px",width:"150px", marginTop:"40px"}} src ={brandlogo2} alt="moneyimg"/>

            </div>

            <div className="description-right ">
            <img style={{height:"150px",width:"150px",marginBottom:"30px"}} src ={brandlogo3} alt="moneyimg"/>

            <p>
                <em>"Search for your electronic products with best <b>lowest</b> price, comparision from diffrent popular <b>E-commerce</b> sites for best deals,get an extra <b>10% discount</b> from our site for every purchase!!!"</em>
            </p>
           
            </div>
            
            <div  className = "main-div-2">
                <h3></h3>
                <img className="brand-logo"src = {loginImage}  alt= "Not Found" height="60px" width= "60px" margin-left="20px"/>
               
                <div className="p-field p-grid" style={{paddingTop : "30px", paddingBottom : "10px"}}>
                    <div className="p-col">
                    <i className="login-icon" ><FaUser/></i>
                     <input id="userid-text"
                                type="text" 
                                value= {this.state.email} 
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
                {result}
                <div>
                <span>or</span>
                <hr className="hr"/>
                </div>

                <div style={{paddingTop : "10px", paddingBottom : "10px"}}>
                    <div> <span>Don't have an account ? </span> 
                        <span className="span"  onClick={this.handleClick}>
                            <b>Create One.</b>
                        </span> 
                    </div>
                    <div className="span" s onClick={this.redirectToForgotPassword}>
                           <b> Forgot Password ?</b>
                    </div>
                </div>
                <div>
                    <img src = {affiliateimg} height="200px" alt= "Not Found" />
                </div>
              </div>
              < div id="contact-page">
              <span style={{margin:"auto"}}><FaEnvelope/>
                      <a style={{margin:"0px 5px"}} href="https://mail.google.com/mail/u/0/#inbox" alt="Facebook">
                             premprakash.jena@gmail.com</a>
                             <img src = {brandlogo1} style={{height:"100px"  ,width:"100px"}}/>
                             <span>
                     <br/>         
                      </span> 
                    <a href="https://www.instagram.com/" alt="Facebook">
                             <span className="social-icons"><FaInstagram/></span>
                    </a>
                   <a href="https://www.facebook.com/" alt="Facebook">
                            <span className="social-icons"><FaFacebook/></span>
                    </a>  
                    <a href="https://twitter.com/?lang=en" alt="Facebook">
                            <span className="social-icons"><FaTwitter/></span>
                    </a>
                     <p style={{marginBottom:"0px",paddingBottom:"5px"}}>copyright@2021</p>
                      </span>
                      
                     
                </div>
        </div>
        )
    };

}

export default Login;
