import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import Search from '../../components/Search/search';

const port = 5000

const search = (lon, lat, query, count=9) =>{
  return axios({
      method: "get",
      url: `http://localhost:${port}/locations`,
      data: {
          lon: lon,
          lat: lat,
          query: query,
          count: count
      }
  })
}
 const image = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTBROkHgxHvy24l2E3ccmm9JirhdfIOK3VcCf8JpAXBT0UkHmHxA`;

class RestaurantSearchResults extends React.Component {
    state = {
        resultsFound: 0,
        order: 0,
        results: [],
        user: "",
        input: "",
        locationLon: 0,
        locationLat: 0,
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
            order: this.props.match.url.split('/')[2],
            user: JSON.parse(localStorage.getItem('user')) || null,
            locationLon: location.coords.longitude,
            locationLat: location.coords.latitude
         })
    })
    }

    handleOnChange = (e) => {
      this.setState({input: e.target.value})
  }

    handleSearch= (e) => {
      e.preventDefault();
      search(this.state.locationLat, this.state.locationLon, this.setState.input)
      .then((response)=>{
        this.setState({
          resultsFound: response.data.data.results_shown,
          results: response.data.data.restaurants,
        })
          console.log("Rep", response)
      })
  }


    render () {
      console.log("State", this.state)
        return(
            <div className="container">
            <Search found={this.state.resultsFound} results={this.state.results} search={this.handleSearch} change={this.handleOnChange} input={this.state.input}/>
            {
             this.state.user !== null ? <>
              {

              }
             <div className="row my-4">Results: {this.state.resultsFound}</div>
             <div className="row">
               <div className="col card">
               {
                 this.state.results.length > 0 ? this.state.results.map((e,i)=>{
                   return <>
                     <Link to={`/menu/${e.restaurant.R.res_id}`} style={{textDecoration: "none", color: "black"}}><div className="row card-body" key={i} >
                       <div className="col-3">
                         <img src={e.restaurant.featured_image||e.restaurant.featured_image||image} alt={e.restaurant.name} style={{height: "100px"}}/>
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