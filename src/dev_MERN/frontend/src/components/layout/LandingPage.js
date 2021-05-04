import React, { Component } from 'react'
import { connect } from 'react-redux'

export class LandingPage extends Component {
    render() {
        return (
            <div style={{ marginTop: '5%' }}>
                <center>
                    <h1>Welcome to NeoEM</h1>
                    <img style={{marginTop:'50px'}} src="https://ayushmanbhava.com/wp-content/uploads/2020/09/ayush-300x300-1.jpg"></img>
                </center>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(LandingPage)
