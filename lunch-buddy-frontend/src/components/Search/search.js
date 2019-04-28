import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

class SearchBar extends React.Component {
    state = {

    }

 





    componentDidMount() {

    }


    render () {
        return(
            <form>
            <div class="form-group">
            <div className="row">
            <div className="col-10">
                <label for="exampleInputEmail1"></label>
                <input type="email" value={this.props.input} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search" onChange={this.props.change}/>
                <small id="emailHelp" class="form-text text-muted">What Are You Interested In Ordering</small>
            </div>
            <div  className="col-2" style={{margin: "auto 0"}}>
            <button type="submit" class="btn btn-primary" onClick={this.props.search}>Submit</button>
            </div>
            </div>
            </div>
        </form> 
        )
    }
}

export default SearchBar;