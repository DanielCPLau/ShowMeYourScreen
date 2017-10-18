import React, { Component } from 'react';
import logo from '../../extension/logo.png';
import openSocket from 'socket.io-client';
import SimplePeer from 'simple-peer';

var P2P = require('socket.io-p2p');
var io = require('socket.io-client');

// var socket = null;
var mediaStream = null;
var url = null;
class Join extends Component {
  constructor() {
    super();

    this.state = {
      receiving: false
    }

    this.initiateWsConnection = this.initiateWsConnection.bind(this);
  }

  componentDidMount() {
    var socket = io('http://localhost:8000')
    var p2p = new P2P(socket)

    var func = this.initiateWsConnection;
    p2p.on('stop-stream', function() {
      func(document)
    });

    p2p.on('stream', function (stream) {
      console.log('stream for join')
      mediaStream = stream;
      url = URL.createObjectURL(stream);
    });
  }
  initiateWsConnection(document) {
    if (this.state.receiving == false) {
      this.setState({receiving: true})
      document.querySelector('video').src = url;
      document.querySelector('button').innerHTML = "Unjoin Screen Share";
    } else {
      this.setState({receiving: false})
      var vid = document.getElementById("video");
      document.querySelector('button').innerHTML = "Join Screen Share";
      vid.pause();
      vid.removeAttribute("src");
      vid.load();
    }
  }

  render() {
    return(
      <div style={divStyle}>
        <video autoPlay id="video" style={videoStyle}/>
        <button 
          style={
            {
              "background": !this.state.receiving ? "#3dd28d" : "#DB4545",
              ...buttonStyle
            }
          } 
          id="button" 
          onClick={this.initiateWsConnection.bind(this, document)}
        >
          Join Screen Share
        </button>
      </div>
    );
  }
}

var divStyle = {
  "background": "white",
  "display": "-webkit-flex",
  "WebkitJustifyContent": "center",
  "WebkitAlignItems": "center",
  "WebkitFlexDirection": "column"
}

var videoStyle = {
  minWidth: '100%',
  width: "100%",
  background: `white url(${logo}) center no-repeat`,
  "border": "1px solid #e2e2e2",
  "boxShadow": "0 1px 1px rgba(0,0,0,0.2)",
};

var buttonStyle = {
  "display": "flex",
  "overflow": "hidden",
  "outline": "0",
  "margin": "10px",
  "padding": "12px 12px",
  "cursor": "pointer",
  "userSelect": "none",
  "transition": "all 60ms ease-in-out",
  "textAlign": "center",
  "whiteSpace": "nowrap",
  "textDecoration": "none !important",
  "textTransform": "capitalize",
  "color": "#FFFFFF",
  "border": "0 none",
  "borderRadius": "4px",
  "fontSize": "13px",
  "fontWeight": "500",
  "lineHeight": "1.3",
  "WebkitAppearance": "none",
  "MozAppearance": "none",
  "appearance": "none",
  "justifyContent": "center",
  "alignItems": "center",
  "boxShadow": "2px 5px 10px rgba($dark, .1)"
}

export default Join;