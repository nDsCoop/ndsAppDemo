import React, { Component } from 'react'
import DragDrop from './DragDrop';
import { IconButton } from '@material-ui/core';
import { RiDragDropLine } from 'react-icons/ri';
class UpLoadFilePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    sendMessage = (data) => {
        this.props.sendMessage(data);
        // scrollToBottom()
    }

    render() {

        return (
            <div className="input-upload-img-user">
               
             <DragDrop
                sendFiles={(files) => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                    //https://blog.mozilla.org/webrtc/large-data-channel-messages/
                    //https://lgrahl.de/articles/demystifying-webrtc-dc-size-limit.html
                    const maximumMessageSize = 262118 //65535 <=== 64KiB // 16384 <=== 16KiB to be safe
                    if (e.target.result.length <= maximumMessageSize)
                        this.sendMessage({id: this.getRandomInt(9) ,type: 'image', data: e.target.result })
                    else
                        alert('Message exceeds Maximum Message Size!')
                    }

                    reader.readAsDataURL(files[0])
                }}
                >
                    <IconButton style={{fontSize: '2rem'}}>
                        <RiDragDropLine />
                    </IconButton>
                
            </DragDrop>
            <span>Drag and Drop Your Image Here</span>
            </div>
        )
    }
}
export default UpLoadFilePhoto