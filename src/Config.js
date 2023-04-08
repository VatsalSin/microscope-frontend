const STATE_CLASS_MAP = {
	0: 'Not-Visited',
	1: 'Visited',
	2: 'Focusing',
	3: 'Focused',
	4: 'Capturing', 
	5: 'Captured',	
};

const KEYBOARD = {
	UP_KEY: '38',
 	DOWN_KEY: '40',
 	LEFT_KEY: '37',
 	RIGHT_KEY: '39',
};

const EVENT = {
	CLIENT_REGISTER: 'client-register',
	GET_SLIDE_STATE: 'get-slide-state',
	UPDATE_SLIDE: 'update-slide',
	SLIDE_STATE_SYNC: 'slide-state-sync',
	CLIENT_REGISTERED_ACK: 'client-registered-ack',
	CONNECT: 'connect',
	DISCONNECT: 'disconnect',
	KEYUP: 'keyup'
};


// Things that can in future be moved as user input
const MAX_ROWS = 30;
const MAX_COLS = 20;
const USER_ID = 100;


export { STATE_CLASS_MAP, KEYBOARD, MAX_ROWS, MAX_COLS, USER_ID, EVENT }