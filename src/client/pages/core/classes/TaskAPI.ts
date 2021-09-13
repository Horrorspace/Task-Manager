import {Subscription} from 'rxjs'
import {fromFetch} from 'rxjs/fetch'
import {map, filter} from 'rxjs/operators'
import {apiUrl} from '@core/const/urlConst'
import NewTask from '@core/classes/NewTask'
import Task from '@core/classes/Task'
import Tasks from '@core/classes/Tasks'
import {ITaskInstance, ITasksInstance, ITask} from '@interfaces/ITask'


export default class TaskAPI {
    private static taskMainKeys: string[] = ['title', 'task', 'dateToDo'];
    private static taskMainTypes: string[] = ['string', 'string', 'string'];
    private static newTaskKeys: string[] = [...TaskAPI.taskMainKeys, 'email'];
    private static newTaskTypes: string[] = [...TaskAPI.taskMainTypes, 'string'];
    private static taskKeys: string[] = [...TaskAPI.taskMainKeys, 'id', 'userId', 'created', 'dateOfComplete',
    'dateOfCancel', 'dateOfDelete', 'isPriority', 'isComplete', 'isCancel', 'isDelete'];
    private static taskTypes: string[] = [...TaskAPI.taskMainTypes, 'number', 'number', 'string', 'string',
    'string', 'string', 'boolean', 'boolean', 'boolean', 'boolean'];
    private static tasksUrl: string = `${apiUrl}/tasks`

    private static headers: Headers = new Headers({
        'Content-Type': 'application/json'
    })

    constructor() {}

    private static taskCheck(task: Object): boolean {
        if(TaskAPI.taskKeys.every(key => task.hasOwnProperty(key))) {
            return TaskAPI.taskKeys.every((key, i) => typeof(task[key]) === TaskAPI.taskTypes[i]);
        }
        else {
            return false
        }
    }

    private static newTaskCheck(task: Object): boolean {
        if(TaskAPI.newTaskKeys.every(key => task.hasOwnProperty(key))) {
            return TaskAPI.newTaskKeys.every((key, i) => typeof(task[key]) === TaskAPI.newTaskTypes[i]);
        }
        else {
            return false
        }
    }

    private static async downloadTasks(urlPart: string): Promise<ITasksInstance> {
        return new Promise((resolve, reject) => {
            const tasks: ITasksInstance = new Tasks();
            const url: string = `${TaskAPI.tasksUrl}/${urlPart}`;
            const data$ = fromFetch(url, {
                method: 'GET',
                headers: TaskAPI.headers
            }).pipe(
                map(val => {
                    if(val.status === 200 ) {
                        return val.json()
                    }
                    else {
                        throw {
                            status: val.status,
                            message: 'API error'
                        }
                    }
                }),
                filter((val: any) => typeof(val) === 'object'),
                filter((val: any) => TaskAPI.taskCheck(val)),
                map((task: ITask<string>): ITaskInstance => new Task(task))
            );
            const sub: Subscription = data$.subscribe({
                next: (task: ITaskInstance): void => {
                    tasks.addTask(task)
                },
                complete: () => {
                    resolve(tasks)
                },
                error: (e) => {
                    reject(e)
                }
            })
        })
    }

    public static async downloadAllTasks(): Promise<ITasksInstance> {
        return await TaskAPI.downloadTasks('all_tasks')
    }

    public static async downloadPriorityTasks(): Promise<ITasksInstance> {
        return await TaskAPI.downloadTasks('priority_tasks')
    }
}