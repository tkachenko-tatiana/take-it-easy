// @flow
import BaseObserver from './BaseObserver'

export class StoreObserver extends BaseObserver<any> {
  notify = (state: any) => {
    this.listeners.forEach(listener => listener(state))
  }
}

export default new StoreObserver()
