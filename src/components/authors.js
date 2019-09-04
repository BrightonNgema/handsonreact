import React from 'react';
import service from '../service.js';


class Author extends React.Component {
    constructor(){
        super();
        this.state = {
            authors : [] //declaring an array for output from api
        }
    }

    componentDidMount(){
       new service().retrieveItems('/authors') //getting an object of books from api using axios
            .then(response => { //then is triggered only when books are loaded from api, because axios.get returns a promise
                this.setState({
                    authors : response.data.slice(0,20) //we need only first ten books from the api, thatswhy we used slice
                })
                console.log(response);
            })
                
        
    }
    render(){
        const { authors } = this.state ; //destructuring the state.
        const authorsList = authors.length ? (
            authors.map(author => { //we are looping through each item of the users array
                return (
                    <div className="book card" key={author.ID}>
                    <div className="card-content">
                        <span className="card-title">
                            {author.FirstName}
                        </span>
                        <p>
                            {author.LastName}
                        </p>
                    </div>    
                </div>
                )}//end of arrow function
             )
        ) : (
            <div>No authors yet!!</div>
        );
        return (
            <div className="container">
                 <div className="center">
                     {authorsList}
                 </div>
            </div>
            )
    }
}
export default Author;