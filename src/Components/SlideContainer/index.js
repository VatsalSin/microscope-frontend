import { useState, useEffect } from 'react';
import { socket } from '../../socket';
import { KEYBOARD, MAX_ROWS, MAX_COLS, USER_ID, EVENT } from '../../Config';
import SlideView from '../SlideView';
import Legend from '../Legend';
import '../../App.css';


function App() {
  let [connected, setConnected] = useState(false);
  let [slideState, setSlideState] = useState([]);
  let [pointer, setPointer] = useState(null);

  const updatePointer = (op) => {
    setPointer((prevPointer) => {
      let [newX, newY] = [0,0];
      
      if(prevPointer)
        [newX, newY] = prevPointer;
      
      switch(op) {
        case 'U':
          newX = Math.max(newX-1, 0);
          break;
        case 'D':
          newX = Math.min(newX+1, MAX_ROWS-1);
          break;
        case 'R':
          newY = Math.min(newY+1, MAX_COLS-1);
          break;
        case 'L':
          newY = Math.max(newY-1, 0);
          break;
        default:
          console.log('Invalid Operation Request. Skipping...')
      }
      
      return [newX, newY]
    })

  };

  const sendUpdateToServer = (op) => {
    console.log(`Key Press Recorded: ${op}`)
    socket.emit(EVENT.UPDATE_SLIDE, {
      clientId: USER_ID,
      operation: op[0]
    })
  };

  useEffect(() => {
    
    // Key Press Event Handlers 
    const handleKeyPress = (e) => {

      e = e || window.event;

      if (e.keyCode == KEYBOARD.UP_KEY) {
          updatePointer('U');
          sendUpdateToServer('Up');
      }
      else if (e.keyCode == KEYBOARD.DOWN_KEY) {
          updatePointer('D');
          sendUpdateToServer('Down')
      }
      else if (e.keyCode == KEYBOARD.LEFT_KEY) {
          updatePointer('L');
          sendUpdateToServer('Left')
      }
      else if (e.keyCode == KEYBOARD.RIGHT_KEY) {
          updatePointer('R');
          sendUpdateToServer('RIGHT')
      }

    }

    // Socket Event Handlers
    const onConnect = () => {
      console.log('Connected to server successfully');
      setPointer(null);

      socket.emit(EVENT.CLIENT_REGISTER, {
                  clientId: USER_ID,
                  slideNumRows: MAX_ROWS,
                  slideNumCols: MAX_COLS
                });  
      setConnected(true);
    };

    const onDisconnect = () => {
      console.log('Connection to server closed');
      setConnected(false);
    };

    const initStateSync = () => {
      console.log('Register ack received.');
      socket.emit(EVENT.GET_SLIDE_STATE, {
        clientId: USER_ID,
      });  
    };

    const onSlideStateSync = (data) => {
      console.log('New Slide State:', data.slide);
      setSlideState(data.slide.slide);

      if(!pointer || !data.queue.length) {
        setPointer([data.slide.x, data.slide.y]);
      } 
    };


    socket.connect();
    socket.on(EVENT.CONNECT, onConnect);
    socket.on(EVENT.DISCONNECT, onDisconnect);
    socket.on(EVENT.CLIENT_REGISTERED_ACK, initStateSync);
    socket.on(EVENT.SLIDE_STATE_SYNC, onSlideStateSync);
    window.addEventListener(EVENT.KEYUP, handleKeyPress);

    return () => {
      socket.off(EVENT.CONNECT, onConnect);
      socket.off(EVENT.DISCONNECT, onDisconnect);
      socket.off(EVENT.CLIENT_REGISTERED_ACK, initStateSync);
      socket.off(EVENT.SLIDE_STATE_SYNC, onSlideStateSync);
      window.removeEventListener(EVENT.KEYUP, handleKeyPress);
    };

  }, []);

  return (
    <div>
      <Legend />
      <SlideView state={slideState} pointer={pointer}/>
    </div>
  );
}

export default App;
