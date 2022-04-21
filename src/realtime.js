import { OrderedMap } from "immutable";
import _ from 'lodash';

export default class Realtime{

    constructor(store){
        this.store = store;
        this.ws = null;
        this.isConnected = false;
        this.connect();
        this.reconnect();

    }
    // reconnect with server
    reconnect(){
        const store = this.store;
        window.setInterval(() => {
            const user = store.getCurrentUser();
            if(user && !this.isConnected) {
                this.connect();
            }
        }, 3000)
    }

    //decode message recieve from server
    decoMessage(msg){
        let message = {};
        try{
            message = JSON.parse(msg);
        }
        catch(err){
            console.log(err)
        }
        return message;
    }

    // process message after decode
    readMessage(msg){
        const store = this.store;
        const currentUser = store.getCurrentUser();
        const currentUserId = _.toString(_.get(currentUser, '_id'));
        const message = this.decoMessage(msg);
        const action = _.get(message, 'action');
        const payload = _.get(message, 'payload');

        switch(action){
            case 'channel_member_update':
                //to do check payload and insert new channel
                const userId_remove = _.get(payload, 'userId');
                const channel = _.get(payload, 'channel')
                console.log("edit member channel ",payload)
              
                this.updateMemberChannel(channel, userId_remove);
              
                break;
            case 'edit_user' :
                const userId = _.get(payload, 'userId');
                const value = _.get(payload, 'obj.payload', '');
                const field = _.get(payload, 'obj.field', '')
                this.updateInfoUser(userId, field, value);
                break;
            case 'typing_status':
                // console.log(payload);
                const obj = _.get(payload, 'obj');
                const channelId =  _.get(obj, 'channelId');
                let typing = _.get(obj, 'payload');
                let typier = _.get(obj, 'typier');
                this.onUpdateTypestatus(channelId, typing, typier);
                break;
            case 'user_offline':
                
                this.onUpdateUserStatus(payload, false);
                break;
            case 'user_online':
                const isOnline = true;
                this.onUpdateUserStatus(payload, isOnline);
                break;
            case 'message_added':
                
                const activeChannel = store.getActiveChannel();
                let notify = _.get(activeChannel, '_id') !== _.get(payload, 'channelId') && currentUserId !== _.get(payload, 'userId');
                this.onAddMessage(payload, notify);

            break;
            default:
                break;
            case 'channel_added':
                //to do check payload and insert new channel
                this.onAddChannel(payload);
                break;
        }
    }

    //update member in channel
    updateMemberChannel(channel, userId_remove){
        const store = this.store;
        // console.log("here in realtime", channel)
        store.removeMemberChannelFormRealtime(channel, userId_remove);
        store.update();
    }
    

    //update info user
    updateInfoUser(userId, field, value){
        const store = this.store;
        // const currentUser = store.getCurrentUser();
        // const currentUserId = _.get(currentUser, '_id');
        // Get the existing data
        let me = localStorage.getItem('me');
        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        me = me ? JSON.parse(me) : {};
        // Add new data to localStorage Array
        me[field] = value;
        // Save back to localStorage
        localStorage.setItem('me', JSON.stringify(me));
        store.setCurrentUser(me);
        store.users = store.users.update(userId, (user) => {
            if(user){
                switch(field){
                    case 'avatar':
                        user.avatar = value;
                    break;
                    case 'name':
                        user.name = value;
                    break;
                    case 'birthday':
                        user.birthday = value;
                    break;
                    case 'phone':
                        user.phone = value;
                    break;
                    case 'country':
                        user.country = value;
                    break;
                    default:
                    break;
                }
            }
            return user;
        });
       
       store.update()

    }

    //send status typing of user
    onUpdateTypestatus(channelId, isTyping = false, typier){
        const store = this.store;
        store.channels = store.channels.update(channelId, (channel) => {
            if(channel){
                channel.typing = isTyping;
                channel.typier = typier;
            }
            return channel;
        });
        store.update();
    }

    //update status user online or offline
    onUpdateUserStatus(userId, isOnline = false){
        const store = this.store;
    
        store.users = store.users.update(userId, (user) => {
            if(user){
                user.online = isOnline;
                user.lastConnection = new Date()
            }
            
            return user;
        });
        store.update();
        
    }

    //add message to cache store
    onAddMessage(payload, notify = false){
        let user = _.get(payload, 'user');
        const store = this.store;
        const currentUser = store.getCurrentUser();
        const currentUserId = _.toString(_.get(currentUser, '_id'));
        
        //add user to cache
        user = store.addUserToCache(user);

        const messageObject = {
            _id: payload._id,
            body: _.get(payload, 'body', ''),
            userId: _.get(payload, 'userId'),
            channelId: _.get(payload, 'channelId'),
            created: _.get(payload, 'created', new Date()),
            type: _.get(payload, 'type', ''),
            me: currentUserId === _.toString(_.get(payload, 'userId')),
            user: user,
        };
        // console.log("Mess listen from fetch: ", messageObject);
        store.setMessage(messageObject, notify);

    }

    //add channnel to cache
    onAddChannel(payload){
        const store = this.store;
        const channelId = `${payload._id}`;
        const userId = `${payload.userId}`;
        const users = _.get(payload, 'users', []);
        let channel = { 
            
            _id:channelId,  
            title: _.get(payload, 'title', '' ),
            lastMessage: _.get(payload, 'lastMessage', ''),
            members: new OrderedMap(),
            messages: new OrderedMap(),
            isNew: false,
            userId: userId,
            created: new Date(),
            typing: false,
        };
        _.each(users, (user) => {
            //add this user to store.users collection
            const memberId = `${user._id}`;
            this.store.addUserToCache(user);
            channel.members = channel.members.set(memberId, true);
        });
        const channelMessages = store.messages.filter((m) => _.toString(m.channelId) === channelId);
        channelMessages.forEach((msg) => {
            const msgId = _.toString(_.get(msg, '_id'));
            channel.messages = channel.messages.set(msgId, true);
        })
        store.addChannel(channelId, channel);
    }

    //send message to server
    send( msg = {}){
        try{
            const isConnected = this.isConnected;
            if(this.ws && isConnected){
                const msgString = JSON.stringify(msg);
                this.ws.send(msgString);
            }
        }
        catch{
            console.log("An Error when Send info to server is connecting!")
        }
       
    }
    //send request authentication user with token
    authentication(){
        const store = this.store;
        const tokenId = store.getUserTokenId();
        const message = {
            action: 'auth',
            payload: `${tokenId}`
        }
            this.send(message);
    }
    //main connect
    connect(){
        try{
            // const ws = new WebSocket('ws://localhost:8080');
            const ws = new WebSocket('wss://ndschatserver.herokuapp.com');
            this.ws = ws;
            ws.onopen = () => {
                //tell to server who are you ?
                this.isConnected = true;
                this.authentication();
                
                ws.onmessage = (e) => {
                    this.readMessage(_.get(e, 'data',''));
                    console.log("Message from server");
                }
            }
    
            ws.onclose = () => {
                this.isConnected = false;
                this.store.update();
            }
    
            ws.onerror = () => {
                this.isConnected = false;
                this.store.update();
            }
        }
        catch{
            console.log("An error when Connecting to Server!")
        }

    }
}