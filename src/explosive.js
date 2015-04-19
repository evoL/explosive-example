import EventEmitter from "eventemitter3";

class Explosive extends EventEmitter {
  ajaxFinished() {
    return this.emit('ajax:finish');
  }
}

export var instance = new Explosive();
export let explosive = function(method, ...args) {
  if (typeof instance[method] !== "function") {
    throw new Error(`Invalid method: ${method}`);
  }

  instance[method].apply(instance, args);
}
