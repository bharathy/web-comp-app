
// import counterTemplate from './counter.tml.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    button, p {
      display: inline-block;
    }
    p { color: green; }
  </style>

  <button class="dec" aria-label="decrement">-</button>
    <p>0</p>
  <button class="inc" aria-label="increment">+</button>
  <slot>counter text</slot>
`;

class CustomCounter extends HTMLElement {
    // Attributes we care about getting values from.
    static get observedAttributes() {
        // return ['value'];
    }

    set value(value) {
        this._value = value;
        this.valueElement.innerText = this._value;
        this.dispatchEvent(new CustomEvent('valueChange', { detail: this._value }));
    }

    get value() {
        return this._value;
    }
    constructor() {
        super();
        this._value = 0;
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));

        this.valueElement = this.root.querySelector('p');
        this.incrementButton = this.root.querySelector('.inc');
        this.decrementButton = this.root.querySelector('.dec');

        this.incrementButton
            .addEventListener('click', (e) => this.value++);

        this.decrementButton
            .addEventListener('click', (e) => this.value--);

    }
    
    connectedCallback() {
        console.log(`%c connectedCallback: %c Useful for running setup code, such as fetching resources or rendering`,'color: #bada55; font-weight: bold', 'color: black');
    }

    disconnectedCallback() {
        this.incrementButton
            .removeEventListener('click', (e) => this.value++);

        this.decrementButton
            .removeEventListener('click', (e) => this.value--);
        console.log(`%c disconnectedCallback: %c Called every time the element is removed from the DOM. Useful for running clean up code (removing event listeners, etc.).`,'color: #bada55; font-weight: bold', 'color: black');
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'value') {
            this.value = parseInt(newValue, 10);
        }
        console.log(`%c attributeChangedCallback: %c Called when an attribute is added, removed, updated, or replaced. Also called for initial values when an element is created by the parser or upgraded.`,'color: #bada55; font-weight: bold', 'color: black');
    }
}

customElements.define('custom-counter', CustomCounter);