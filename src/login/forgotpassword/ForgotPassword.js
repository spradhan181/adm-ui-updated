import {Component} from 'react'
import { InputText } from 'primereact/inputtext';
import axios from "../../axios-adm";
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

class ForgotPassword extends Component{

    state = {
        recoverRequest:{
            email:"",
            password: "",
            confirmPassword: "",
            otp: ""
        },
        displayError: false,
        displayResult: false,
        showPassword: false,
        showSuccessMessage: false,
        message: "",
        actionInProgress: false
    }

    changeValueEmail =(event) =>{
        let data = {...this.state.recoverRequest};
        data.email = event.target.value;
        this.setState({recoverRequest : data})
        this.setState({displayError : false})
    }
    changeValueOtp = (event) =>{
        let data = {...this.state.recoverRequest};
        data.otp = event.target.value;
        this.setState({recoverRequest : data})
    }

    verifyUserName = (event) =>{
        event.preventDefault();
        this.setState({showPassword : false});
         if(this.state.recoverRequest.email === ""){
            this.setState({displayError : true})
            this.setState({message : "Please username to proceed"})
         }else{
                this.setState({actionInProgress : true})
                axios.post('http://localhost:8080/recover', this.state.recoverRequest)
                .then(response => {
                console.log(response);
                if(response.data.result === "Success"){
                    //this.setState({displayResult : true})
                    this.sendEmail();
                } else if(response.data.result === "Invalid"){
                    this.setState({displayError : true})
                    this.setState({message : "Username not found !!"})  
                    this.setState({displayResult : false, actionInProgress : false})
                }
            })
            .catch( error =>{
                console.log(error);
                this.setState({message : error, actionInProgress: false})  
            })
         }
     }

     sendEmail = () =>{
        axios.post('http://localhost:8080/sendemail', {
            toEmailAddress : this.state.recoverRequest.email,
            fromEmailAddress : "monkeymart@gmail.com",
            subject:"One Time Password"
        })
        .then(response => {
        console.log(response);
        if(response.data === "Success"){
            this.setState({displayResult : true})
            this.setState({actionInProgress : false})
        } else if(response.data.result === "Failure"){
            this.setState({displayError : true})
            this.setState({message : "Username not found !!"})  
            this.setState({displayResult : false, actionInProgress: false})
        }
    })
    .catch( error =>{
        console.log(error);
        this.setState({message : error, actionInProgress: false})  
    })
     }

     updatePassword = () => {
        this.setState({displayResult : false, showSuccessMessage: false, displayError: false})
         if(this.state.recoverRequest.password === "" || this.state.recoverRequest.confirmPassword === ""){
            this.setState({displayError: true, message : "Password/ConfirmPassword required"})
         } else if(this.state.recoverRequest.password !=  this.state.recoverRequest.confirmPassword){
            this.setState({displayError: true, message : "Password and ConfirmPassword dosenot match"})
         } else {
            axios.post('http://localhost:8080/updatepassword', this.state.recoverRequest)
            .then(response => {
            console.log(response);
            if(response.data.result === "Success"){
                this.setState({showSuccessMessage: true})
                this.setState({message : "Password updated successfully. Please use new password to login."})  
            } else if(response.data.result === "Invalid"){
                this.setState({displayError : true})
                this.setState({message : "Username not found !!"})  
            }
        })
        .catch( error =>{
            console.log(error);
            this.setState({message : error})  
        })
         }
     }
 
     clear = () =>{
         this.setState({displayResult : false , recoverRequest : {}})
         let clearedRecoveryData = {...this.state.recoverRequest};
         clearedRecoveryData.email= "";
         clearedRecoveryData.otp= "";
         this.setState({recoverRequest : clearedRecoveryData});
         this.setState({displayError : false})
         this.setState({showPassword : false, showSuccessMessage : false});
     }

     verifyOtp = () =>{
         if(this.state.recoverRequest.otp === ""){
            this.setState({displayError: true, message : "Provide OTP to proceed"})
         }else{
                    this.setState({actionInProgress : true})
                    axios.post('http://localhost:8080/recover', this.state.recoverRequest)
                    .then(response => {
                    console.log(response);
                    if(response.data.result === "Success"){
                        this.setState({showPassword : true, displayResult : false , displayError: false, actionInProgress: false});
                    } else if(response.data.result === "Invalid"){
                        this.setState({displayError: true, message : "Invalid OTP", actionInProgress: false})
                    }
                })
                .catch( error =>{
                    console.log(error);
                    this.setState({message : error, actionInProgress: false})  
                })
         }
     }

     changeNewPassword = (event) =>{
        let data = {...this.state.recoverRequest};
        data.password = event.target.value;
        this.setState({recoverRequest : data})
     }

     changeConfirmPassword = (event) =>{
        let data = {...this.state.recoverRequest};
        data.confirmPassword = event.target.value;
        this.setState({recoverRequest : data})
     }

     redirectToLogin =() =>{
         this.props.history.push("/");
     }
    render(){

        let renderView = 
        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
             <InputText 
                   value={this.state.recoverRequest.email} 
                   placeholder= "Enter email address"
                   onChange={this.changeValueEmail }/>
    
            <span style={{paddingLeft : "10px"}}>
                <Button label="Search" className="p-button-outlined" disabled ={this.state.showSuccessMessage} onClick={this.verifyUserName}/>
            </span>
            <span style={{paddingLeft : "10px"}}>
                <Button label="Clear" className="p-button-outlined" onClick={this.clear}/>
            </span>
         </div>;

        if(this.state.showPassword && !this.state.showSuccessMessage ){
            renderView =  <div>
                <div>Change Your Password</div>
                <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <InputText 
                        type="password"
                        value={this.state.password} 
                        placeholder= "New password"
                        onChange={this.changeNewPassword}/>
                </div>
                <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <InputText 
                        type="password"
                        value={this.state.confirmPassword} 
                        placeholder= "Confirm password"
                        onChange={this.changeConfirmPassword}/>
                </div>
                <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <Button label="Update" className="p-button-outlined"  onClick={this.updatePassword}/>
                </div>
            </div>
        } 

        let showResult = null;
        if(this.state.actionInProgress){
            showResult = 
            <div style={{paddingTop: "20px"}}>
                <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="#EEEEEE" animationDuration=".5s"/>
            </div>
        }
        else if(this.state.displayResult){
            showResult = <div style={{paddingTop: "20px"}}>
                <div>
                    <div>
                        <span>We have sent an otp to your registered emial address. </span>
                    </div>
                        <div style={{paddingTop: "10px", paddingBottom: "10px"}}>
                            <span>
                                <InputText 
                                    type="text"
                                    value={this.state.otp} 
                                    placeholder= "Enter OTP received on mobile or email"
                                    onChange={this.changeValueOtp}/>
                            </span>
                            <span style={{paddingLeft : "10px"}}>
                                 <Button label="Verify OTP" className="p-button-outlined"  onClick={this.verifyOtp}/>
                            </span>
                        </div>
                        <div>
                    </div>   
                </div>
            </div>
        }
        let errormessage= null;
        if(this.state.displayError){
            errormessage = <div style={{paddingTop:"20px", color: "red"}}>{this.state.message}</div>
        }

        let showSuccessMessage = null;
        if(this.state.showSuccessMessage && !this.state.displayError){
            showSuccessMessage = <div style={{paddingTop:"20px",paddingBottom: "20px", color: "green"}}>{this.state.message}
                <div style= {{color : "black"}} >Click here to go back to <b style={{color:"blue"}} onClick={this.redirectToLogin}>Login</b> page.</div>
            </div>
        }
        return(
            <div>
                <h1>Password recovery page</h1>
                <div style={{paddingTop: "20px"}}>
                    {renderView}
                    {showResult}
                    {errormessage}
                    {showSuccessMessage}
                </div>
            </div>
        );
    }
}

export default ForgotPassword;