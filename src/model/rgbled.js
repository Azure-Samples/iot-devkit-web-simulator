class RGBLED {
    constructor() {
        this.state = false;
        this.color = [0,0,0];
    }

    setColor(r,g,b) {
        this.state = true;
        this.color = [r,g,b];
    }
}

export default RGBLED;