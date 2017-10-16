import React, { Component } from 'react';
import logo from '../../extension/logo.png';

class Share extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: ''
    };

    this.getVideoId = this.getVideoId.bind(this);
    this.receiveId = this.receiveId.bind(this);
  }

  gotStream(stream) {
    console.log('a')
        local_stream = stream;
        vid = document.getElementById("video");
        vid.style.background = "black url(logo.png) center no-repeat";
        document.querySelector('video').src = URL.createObjectURL(stream);
        stream.onended = function() {
            console.log("Ended");
        };
    }

  getUserMediaError(e) {
    console.log('getUserMediaError: ' + JSON.stringify(e, null, '---'));
  }

  receiveId(response) {
    this.setState({videoId: response.id});
  }
  getVideoId() {
    chrome.runtime.sendMessage("plbfcckknlcaboplnbpcimfdibgapaee", {domain:'smyc'},
      this.receiveId
    );
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
    }, (stream) => {document.querySelector('video').src = URL.createObjectURL(stream)}, () => {});
    }
    return(
      <div>
        <video autoPlay id="video" style={videoStyle}/>
        <p><button style={buttonStyle} id="button" onClick={this.getVideoId}>Start Screen Share</button></p>
      </div>
    );
  }
}

var videoStyle = {
  width: "100%",
  height: "92%",
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
  "background": "#3dd28d",
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
  "flex": "0 0 160px",
  "boxShadow": "2px 5px 10px rgba($dark, .1)"
}

export default Share;


