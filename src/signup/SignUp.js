import { Component } from "react";
import "./Signup.css";
import axios from "../axios-adm";
import {InputText} from 'primereact/inputtext';
import {RadioButton} from 'primereact/radiobutton';
import 'primeflex/primeflex.css';
class SignUp extends Component{

    state = {
        userFormData :{
            firstName: "",
            lastName:"",
            emailId:"",
            password: "",
            confirmPassword: "",
            gender:""
        },
        errorMessage: "",
        successMessage: "",
        displayError: false,
        displaySuccessMessage: false
    }
    changeValueName = (event) =>{
        let data = {...this.state.userFormData}
        data.firstName=event.target.value;
        this.setState({userFormData : data})

    }

    changeValueLastName = (event) =>{
        let data = {...this.state.userFormData}
        data.lastName=event.target.value;
        this.setState({userFormData : data})

    }

    changeValueEmail = (event) =>{
        let data = {...this.state.userFormData}
        data.emailId=event.target.value;
        this.setState({userFormData : data})

    }

    changeValuePassword = (event) =>{
        let data = {...this.state.userFormData}
        data.password=event.target.value;
        this.setState({userFormData : data})

    }

    changeValueConfirmPassword = (event) =>{
        let data = {...this.state.userFormData}
        data.confirmPassword=event.target.value;
        this.setState({userFormData : data})

    }

    changeValueGender = (event) =>{
        let data = {...this.state.userFormData}
        data.gender=event.target.value;
        this.setState({userFormData : data})

    }

    submitForm = (event) => {
        event.preventDefault();
        this.setState({displayError: false, displaySuccessMessage : false})
        if(this.state.userFormData.firstName === "" || this.state.userFormData.lastName === ""
            || this.state.userFormData.emailId === "" || this.state.userFormData.password === "" 
            || this.state.userFormData.confirmPassword === ""){
                this.setState({errorMessage : "Please provide all required fields", displayError : true})
        } else if (this.state.userFormData.password !== this.state.userFormData.confirmPassword ){
            this.setState({errorMessage : "Password/ConfirmPassword dosenot match", displayError: true})
        } else {
                        axios.post('http://localhost:8080/signup', this.state.userFormData)
                        .then(response => {
                        console.log(response);
                            if(response.data.result === "Success"){
                                 this.sendWelcomeEmail();
                                 this.setState({displayError: false, displaySuccessMessage : true})
                            } else if(response.data.result === "Error"){
                                this.setState({message : "ErrorWhile creating user"})  
                                this.setState({displayError: true, displaySuccessMessage : false})
                            }
                })
                .catch( error =>{
                    console.log(error);
                    this.setState({message : error})  
                })
        }
        
    }

    sendWelcomeEmail = () => {
        console.log("Sending .........")
        axios.post('http://localhost:8080/sendwelcomeemail', {
            "toEmailAddress" : this.state.userFormData.emailId,
            "subjet" : "Welcome to MonkeyMart, Mr. " + this.state.userFormData.firstName + " " + this.state.userFormData.lastName,
            "messageBody" : "Hi " + this.state.userFormData.firstName + " " + this.state.userFormData.lastName +","
                 })
                        .then(response => {
                        console.log(response);
                })
                .catch( error =>{
                    console.log(error);
                    this.setState({message : error})  
                })
    }

    redirectBack = () => {
        this.setState({displayError: false, displaySuccessMessage : false})
        this.props.history.push("/")
    }
   

    render(){
        let message = null;
        if(this.state.displayError && !this.state.displaySuccessMessage){
            message = this.state.errorMessage;
        }

        let successMessage = null;
        if(!this.state.displayError && this.state.displaySuccessMessage){
            successMessage = <p>User <b style={{color: "black"}}>{this.state.userFormData.emailId} </b>
            created successfully. Please click here to go to
                <b style={{color:"black"}} onClick={this.redirectBack}> Login</b> page. or click Back button</p>
        }
        return(
            <div className="signup-div">
                <div className = "">
                    <h1>Create </h1>
                    <div style={{paddingTop : "10px"}}>
                    <div style={{paddingTop: "10px", color : "red"}}>
                        {message}
                    </div>
                    <div style={{paddingTop : "10px"}}>
                                 <InputText 
                                    id="firstName" 
                                    name= "firstName" 
                                    type="text" 
                                    value= {this.state.userFormData.firstName} 
                                    onChange= {this.changeValueName}
                                    placeholder="First Name"
                                    className="input-text"
                                    />
                    </div>
                    <div style={{paddingTop : "10px"}}>
                        <InputText 
                                    id="lastName" 
                                    name= "lastName" 
                                    type="text" 
                                    value= {this.state.userFormData.lastName} 
                                    onChange= {this.changeValueLastName}
                                    placeholder="Last Name"
                                    className="input-text"
                                    />
                    </div>
                        
                    </div>
                    <div style={{paddingTop : "10px"}}>
                                <InputText 
                                    id="email" 
                                    name= "Email" 
                                    type="text" 
                                    value= {this.state.userFormData.emailId} 
                                    onChange= {this.changeValueEmail}
                                    placeholder="Email address"
                                    className="input-text"
                                    />
                    </div>
                    <div style={{paddingTop : "10px"}}>
                                <InputText 
                                    id="password" 
                                    name= "password" 
                                    type="password" 
                                    value= {this.state.userFormData.password} 
                                    onChange= {this.changeValuePassword}
                                    placeholder="password"
                                    className="input-text"
                                    />
                    </div>
                    <div style={{paddingTop : "10px"}}>
                                <InputText 
                                    id="confirmPassword"
                                    name= "confirmPassword" 
                                    type="text" 
                                    value= {this.state.userFormData.confirmPassword} 
                                    onChange= {this.changeValueConfirmPassword}
                                    placeholder="Confirm password"
                                    className="input-text"
                                    />
                    </div>
                    <div style={{paddingTop : "10px"}}>
                        <span >
                            <RadioButton inputId="gender" name="gender" value="M" onChange={this.changeValueGender}  
                            checked={this.state.userFormData.gender === 'M'}/>
                            <label htmlFor="city7">Male</label>
                        </span>

                        <span style={{paddingLeft:"20px"}}>
                            <RadioButton inputId="gender" name="gender" value= "F" onChange={this.changeValueGender}  
                            checked={this.state.userFormData.gender === 'F'}/>
                            <label htmlFor="city7">Female</label>
                        </span>
                    </div>
                    
                    <div style={{paddingTop : "30px", paddingBottom : "10px"}}>
                        <button id="btn"className ="btn" type="submit" onClick={this.submitForm} 
                            disabled = {this.state.displaySuccessMessage}> Create Account </button>
                            <span style={{paddingLeft: "10px"}}>
                                <button id="btn"className ="btn" type="button" onClick={this.redirectBack}> Back </button>
                            </span>
                    </div>
                    
                </div>
                <div style={{paddingTop: "10px", color : "green"}}>
                        {successMessage}
                    </div>
            </div>
            
            
        )
    }
}

export default SignUp