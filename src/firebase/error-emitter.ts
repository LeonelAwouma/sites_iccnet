import { EventEmitter } from 'events';

// This is a global event emitter to handle Firebase permission errors
export const errorEmitter = new EventEmitter();
