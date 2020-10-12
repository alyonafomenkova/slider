class Subject {
    constructor(value) {
        this.observers = [];
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
        this.observers.forEach((observer) => {
            observer(value);
        });
    }
    attach(observer) {
        if (this.observers.includes(observer)) {
            // eslint-disable-next-line no-console
            console.log('Observer already attached.');
        }
        else {
            this.observers.push(observer);
            observer(this.value);
        }
    }
    detach(observer) {
        const index = this.observers.indexOf(observer);
        if (index === -1) {
            // eslint-disable-next-line no-console
            console.log('Observer not found.');
        }
        else {
            this.observers.splice(index, 1);
        }
    }
}
export default Subject;
//# sourceMappingURL=Subject.js.map