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

const number_concurent_tasks = 2; 
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
