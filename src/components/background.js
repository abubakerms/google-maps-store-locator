import React, { Component } from 'react';
import '../app.css'
import MarkerMap from './Marker'

class Background extends Component {


    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }} >
                <MarkerMap />
            </div>
        );
    }
}

export default Background;