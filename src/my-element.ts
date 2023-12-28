import { html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'
import cross from "/x-circle.svg" 

@customElement('my-element')
export class MyElement extends TailwindElement {
  @property({ type: Array }) todos: string[] = [];

  @property({ type: String }) todoText: string = '';

  @state() count = 0;

  connectedCallback() {
    super.connectedCallback();
    const existingTodos = localStorage.getItem('todos');
    this.todos = JSON.parse(existingTodos as string) || [];
    const existingCount = localStorage.getItem('count');
    this.count = JSON.parse(existingCount as string) || 0;
    this.count++;
    this.updateLocalStorage()
  }

  updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    localStorage.setItem('count', JSON.stringify(this.count));
  }

  addTodo(event: Event) {
    event.preventDefault();
    if (!this.todoText) return;
    this.todos = [...this.todos, this.todoText];
    this.updateLocalStorage()
  }

  deleteTodo(todo: string) {
    this.todos = this.todos.filter(t => t !== todo);
    this.updateLocalStorage()
  }

  render() {
    return html`
    <div class="flex flex-col items-center min-h-screen sl-theme-dark">
      <div class="flex flex-col items-center justify-center m-0 font-mono">
        <h1>My Todo List ${this.count}</h1>  
        <ul class="w-full px-0 mt-1">
            ${this.todos.map(todo => html`
            <div class="flex w-full justify-between bg-slate-700 rounded-full my-4">
              <sl-menu-item class="rounded-full font-bold">${todo}</sl-menu-item>
              <sl-icon-button src=${cross} class="p-1" @click=${() => this.deleteTodo(todo)}></sl-icon-button>
            </div>
            `)}
          </ul>
      
      
          <form @submit="${this.addTodo}" class="flex w-full">
            <sl-input pill placeholder="Introduce your note" @sl-change=${(e: any) => this.todoText = e.target.value}></sl-input>
            <sl-button class="ml-4" pill type=submit>Add</sl-button>
          </form>
        </div>
      </div>
      `;
  }
}
