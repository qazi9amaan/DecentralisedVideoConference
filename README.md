# Aselpanda

This project was developed with [Angular][NodeJs][SocketIO].
Project presentation can be found here. <a href="presentation_team12.ppt">Team 12 Presentation</a>
<br>
Privacy is the driving force behind this project. It uses secure technologies like WebRTC , PeerJs , SocketIO to directly connect between participants. The website that provides the web app and mediates the communication stores as few data as possible (nearly negligible) and does not know anything about the contents of established conversations. No accounts are required. No cookies are used. No data is being saved!.  

Our Conferencing Chat Room is completely decentralised and transfers your video directly to the peer you are talking to without the need of servers in the middle. This is done using PeerJs & Socket.io


## Deployment server

Run `npm run build` for compiling and building front-end bundle.`nodemon server.js` to start the server Then  Navigate to `http://localhost:3000/` or  `https://aselpanda.ml/` (which is locally hosted). The app will start loading and you can join any room and start a conference in a secure environment.

## Screenshots
### Landing Page
<img src="/ss/1.png"></img>

### Room Page
<img src="/ss/2.png"></img>

## Features
1. Decentralised Servers 
2. Live chat (connection oriented) can support multiple users
3. Only initial connection depends on server, once connected to a specific room your network is secure and decentralised.
4. No database
4. No login / register .

## Extension
1. Include ScreenShare
2. Provide dedicated rooms
3. Record Meetings
4. Allow short urls to join meeting
