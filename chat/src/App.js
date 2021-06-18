
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Join} from './components/Join/Join'
import {Chat} from './components/Chat/Chat'
import { videochat } from './components/VideoChat/videochat';

// var io = require('socket.io-client')
// const SERVER =  "http://127.0.0.1:8080";
function App() {
//   var socket = io.connect(socketClient (SERVER))
//   socket.on('connection', (socket) => {
//     console.log(`I'm connected with the back-end`);
// });
  return (
    <Router>
    <Route exact path="/" component={Join}/>
    <Route path="/chat" component={Chat}/>
    <Route path="/videochat" component={videochat}/>
    </Router>
  );
}

export default App;
