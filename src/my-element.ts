import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'
import cross from "/x-circle.svg"

@customElement('my-element')
export class MyElement extends TailwindElement {
  static styles = css`
    .rounded-card::part(base) {
    border-radius: 9999px;
  }

  .rounded-card::part(body) {
    padding: 0.5rem 1rem;
  }

  .icon-button::part(base) {
    padding: 0rem;
  }

  .icon-button::part(base):hover {
    color: #fff;
  }
  `;

  @property({ type: Array }) todos: string[] = [];

  @property({ type: String }) todoText: string = '';

  connectedCallback() {
    super.connectedCallback();
    const existingTodos = localStorage.getItem('todos');
    this.todos = JSON.parse(existingTodos as string) || [];
  }

  updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(event: Event) {
    event.preventDefault();
    if (!this.todoText) return;
    this.todos = [...this.todos, this.todoText];
    this.updateLocalStorage()
    this.todoText = '';
  }

  deleteTodo(index: number) {
    this.todos = this.todos.filter((_, i) => i !== index);
    this.updateLocalStorage()
  }

  render() {
    return html`
    <div class="flex flex-col items-center min-h-screen px-4 sl-theme-dark">
      <div class="flex flex-col items-center justify-center m-0 font-mono max-w-[240rem]">
        <h1>My Todo List</h1>  
        <ul class="w-full px-0 mt-1">
            ${this.todos.map((todo, index) =>
      html`
                <sl-card class="font-bold w-full my-2 rounded-full rounded-card">
                  <div class="flex w-full justify-between items-center">
                    ${todo} 
                    <sl-icon-button src=${cross} class="p-0 m-0 icon-button" @click=${() => this.deleteTodo(index)}></sl-icon-button>
                  </div>
                </sl-card>
            `)}
          </ul>
      
      
          <form @submit="${this.addTodo}" class="flex w-full justify-between">
            <sl-input class="w-full" pill .value=${this.todoText} placeholder="Introduce your note" @sl-change=${(e: any) => this.todoText = e.target.value}></sl-input>
            <sl-button class="ml-4" pill type=submit>Add</sl-button>
          </form>
        </div>
      </div>
      `;
  }
}
