import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

const read = () =>{

}


class RestaurantSearchResults extends React.Component {
    state = {
        resultsFound: 0,
        order: 0,
        results: [],
        user: "",
    }

    componentDidMount() {
      this.setState({
        order: this.props.match.url.split('/')[2],
        user: JSON.parse(localStorage.getItem('user')) || null,
      })


    }


    render () {
        return(
            <div className="container">
            {
             this.state.user !== null ? <>
             <div className="row my-4">Results: {this.state.resultsFound}</div>
             <div className="row">
               <div className="col card">
               {
                 this.state.results.length > 0 ? this.state.results.map((e,i)=>{
                   return <>
                     <Link to={`/menu/${e.restaurant.R.res_id}`} style={{textDecoration: "none", color: "black"}}><div className="row card-body" key={i} >
                       <div className="col-3">
                         <img src={e.restaurant.featured_image} alt={e.restaurant.name} style={{height: "100px"}}/>
                       </div>
                       <div className="col-3">
                         <p>{e.restaurant.name}</p>
                         <p> Cusine {e.restaurant.cuisines}</p>
                       </div>
                       <div className="col-3">
                         <p> Rated {e.restaurant.user_rating.aggregate_rating}/5</p>
                         <p> {e.restaurant.user_rating.votes} Votes</p>
                       </div>
                       <div className="col-3">
                       <p>{e.restaurant.location.address}</p>
                       <p>{e.restaurant.location.locality}</p>
                       <p>{e.restaurant.location.city}, {e.restaurant.location.zipcode}</p>
                       </div>
                     </div>
                     </Link>
                   </>
                 }) : null
               }
               </div>
             </div>
             </> : <Redirect to='/'/> 
            }
            </div>
        )
    }
}

export default RestaurantSearchResults;