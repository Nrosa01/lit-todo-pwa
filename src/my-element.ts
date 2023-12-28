import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { TailwindElement } from './core/tailwind'

@customElement('my-element')
export class MyElement extends TailwindElement {
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
  }

  deleteTodo(todo: string) {
    this.todos = this.todos.filter(t => t !== todo);
    this.updateLocalStorage()
  }

  render() {
    return html`
    <div class="flex flex-col items-center min-h-screen sl-theme-dark">
      <div class="flex flex-col items-center justify-center m-0 font-mono">
        <h1>My Todo List</h1>  
        <ul class="w-full px-0 mt-1">
            ${this.todos.map(todo => html`
            <div class="flex w-full justify-between bg-slate-700 rounded-full my-4">
              <sl-menu-item class="rounded-full font-bold">${todo}</sl-menu-item>
              <sl-icon-button class="p-1" name="x-circle" @click=${() => this.deleteTodo(todo)}></sl-icon-button>
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
