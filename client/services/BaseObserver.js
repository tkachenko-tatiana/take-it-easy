// @flow

class BaseObserver<Listener> {
  listeners: Array<Listener>

  constructor () {
    this.listeners = []
  }

  subscribe = (listener: Listener) => {
    if (!listener) {
      return -1
    }

    this.listeners.push(listener)
    return this.listeners.length - 1 // index of added listeners
  }

  unsubscribe = (index: number) => {
    this.listeners.splice(index, 1)
  }
}

export default BaseObserver
