import React from 'react';


export default class Pin extends React.Component{
    render(){
        return (
            <img src={require('./mappin.png')} alt="You are here!" />
            // <div>You are here !</div>
        )
    }
}