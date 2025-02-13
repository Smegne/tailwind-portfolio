class AutoTyping {
  constructor(selector, text, options = {}) {
    const {
      typeSpeed = 150,
      deleteSpeed = 150,
      waitBeforeDelete = 1000,
      waitBetweenWords = 1000,
      writeWhole = false,
    } = options;

    this.selector = selector;
    this.text = text;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.waitBeforeDelete = waitBeforeDelete;
    this.waitBetweenWords = waitBetweenWords;
    this.writeWhole = writeWhole;
    this.el = document.querySelector(selector);
  }

  async start() {
    for (let i = 0; i < this.text.length; i++) {
      const word = this.text[i];
      const letters = this.writeWhole ? [word] : word.split("");
      await this.writeText(letters);
      if (i === this.text.length - 1) i = -1; // Loop back to start
    }
  }

  writeText(letters) {
    return new Promise((resolve) => {
      const element = this.el;
      let interval = setInterval(() => {
        const char = letters.shift();
        element.innerText += char;

        if (letters.length === 0) {
          clearInterval(interval);
          setTimeout(() => {
            this.deleteText(resolve);
          }, this.waitBeforeDelete);
        }
      }, this.typeSpeed);
    });
  }

  deleteText(callback) {
    const element = this.el;
    const interval = setInterval(() => {
      element.innerText = element.innerText.slice(0, -1);

      if (element.innerText.length === 0) {
        clearInterval(interval);
        setTimeout(callback, this.waitBetweenWords);
      }
    }, this.deleteSpeed);
  }
}

// Example usage
const exampleText = ['Full-stack','MERN -stack ', 'Front-end ', 'Back-end '];
const exampleTyping = new AutoTyping('#text', exampleText, {
  typeSpeed: 100,
  deleteSpeed: 100,
  waitBeforeDelete: 2000,
  waitBetweenWords: 500,
});
exampleTyping.start();
