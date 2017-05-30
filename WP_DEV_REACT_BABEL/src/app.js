import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Images from './components/Images'

class App extends Component {
    render(){
        return(
            <div>
                This is the react App!
                Hello? ?????
                <Images />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));