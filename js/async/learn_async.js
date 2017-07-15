var async = require('async');

const task_runner = function (task, done) {
  if (task.name === "tcp") {
    setTimeout(() => {
      console.log("TCP, data = ", task.data);
      done();
    }, 500);
  } else if (task.name === "pause") {
    setTimeout(() => {
      console.log("PAUSE, data = ", task.data);
      done();
    }, 250);
  }
}

// when number concurent tasks 1 it effectivly runs async code sequentially
// change value and run code to see different behavior. 
const number_concurent_tasks = 1; 
const task_queue = async.queue(task_runner, number_concurent_tasks);

task_queue.drain = function() {
  console.log("All request have been executed");
}

task_queue.push({name: "tcp", data: 1});
task_queue.push({name: "pause", data: -1});
task_queue.push({name: "tcp", data: 2});
task_queue.push({name: "pause", data: -2});
task_queue.push({name: "tcp", data: 3});
task_queue.push({name: "pause", data: -3});

/** 
* Removing task from Quey
* remove is passed an objec with a data property that contains the tasks that
* where pushed in. It expects a test, if true the item will be removed. 
*/
// task_queue.remove((queued_task) => {
//   console.log(`task = ${JSON.stringify(queued_task.data)}`);
//   return queued_task.data.data === -2;
// });
