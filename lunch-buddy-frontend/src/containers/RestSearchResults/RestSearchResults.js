import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';

import Search from '../../components/Search/search';

const port = 5000

/*const search = (lat, lon, query, count=9) =>{
  return axios({
      method: "get",
      url: `http://localhost:${port}/locations`,
      data: {
          lat: lat,
          lon: lon,
          query: query,
          count: count
      }
  })
}*/

const imgArray = ['healthy-lunch.png', 'healthy-lunch1.png', 'healthy-lunch2.png', 'healthy-lunch3.png', 'healthy-lunch4.png', 'healthy-lunch5.png'];
const basePath='../../assets';

function imgRandom() {
    for (let i = 0; i < 18; i++) {
        const rand = imgArray[Math.floor(Math.random() * imgArray.length)];
        const image = new Image();
        image.src = basePath+rand;
        document.body.appendChild(image);
    }
}

const menu = (res_id) =>{
  return axios({
    method: "get", 
    url: `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/dailymenu`,
    params: {
      res_id: res_id
    },
    headers: { 'user-key': 'cd295cc49e5c8dfd776d34174be1b9af' }
  })
}

const city = (entity=8425, type="city") =>{
  return axios({
    method: "get", 
    url: `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/location_details`,
    params: {
      entity_id: entity,
      entity_type: type
      
    },
    headers: { 'user-key': 'cd295cc49e5c8dfd776d34174be1b9af' }
  })
}

const search = (query, lat, lon, count=10) =>{
  return axios({
    method: "get", 
    url: `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search`,
    params: {
      q: query,
      count: count,
      lat: lat,
      lon: lon,
      radius: 1600,
      sort: "real_distance"
    },
    headers: { 'user-key': 'cd295cc49e5c8dfd776d34174be1b9af' }
  })
}

const searchRes = (res_id) =>{
  return axios({
    method: "get", 
    url: `https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/restaurant`,
    params: {
      res_id: res_id
    },
    headers: { 'user-key': 'cd295cc49e5c8dfd776d34174be1b9af' }
  })
}

 const image = `https://www.tasteofhome.com/wp-content/uploads/2018/04/Sesame-Chicken-Slaw-Salad_EXPS_HCKA18_53392_C10_20_2b-1-696x696.jpg`;

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
      city()
      .then((response)=>{
        console.log("Mip", response)
        this.setState({results: response.data.best_rated_restaurant})
      })
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
      search(this.state.input, this.state.locationLat, this.state.locationLon, )
      .then((response)=>{
        console.log("Boom",response)
            this.setState({
              resultsFound: this.state.results.length,
              results: response.data.restaurants,
            })
          })
          .catch((e)=>{
            console.log(e)
          })
        }


    render () {
        return(
            <div className="container" style={{fontFamily: "Arvo"}}>
            <Search found={this.state.resultsFound} results={this.state.results} search={this.handleSearch} change={this.handleOnChange} input={this.state.input}/>
            {
             this.state.user !== null ? <>
              {

              }
             <div className="row my-4">Results: {this.state.resultsFound === 0 ? <p> Top Restaurants in Astoria</p>: this.state.resultsFound.length}</div>
             <div className="row">
               <div className="col card">
               {
                 this.state.results.length > 0 ? this.state.results.map((e,i)=>{
                   return <>
                     <Link to={`/menuview/${e.restaurant.R.res_id}`} style={{textDecoration: "none", color: "black"}}><div className="row card-body" key={i} >
                       <div className="col-3">
                         <img src={e.restaurant.featured_image||e.restaurant.featured_image||image} alt={e.restaurant.name} style={{height: "100px"}}/>
                       </div>
                       <div className="col-3">
                         <h4>{e.restaurant.name}</h4>
                         <p> Cusine {e.restaurant.cuisines}</p>
                       </div>
                       <div className="col-3" style={{fontSize: "12px"}}>
                         <p> Rated {e.restaurant.user_rating.aggregate_rating}/5</p>
                         <p> {e.restaurant.user_rating.votes} Votes</p>
                       </div>
                       <div className="col-3" style={{fontSize: "13px"}}>
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