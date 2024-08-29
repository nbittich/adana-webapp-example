class TodoItem extends HTMLElement {
  constructor() {
    super();
    this._checkedEventHandler = (event) => {
      console.log(event.target.checked);
    };
  }

  get checkbox() {
    return this.querySelector(`[data-checkbox-id="${this.todoId}"]`);
  }
  get isChecked() {
    return this.checkbox.checked;
  }
  set checkedEventHandler(handler) {
    if (typeof handler === "function") {
      this._checkedEventHandler = handler;
      // Reattach event listener if the component is already in the DOM
      if (this.isConnected) {
        this.checkbox.removeEventListener("change", this._checkedEventHandler);
        this.checkbox.addEventListener("change", this._checkedEventHandler);
      }
    } else {
      console.warn("checkedEventHandler must be a function");
    }
  }
  set title(value) {
    this.setAttribute("title", value);
  }

  get title() {
    return this.getAttribute("title");
  }

  set checked(value) {
    this.setAttribute("checked", value);
  }

  get checked() {
    return this.getAttribute("checked");
  }
  get todoId() {
    return this.getAttribute("data-id");
  }
  set todoId(id) {
    this.setAttribute("data-id", id);
  }
  connectedCallback() {
    this.render();
    this.checkbox.addEventListener("change", this._checkedEventHandler);
  }
  render() {
    const title = this.title;
    const checked = this.checked === "true";
    const id = this.todoId;

    this.innerHTML = `
      <ul class="list-group list-group-horizontal rounded-0 mb-2">
          <li
            class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent"
          >
            <div class="form-check">
              <input
                class="form-check-input me-0"
                type="checkbox"
                ${checked ? "checked" : ""}
                aria-label="..."
                data-checkbox-id=${id}
              />
            </div>
          </li>
          <li
            class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
          >
            <p
              class="lead fw-normal mb-0 bg-body-tertiary w-100 ms-n2 ps-2 py-1 rounded"
            >
                    ${title}
            </p>
          </li>
  
</ul>
    `;
  }
}
customElements.define("todo-item", TodoItem);
