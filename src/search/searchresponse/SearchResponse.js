import React, { Component } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import './SearchResponse.css';
class SearchResponse extends Component{

    state ={
        products: ""
    }
    componentWillReceiveProps(){
        console.log("Response in SearchResponse " + this.props.searchData)
        this.setState({products : this.props.searchData});
    }

    redirectToSite = (link) => {
        console.log(link);
        window.open(link);
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
        return (
            <div className="datascroller-demo">
                <div className="card">
                    <DataScroller value={this.state.products} itemTemplate={this.itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
                </div>
            </div>
        );
    }
     
}

export default SearchResponse;