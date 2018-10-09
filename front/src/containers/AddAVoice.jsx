import React, { Component } from 'react';

class AddAVoice extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    
    render() { 
        console.log(this.props);
        const {url} = this.props.match.params
        return ( 
            <div>
                {url}
            </div>
         );
    }
}
 
export default AddAVoice;