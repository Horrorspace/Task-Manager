import React from 'react'
import {render} from 'react-dom'
import '@scss/index.scss'
import {App} from './react/App'
import UserAPI from '@core/classes/UserAPI'
import TaskAPI from '@core/classes/TaskAPI'
import { ILogin } from '@interfaces/IUser'
import { INewTask } from '@interfaces/ITask'
import {saga} from '@redux/saga/saga'
import rootSaga from '@redux/saga/rootSaga'





const testUser: ILogin = {
  email: "tester@test.com",
  password: "111111111"
}

const testTask: INewTask<string> = {
  dateToDo: '2026-12-11 20:27:48+07',
  email: testUser.email,
  title: 'test',
  task: 'testing'
}

async function testAPI() {
  //await UserAPI.toLogout();
  await UserAPI.toLogin(testUser);
  return await TaskAPI.downloadAllTasks();

  //await UserAPI.toLogout();
  // console.log(await UserAPI.getCurrentUser());
  // console.log(await UserAPI.toLogout());
  // console.log(await UserAPI.getCurrentUser());
}

// testAPI().then(
//   d => console.log('ok', d)
// )


saga.run(rootSaga);

render(<App />, document.getElementById('root'))