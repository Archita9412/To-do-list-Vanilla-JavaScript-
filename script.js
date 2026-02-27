// Add task in array(tasks)
const todoinput= document.getElementById("todoinput");
const addbutton=document.getElementById("Add");
const todolist =document.getElementById("list-id");

let tasks=JSON.parse(localStorage.getItem("tasks") ) || [];

tasks.forEach((task) => rendertask(task));

addbutton.addEventListener("click",()=>{
const tasktext=todoinput.value.trim();
if(tasktext==="") return;
const newtask = {
id: Date.now(),
text:tasktext,
completed:false,
};
tasks.push(newtask);
rendertask(newtask);
savetask();
todoinput.value="";
console.log(tasks);
});
//render(display) task to user
function rendertask(task){
  console.log(task);
  const li=document.createElement("li");
  li.dataset.id = task.id;
  if(task.completed)
  {
    li.classList.add("completed");
  }
 const span = document.createElement("span");
  span.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

    li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    savetask();
  });

 deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks = tasks.filter(t => t.id !== task.id);
    li.remove();
    savetask();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todolist.appendChild(li);
}

// Array in local Storage
function savetask(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
