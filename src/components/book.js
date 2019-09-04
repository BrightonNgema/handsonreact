import React from 'react';

class Book extends React.Component{
    componentDidMount(){
        console.log(this.props);
    }
    render(){
        return(
            <div className="container">
                <h5>Book Component for Router parameter</h5>
            </div>
        )
    }
}

export default Book;