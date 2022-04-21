import React, { Component } from 'react'

import io from 'socket.io-client';
import Video from './Video';
import Videos from './Videos';
import Draggable from './Draggable';
import Chat from './Chat'; 
import { CgCloseO } from 'react-icons/cg';
import { Redirect } from "react-router-dom";
import _ from 'lodash';
 

export class MainVideo extends Component {
  constructor(props) {
    super(props)
  
      this.state = {
        localStream: null,    // used to hold local stream object to avoid recreating the stream everytime a new offer comes
        remoteStream: null,    // used to hold remote stream object that is displayed in the main screen
       
        remoteStreams: [],    // holds all Video Streams (all remote streams)
        peerConnections: {},  // holds all Peer Connections
        selectedVideo: null,
  
        status: 'Please wait...',
  
        pc_config: {
          "iceServers": [
            {
              urls : 'stun:stun.l.google.com:19302'
            }
          ]
        },
  
        sdpConstraints: {
          'mandatory': {
              'OfferToReceiveAudio': true,
              'OfferToReceiveVideo': true
          }
        },
  
        messages: [],
        sendChannels: [],
        disconnected: false,
      }
  
      // DONT FORGET TO CHANGE TO YOUR URL
<<<<<<< HEAD
      this.serviceIP = 'https://ndsbirthdayserver.herokuapp.com/webrtcPeer'
=======
      this.serviceIP = 'http://localhost:9150/webrtcPeer'
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
  
      // https://reactjs.org/docs/refs-and-the-dom.html
      // this.localVideoref = React.createRef()
      // this.remoteVideoref = React.createRef()
  
      this.socket = null
      // this.candidates = []
    }
  
    getLocalStream = () => {
      // called when getUserMedia() successfully returns - see below
      // getUserMedia() returns a MediaStream object (https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
      const success = (stream) => {
        window.localStream = stream
        // this.localVideoref.current.srcObject = stream
        // this.pc.addStream(stream);
        this.setState({
          localStream: stream
        })
  
        this.whoisOnline()
      }
  
      // called when getUserMedia() fails - see below
      const failure = (e) => {
        console.log('getUserMedia Error: ', e)
      }
  
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      // see the above link for more constraint options
      const constraints = {
        audio: true,
        video: true,
    
        options: {
          mirror: true,
        }
      }
  
      // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      navigator.mediaDevices.getUserMedia(constraints)
        .then(success)
        .catch(failure)
    }
  
    whoisOnline = () => {
      // let all peers know I am joining
      this.sendToPeer('onlinePeers', null, {local: this.socket.id})
    }
  
    sendToPeer = (messageType, payload, socketID) => {
      this.socket.emit(messageType, {
        socketID,
        payload
      })
    }
  
    createPeerConnection = (socketID, callback) => {
  
      try {
        let pc = new RTCPeerConnection(this.state.pc_config)
  
        // add pc to peerConnections object
        const peerConnections = { ...this.state.peerConnections, [socketID]: pc }
        this.setState({
          peerConnections
        })
  
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            this.sendToPeer('candidate', e.candidate, {
              local: this.socket.id,
              remote: socketID
            })
          }
        }
  
        pc.oniceconnectionstatechange = (e) => {
          // if (pc.iceConnectionState === 'disconnected') {
          //   const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== socketID)
  
          //   this.setState({
          //     remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
          //   })
          // }
  
        }
  
        pc.ontrack = (e) => {
          let _remoteStream = null
          let remoteStreams = this.state.remoteStreams
          let remoteVideo = {}
  
  
          // 1. check if stream already exists in remoteStreams
          const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)
  
          // 2. if it does exist then add track
          if (rVideos.length) {
            _remoteStream = rVideos[0].stream
            _remoteStream.addTrack(e.track, _remoteStream)
  
            remoteVideo = {
              ...rVideos[0],
              stream: _remoteStream,
            }
            remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
              return (_remoteVideo.id === remoteVideo.id && remoteVideo) || _remoteVideo
            })
          } else {
            // 3. if not, then create new stream and add track
            _remoteStream = new MediaStream()
            _remoteStream.addTrack(e.track, _remoteStream)
  
            remoteVideo = {
              id: socketID,
              // name: socketID.user,
              stream: _remoteStream,
            }
            remoteStreams = [...this.state.remoteStreams, remoteVideo]
          }
  
          // const remoteVideo = {
          //   id: socketID,
          //   name: socketID,
          //   stream: e.streams[0]
          // }
  
          this.setState(prevState => {
  
            // If we already have a stream in display let it stay the same, otherwise use the latest stream
            // const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
            const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: _remoteStream }
  
            // get currently selected video
            let selectedVideo = prevState.remoteStreams.filter(stream => stream.id === prevState.selectedVideo.id)
            // if the video is still in the list, then do nothing, otherwise set to new video stream
            selectedVideo = selectedVideo.length ? {} : { selectedVideo: remoteVideo }
  
            return {
              // selectedVideo: remoteVideo,
              ...selectedVideo,
              // remoteStream: e.streams[0],
              ...remoteStream,
              remoteStreams, //: [...prevState.remoteStreams, remoteVideo]
            }
          })
        }
  
        pc.close = () => {
          // alert('GONE')
          console.log("pc closed");
        }
  
        if (this.state.localStream)
          // pc.addStream(this.state.localStream)
  
          this.state.localStream.getTracks().forEach(track => {
            pc.addTrack(track, this.state.localStream)
          })
  
        // return pc
        callback(pc)
  
      } catch(e) {
        console.log('Something went wrong! pc not created!!', e)
        // return;
        callback(null)
      }
    }
  
    componentDidMount = () => {
      
  
      this.socket = io.connect(
        this.serviceIP,
        {
          path: '/io/webrtc',
          query: {
            room: window.location.pathname.substr(18),
            user: window.location.search,
          }
        }
      )
  
      this.socket.on('connection-success', data => {
  
        this.getLocalStream()
  
        // console.log(data.success)
        const status = data.peerCount > 1 ? <span>ID: {window.location.pathname.substr(18)} Connected: {data.peerCount}</span> : 'Waiting for other peers to connect'
  
        this.setState({
          status: status,
          messages: data.messages
        })
      })
  
      this.socket.on('joined-peers', data => {
  
        this.setState({
          status: data.peerCount > 1 ? <span>Connected: {data.peerCount}</span> : 'Waiting for other peers to connect'
        })
      })
      //************ ************//
      this.socket.on('peer-disconnected', data => {
        try {
            // close peer-connection with this peer
        this.state.peerConnections[data.socketID].close()
  
        // get and stop remote audio and video tracks of the disconnected peer
        const rVideo = this.state.remoteStreams.filter(stream => stream.id === data.socketID)
        rVideo && this.stopTracks(rVideo[0].stream)
        }
        catch (err) {
          console.error(err)
        }
        // filter out the disconnected peer stream
        const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== data.socketID)
  
        this.setState(prevState => {
          // check if disconnected peer is the selected video and if there still connected peers, then select the first
          const selectedVideo = prevState.selectedVideo.id === data.socketID && remoteStreams.length ? { selectedVideo: remoteStreams[0] } : null
  
          return {
            // remoteStream: remoteStreams.length > 0 && remoteStreams[0].stream || null,
            remoteStreams,
            ...selectedVideo,
            status: data.peerCount > 1 ? `Number of matches to ${window.location.pathname}: ${data.peerCount}` : 'Waiting for your friends to connect'
          }
          }
        )
      })
  
      // this.socket.on('offerOrAnswer', (sdp) => {
  
      //   this.textref.value = JSON.stringify(sdp)
  
      //   // set sdp as remote description
      //   this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
      // })
  
      this.socket.on('online-peer', socketID => {
        // const {store} = this.props;
        // const me = store.getCurrentUser();
        // const email = _.toString(_.get(me, 'email'));
        // const name   = email.substring(0, email.lastIndexOf("@"));
        // console.log('connected peers ...', socketID)
  
        // create and send offer to the peer (data.socketID)
        // 1. Create new pc
        this.createPeerConnection(socketID, pc => {
          // 2. Create Offer
          if (pc) {
        
            // Send Channel
            const handleSendChannelStatusChange = (event) => {
              console.log('send channel status: ' + this.state.sendChannels[0].readyState)
            }
  
            const sendChannel = pc.createDataChannel('sendChannel')
            sendChannel.onopen = handleSendChannelStatusChange
            sendChannel.onclose = handleSendChannelStatusChange
          
            this.setState(prevState => {
              return {
                sendChannels: [...prevState.sendChannels, sendChannel]
              }
            })
  
  
            // Receive Channels
            const handleReceiveMessage = (event) => {
              const message = JSON.parse(event.data)
              // console.log(message)
              this.setState(prevState => {
                return {
                  messages: [...prevState.messages, message]
                }
              })
            }
  
            const handleReceiveChannelStatusChange = (event) => {
              if (this.receiveChannel) {
                console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
              }
            }
  
            const receiveChannelCallback = (event) => {
              const receiveChannel = event.channel
              receiveChannel.onmessage = handleReceiveMessage
              receiveChannel.onopen = handleReceiveChannelStatusChange
              receiveChannel.onclose = handleReceiveChannelStatusChange
            }
  
            pc.ondatachannel = receiveChannelCallback
  
  
            pc.createOffer(this.state.sdpConstraints)
              .then(sdp => {
                pc.setLocalDescription(sdp)
                // console.log(meObj);
                this.sendToPeer('offer', sdp, {
                  local:  this.socket.id,
                  remote: socketID,
                })
              })
          }
        })
      })
  
      this.socket.on('offer', data => {
        this.createPeerConnection(data.socketID, pc => {
          pc.addStream(this.state.localStream)
  
          // Send Channel
          const handleSendChannelStatusChange = (event) => {
            console.log('send channel status: ' + this.state.sendChannels[0].readyState)
          }
  
          const sendChannel = pc.createDataChannel('sendChannel')
          sendChannel.onopen = handleSendChannelStatusChange
          sendChannel.onclose = handleSendChannelStatusChange
          
          this.setState(prevState => {
            return {
              sendChannels: [...prevState.sendChannels, sendChannel]
            }
          })
  
          // Receive Channels
          const handleReceiveMessage = (event) => {
            const message = JSON.parse(event.data)
            // console.log(message)
            this.setState(prevState => {
              return {
                messages: [...prevState.messages, message]
              }
            })
          }
  
          const handleReceiveChannelStatusChange = (event) => {
            if (this.receiveChannel) {
              console.log("receive channel's status has changed to " + this.receiveChannel.readyState);
            }
          }
  
          const receiveChannelCallback = (event) => {
            const receiveChannel = event.channel
            receiveChannel.onmessage = handleReceiveMessage
            receiveChannel.onopen = handleReceiveChannelStatusChange
            receiveChannel.onclose = handleReceiveChannelStatusChange
          }
  
          pc.ondatachannel = receiveChannelCallback
  
          pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
            // 2. Create Answer
            pc.createAnswer(this.state.sdpConstraints)
              .then(sdp => {
                pc.setLocalDescription(sdp)
  
                this.sendToPeer('answer', sdp, {
                  local: this.socket.id,
                  remote: data.socketID,
                })
              })
          })
        })
      })
  
      this.socket.on('answer', data => {
        // get remote's peerConnection
        const pc = this.state.peerConnections[data.socketID]
        // console.log(data.sdp)
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=>{})
      })
  
      this.socket.on('candidate', (data) => {
        // get remote's peerConnection
        const pc = this.state.peerConnections[data.socketID]
  
        if (pc)
          pc.addIceCandidate(new RTCIceCandidate(data.candidate))
      })
  
      // const pc_config = null
  
      // const pc_config = {
      //   "iceServers": [
      //     // {
      //     //   urls: 'stun:[STUN_IP]:[PORT]',
      //     //   'credentials': '[YOR CREDENTIALS]',
      //     //   'username': '[USERNAME]'
      //     // },
      //     {
      //       urls : 'stun:stun.l.google.com:19302'
      //     }
      //   ]
      // }
  
      // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
      // create an instance of RTCPeerConnection
      // this.pc = new RTCPeerConnection(this.state.pc_config)
  
      // triggered when a new candidate is returned
      // this.pc.onicecandidate = (e) => {
      //   // send the candidates to the remote peer
      //   // see addCandidate below to be triggered on the remote peer
      //   if (e.candidate) {
      //     // console.log(JSON.stringify(e.candidate))
      //     this.sendToPeer('candidate', e.candidate)
      //   }
      // }
  
      // triggered when there is a change in connection state
      // this.pc.oniceconnectionstatechange = (e) => {
      //   console.log(e)
      // }
  
      // triggered when a stream is added to pc, see below - this.pc.addStream(stream)
      // this.pc.onaddstream = (e) => {
      //   this.remoteVideoref.current.srcObject = e.stream
      // }
  
      // this.pc.ontrack = (e) => {
      //   debugger
      //   // this.remoteVideoref.current.srcObject = e.streams[0]
  
      //   this.setState({
      //     remoteStream: e.streams[0]
      //   })
      // }
  
    }
  
    // ************************************* //
    // NOT REQUIRED
    // ************************************* //
    disconnectSocket = (socketToDisconnect) => {
      this.sendToPeer('socket-to-disconnect', null, {
        local: this.socket.id,
        remote: socketToDisconnect
      })
    }
  
    switchVideo = (_video) => {
      // console.log(_video)
      this.setState({
        selectedVideo: _video
      })
    }
  
    // ************************************* //
    // ************************************* //

    stopTracks = (stream) => {
      stream.getTracks().forEach(track => track.stop())
    }
        
  
    render() {
      const {
        status,
        messages,
        disconnected,
        localStream,
        peerConnections,
        remoteStreams,
      } = this.state
      const {store} = this.props;
      const me = store.getCurrentUser();
      const name = _.get(me, 'name') || 'nds';
      
      if(!me){
        return (
<<<<<<< HEAD
          <Redirect to="/ndsweb/chat" />
=======
          <Redirect to="/page3" />
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
        )
      } 
      if (disconnected) {
        // disconnect socket
        this.socket.close()
        // stop local audio & video tracks
        this.stopTracks(localStream)
  
        // stop all remote audio & video tracks
        remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))
  
        // stop all remote peerconnections
        peerConnections && Object.values(peerConnections).forEach(pc => pc.close())

        // setTimeout(() => {
          return (
<<<<<<< HEAD
            <Redirect to="/ndsweb/chat" />
=======
            <Redirect to="/page3" />
>>>>>>> baf3ed63bb22c8d11807d4c127297193e22183a8
          ) 
          // }, 10000);
        
      }
  
      const statusText = <div style={{ color: 'rgba(199, 36, 199, 0.9)', padding: 5 }}>{status}</div>
  
      return (
        <div>
        <Draggable style={{
          zIndex: 101,
          position: 'absolute',
          right: 0,
          cursor: 'move',
        }}>
          <Video
            videoType='localVideo'
            videoStyles={{
              width: 200,
              marginTop: '-3.5rem',
              marginRight: '.5rem',
            }}
            frameStyle={{
              width: 200,
              margin: 5,
              borderRadius: '.2rem',
              backgroundColor: 'rgba(0,0,0,0.9)',
            }}
            showMuteControls={true}
            // ref={this.localVideoref}
            videoStream={localStream}
            autoPlay muted>
          </Video>
        </Draggable>
        <br />
          <div style={{
            zIndex: 3,
            position: 'absolute',
            marginTop: '-.6rem',
            // margin: 10,
            // backgroundColor: '#cdc4ff4f',
            // padding: 10,
            // borderRadius: 5,
          }}>
           
            <i  onClick={(e) => {this.setState({disconnected: true})}} style={{cursor: 'pointer', paddingLeft: 15, color: 'red', fontSize: '24px' }}><CgCloseO /></i>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.07)',
              padding: 10,
              borderRadius: 5,
            }}>{ statusText }</div>
          </div>
          <div>
            <Videos
              switchVideo={this.switchVideo}
              remoteStreams={remoteStreams}
              // videoStream={this.state.selectedVideo && this.state.selectedVideo.stream}
            ></Videos>
          </div>
          <br />
  
          <Chat
              user={{
                uid: (this.socket && this.socket.id) || '',
                name: name || 'ndsbug',
            }}
            messages={messages}
            sendMessage={(message) => {
              this.setState(prevState => {
                return {messages: [...prevState.messages, message]}
              })
              this.state.sendChannels.map(sendChannel => {
                sendChannel.readyState === 'open' && sendChannel.send(JSON.stringify(message))
                return
              })
              this.sendToPeer('new-message', JSON.stringify(message), {local: this.socket.id})
            }}
          />
  
          {/* <div style={{zIndex: 1, position: 'fixed'}} >
            <button onClick={this.createOffer}>Offer</button>
            <button onClick={this.createAnswer}>Answer</button>
            <br />
            <textarea style={{ width: 450, height:40 }} ref={ref => { this.textref = ref }} />
          </div> */}
          {/* <br />
          <button onClick={this.setRemoteDescription}>Set Remote Desc</button>
          <button onClick={this.addCandidate}>Add Candidate</button> */}
        </div>
      )
    }
  }
  export default MainVideo