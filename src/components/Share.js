import React, { Component } from 'react';
import logo from '../../extension/logo.png';
import openSocket from 'socket.io-client';
import SimplePeer from 'simple-peer';
var P2P = require('socket.io-p2p');
var io = require('socket.io-client');
var socket = null;

class Share extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: '',
      broadcasting: false,
      stream: null
    };

    this.getVideoId = this.getVideoId.bind(this);
    this.receiveId = this.receiveId.bind(this);

    var socket = io('http://localhost:8000')
    var p2p = new P2P(socket)

    p2p.on('start-stream', function () {
      p2p.usePeerConnection = true
      console.log('set true')
    })

    p2p.on('stream', function (stream) {
      console.log('stream from share')
    })
  }

  receiveId(response) {
    this.setState({videoId: response.id});
  }

  getVideoId() {
    if (!this.state.broadcasting) {

      //gets media stream id
      chrome.runtime.sendMessage("plbfcckknlcaboplnbpcimfdibgapaee", {domain:'smyc'},
        this.receiveId
      );
    } else {
      var vid = document.getElementById("video");
      vid.pause();
      vid.removeAttribute("src");
      vid.load();

      document.querySelector('button').innerHTML = "Start Screen Share";
      
      var stopTrack = this.state.stream.getTracks()[0];
      stopTrack.stop();
      
      this.setState({
        broadcasting: false,
        videoId: ''
      })
    }
  }

  render() {
    if (this.state.videoId.length > 0) {
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: this.state.videoId,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
            }
        }
    }, (stream) => {
      //should be rtc sending stream
      // socket.emit('host', stream)
      var socket = io('http://localhost:8000')
      var p2p = new P2P(socket, {peerOpts: {stream}})

      p2p.on('ready', function () {
        p2p.usePeerConnection = true
      })

      p2p.emit('ready', { peerId: p2p.peerId })

      this.setState({broadcasting: true, stream});
      document.querySelector('video').src = URL.createObjectURL(stream)}, () => {});
      document.querySelector('button').innerHTML = "Stop Broadcasting Screen";
    }
    return(
      <div style={divStyle}>
        <video autoPlay id="video" style={videoStyle}/>
        <button 
          style={
            {
              "background": !this.state.broadcasting ? "#3dd28d" : "#DB4545",
              ...buttonStyle
            }
          } 
          id="button" 
          onClick={this.getVideoId}
        >
          Start Screen Share
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

export default Share;


