import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LandingPage extends Component {
    render() {
        return (
            <div>
                <center>
                    <h1>Welcome to NeoEM</h1>
                </center>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps)(LandingPage)
