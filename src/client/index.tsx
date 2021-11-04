import React from 'react'
import {render} from 'react-dom'
import '@scss/index.scss'
import 'react-calendar/dist/Calendar.css'
import {App} from '@react/App'
import UserAPI from '@api/UserAPI'
import TaskAPI from '@api/TaskAPI'
import { ILogin } from '@interfaces/IUser'
import { INewTask } from '@interfaces/ITask'
import {store} from '@redux/store'
import {setUser} from '@redux/actions/userActions'
import {saga} from '@redux/saga/saga'
import rootSaga from '@redux/saga/rootSaga'
import { IUserInstance } from '@interfaces/IUser'


async function start() {
  try {
    const user: IUserInstance = await UserAPI.getCurrentUser();
    store.dispatch(setUser(user));
    render(<App />, document.getElementById('root'));
  }
  catch(e) {
    console.error(e);
    render(<App />, document.getElementById('root'));
  }
}

async function wsTest() {
  try {
    const wsConnection = new WebSocket('ws://37.193.148.113:3009');
    wsConnection.onopen = () => {
      console.log('connection open');
    }
    wsConnection.onmessage = (event) => {
      console.log(`Data: ${event.data}`);
    }
    wsConnection.onclose = () => {
      console.log('connection closed');
    }
    wsConnection.onerror = (e: any) => {
      console.error(`Error is: ${e}`);
    }
  }
  catch(e) {
    console.error(`Error is: ${e}`);
  }
}

saga.run(rootSaga);

start();
wsTest();