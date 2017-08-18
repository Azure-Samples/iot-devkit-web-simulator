import { Reactor, Store, toImmutable } from 'nuclear-js'

class Devkit {
    constructor(reactor) {
        this.reactor = reactor;
    }
    static PIN = [
        {
            type:"3.3V",
            address:""
        }
    ];
}

export default Devkit;