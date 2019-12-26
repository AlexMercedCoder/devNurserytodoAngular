import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userInfo;
  loggedIN = false;
  storedTodos;
  todos = ['example todo'];

  constructor(private http: HttpClient) { }

  addTodo (form) {
      console.log(form.form)
      const user = this.userInfo.user
      const body = {
          entry: form.form.controls.todo.value,
          user: user
      }
      fetch(`https://buffaloapidevn.herokuapp.com/todoes/`, {
          method: 'post',
          body: JSON.stringify(body)
      }).then (res => res.json())
      .then(json => {
                this.todos.push(json);
                window.localStorage.setItem('devNtodos',JSON.stringify(this.todos));
                console.log(this.todos)
      })
  }

  removeTodo (index, id) {
      this.todos.splice(index,1)
      const user = this.userInfo.user
      fetch(`https://buffaloapidevn.herokuapp.com/todoes/${id}`, {
          method: 'delete',
      }).then (res => console.log(res))
      window.localStorage.setItem('devNtodos',JSON.stringify(this.todos));
  }

  ngOnInit (){
      this.userInfo = JSON.parse(window.localStorage.getItem('devNursery'))
      this.storedTodos = JSON.parse(window.localStorage.getItem('devNtodos'))
      if (this.userInfo){
          this.loggedIN = true;
          if (this.storedTodos){
              this.todos = this.storedTodos;
          } else {
              fetch(`https://buffaloapidevn.herokuapp.com/todos/${this.userInfo.user}`)
              .then((res) => res.json())
              .then((json) => this.todos = json)
          }
      }

  }
}
