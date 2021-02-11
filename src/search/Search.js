import {Component} from "react"
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import SearchResponse from "./searchresponse/SearchResponse";
import { DataScroller } from 'primereact/datascroller';

import { Rating } from 'primereact/rating';
import { FaUser  } from "react-icons/fa";
import "./Search.css";
import axios from "../axios-adm";
class Search extends Component{
    

    state = {
        userData : {},
         categories :[],
         productData: [],
        searchData:{
            selectedCategory : "",
            searchValue: ""
        },
        displayResult: false,
        displayError: false,
        
        
    }


    componentDidMount(){
        const token = localStorage.getItem("user");
        console.log(this.props);
        console.log(this.props.location);
        let uData = null;
        if(this.props.location.state !== undefined ){
             uData = this.props.location.state.data;
        }
        if(uData === null || token === null){
            this.props.history.push("/")
        }else if( token !== uData.emailId){
            this.props.history.push("/")
        }else{
            this.setState({userData : uData})
        }

        axios.get('http://localhost:8080/getcategories')
             .then(response => {
            console.log(response);
            this.setState({categories: response.data.categoryList});
        })
        .catch( error =>{
            console.log(error);
            this.setState({categories : {}})  
        })


    }

    setSearchDataValue = (event) => {
        let data = {...this.state.searchData}
        data.searchValue = event.target.value;
        this.setState({searchData : data});
        this.setState({displayError : false})
    }

    onCityChange = (e) => {
        let data = {...this.state.searchData}
        data.selectedCategory = e.value;
        this.setState({searchData : data});
        this.setState({displayError : false})
    }

    submit = (event) =>{
       event.preventDefault();
        if(this.state.searchData.searchValue === "" ||
            this.state.searchData.selectedCategory === ""){
                this.setState({displayError : true})
        }else{
            axios.get('http://localhost:8080/getproduct/' 
            + this.state.searchData.selectedCategory.code +"/" + 
            this.state.searchData.searchValue)
            .then((response) => {
                console.log(response);
                this.setState({displayResult : true, productData: response.data , searchResult : response.data})
            })
            .catch((error) =>{
                console.log(error)
            })
           
        }
    }

    clear = () =>{
        this.setState({displayResult : false , searchData : {}})
        let clearedSearchData = {...this.state.searchData};
        clearedSearchData.searchValue = "";
        clearedSearchData.selectedCategory= ""
        this.setState({searchData : clearedSearchData});
        this.setState({displayError : false})
    }

    logout = () =>{
        localStorage.removeItem("user");
        this.props.history.push("/")
    }

    itemTemplate = (products) => {
        return (
            <div className="product-item">
                <img src={`${products.productImage}`}  onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={products.productName} />
                <div className="product-detail">
                    <div className="product-name">{products.productName}</div>
                    <div className="product-description">{products.productDescription}</div>
                    <Rating value={products.productRating} readOnly cancel={false}></Rating>
                    <i className="pi pi-tag product-category-icon"></i><span className="product-category">{products.productCategoryCode}</span>
                </div>
                <div className="product-detail">
                    <div className="product-name"><img src={`${products.ecommerceImage}`} height="70px" width="50px" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={products.productName} /></div>
                    <div className="product-category">MRP : Rs. {products.maxRetailPrice}</div>
                </div>
                <div className="product-action">
                    <span className="product-price">Rs. {products.productPrice}</span>
                    <Button  label="Buy Now" disabled={products.inventoryStatus === 'OUTOFSTOCK'} onClick={() => {this.redirectToSite(products.ecommerceLink)}}></Button>
                    <span className= {`product-badge-status-${products.inventoryStatus.toLowerCase()}`}>{products.inventoryStatus}</span>
                </div>
            </div>
        );
    }

    render(){
        let showResult = null;
        if(this.state.displayResult && !this.state.displayError){
            console.log("Response in Search " + this.state.productData)
            showResult = <div className="datascroller-demo">
            <div className="card">
                <DataScroller value={this.state.productData} itemTemplate={this.itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
            </div>
        </div>
        }else if(this.state.displayError){
            showResult = <div style = {{color: "red"}}>Please select a category and provide search item</div>;
        }
        return(
            <div>
                <nav>
                <nav style={{padding:"0px"}}className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">monkeyMart</a>
                 <span className="navbar-brand">
                 </span>
                    <ul className="navbar-nav">
                       <li className="nav-item">
                        <span className="nav-link">
                        <span><FaUser/></span> Welcome Mr. {this.state.userData.firstName} {this.state.userData.lastName}
                        </span>
                       </li>
                       <li className="nav-item">
                             <span className="nav-link" onClick={this.logout} >Logout</span>
                       </li>
                    </ul>
             </nav>
                </nav>
                <h1>Find Your Best Deals here!!</h1>
                <div>
                    <span>
                        <Dropdown id="category" value={this.state.searchData.selectedCategory} 
                            options={this.state.categories} 
                           
                            onChange={this.onCityChange} 
                            optionLabel="name" 
                            placeholder="Select a Category" />
                    </span>
                    <span >
                    <InputText  id="search-area" value={this.state.searchData.searchValue} 
                            placeholder= "Search for products like smart phones,tvs etc..."
                            onChange={this.setSearchDataValue }/>
                                 <Button style={{border:"1px solid black"}} icon="pi pi-search" className="p-button-warning" onClick={this.submit}></Button>
                    </span>
                    <span style={{paddingLeft : "10px"}}>
                        <Button id="clear" label="Clear" className="p-button-outlined" onClick={this.clear}/>
                    </span>
                </div>
                
                <div style={{paddingTop: "40px"}}>
                    {showResult}
                </div>
            </div>
        )
    }
}

export default Search;