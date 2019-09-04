import React from 'react';
import service from '../service.js';


class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            users : [] //declaring an array for output from api
        }
    }

    componentDidMount(){
       new service().retrieveItems('/Users') //getting an object of books from api using axios
            .then(response => { //then is triggered only when books are loaded from api, because axios.get returns a promise
                this.setState({
                    users : response.data.slice(0,20) //we need only first ten books from the api, thatswhy we used slice
                })
                console.log(response);
            })
                
        
    }
    render(){
        const { users } = this.state ; //destructuring the state.
        const userList = users.length ? (
            users.map(user => { //we are looping through each item of the users array
                return (
                    <div className="book card" key={user.ID}>
                    <div className="card-content">
                        <span className="card-title">
                            {user.ID}
                        </span>
                        <p>
                            {user.UserName}
                        </p>
                    </div>    
                </div>
                )}//end of arrow function
             )
        ) : (
            <div>No users yet!!</div>
        );
        return (
            <div className="container">
                 <div className="center">
                     {userList}
                 </div>
            </div>
            )
    }
}
export default Home;