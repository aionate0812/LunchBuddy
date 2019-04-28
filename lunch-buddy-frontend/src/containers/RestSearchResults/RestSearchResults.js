import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

const response = {
  "results_found": 57,
  "results_start": 0,
  "results_shown": 1,
  "restaurants": [
    {
      "restaurant": {
        "R": {
          "res_id": 16780841
        },
        "apikey": "cd295cc49e5c8dfd776d34174be1b9af",
        "id": "16780841",
        "name": "Wendy's - Temporarily Closed",
        "url": "https://www.zomato.com/new-york-city/wendys-temporarily-closed-east-village?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
        "location": {
          "address": "650 Broadway 10012",
          "locality": "Broadway, East Village",
          "city": "New York City",
          "city_id": 280,
          "latitude": "40.7267567387",
          "longitude": "-73.9954682245",
          "zipcode": "10012",
          "country_id": 216,
          "locality_verbose": "Broadway, East Village, New York City"
        },
        "switch_to_order_menu": 0,
        "cuisines": "Fast Food",
        "average_cost_for_two": 20,
        "price_range": 2,
        "currency": "$",
        "offers": [],
        "opentable_support": 0,
        "is_zomato_book_res": 0,
        "mezzo_provider": "OTHER",
        "is_book_form_web_view": 0,
        "book_form_web_view_url": "",
        "book_again_url": "",
        "thumb": "https://b.zmtcdn.com/data/res_imagery/16780800_CHAIN_c13d9985ea78417c8de96e3a2a454069_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
        "user_rating": {
          "aggregate_rating": "2.5",
          "rating_text": "Average",
          "rating_color": "FFBA00",
          "votes": "3",
          "has_fake_reviews": 0
        },
        "photos_url": "https://www.zomato.com/new-york-city/wendys-temporarily-closed-east-village/photos?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1#tabtop",
        "menu_url": "https://www.zomato.com/new-york-city/wendys-temporarily-closed-east-village/menu?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1&openSwipeBox=menu&showMinimal=1#tabtop",
        "featured_image": "https://b.zmtcdn.com/data/res_imagery/16780800_CHAIN_c13d9985ea78417c8de96e3a2a454069_c.jpg",
        "has_online_delivery": 0,
        "is_delivering_now": 0,
        "has_fake_reviews": 0,
        "include_bogo_offers": true,
        "deeplink": "zomato://restaurant/16780841",
        "is_table_reservation_supported": 0,
        "has_table_booking": 0,
        "events_url": "https://www.zomato.com/new-york-city/wendys-temporarily-closed-east-village/events#tabtop?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
        "establishment_types": []
      }
    }
  ]
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
        resultsFound: response.results_found,
        results: response.restaurants,
        user: JSON.parse(localStorage.getItem('user')) || null,
      })
    }


    render () {
      console.log("Mickey", this.props.match.url.split('/')[2])
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