import "../styles/Dashboard.css";
import { FaClipboardList } from "react-icons/fa";
import {FiLogOut} from "react-icons/fi";
import {MdWavingHand} from "react-icons/md";
import {useState, useEffect} from "react";
import welcomeImage from "../assets/welcome-illustration.png";
import clipboardImage from"../assets/clipboard-icon.png";
import pendingImage from "../assets/pending-icon.png";
import completedImage from "../assets/completed-icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const [isModelOpen, setIsModelOpen] =useState(false);
  const [title, setTitle] =useState("");
  const [description, setDescription] =useState("");
  const [duedate, setDueDate] =useState("");
  const [status, setStatus] =useState("Pending");
  
  const[showDeletePopup, setShowDeletePopup] =useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [showRemovePopup, setShowRemovePopup] =useState(false);
  const [removeIndex, setRemoveIndex] =useState(null);

  const navigate = useNavigate();

  const [tasks, setTasks] =useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
    .get(`http://localhost:8080/tasks/user/${userId}`)
    .then((response) => {
      setTasks(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const pendingTasks =tasks.filter(task => task.status === "Pending");
  const completedTasks =tasks.filter(task =>task.status === "Completed");

  const [editIndex, setEditIndex] = useState(null);

  async function handleSaveTask(){
    const newTask ={
      title,
      description,
      duedate,
      status
    };
    
    if (editIndex !== null){
      await axios.put(
        `http://localhost:8080/tasks/${editIndex}`,
        newTask
      );
      const response =await axios.get(
        `http://localhost:8080/tasks/user/${userId}`
      );
      setTasks(response.data);
    }
    else{
      await axios.post(
        `http://localhost:8080/tasks/${userId}`,
        newTask
      );

      const response =await axios.get(
        `http://localhost:8080/tasks/user/${userId}`
      );
      setTasks(response.data);
    }
    setTitle("");
    setDescription("");
    setDueDate("");
    setStatus("Pending");
    setEditIndex(null);
    setIsModelOpen(false);
  }


  async function handleComplete(id){
    const task =tasks.find(t=>t.id===id);
    const updatedTask ={
      ...task,
      status: "Completed"
    };
    await axios.put(
      `http://localhost:8080/tasks/${id}`,
      updatedTask
    );
    const response = await axios.get(
      `http://localhost:8080/tasks/user/${userId}`
    );
    setTasks(response.data);
  }


  async function handleDelete(){
    await axios.delete(
      `http://localhost:8080/tasks/${deleteIndex}`
    );
    const response = await axios.get(
      `http://localhost:8080/tasks/user/${userId}`
    );
    setTasks(response.data);
    setDeleteIndex(null);
    setShowDeletePopup(false);
  }


  async function handleRemove(){
    await axios.delete(
      `http://localhost:8080/tasks/${removeIndex}`
    );
    const response=await axios.get(
      `http://localhost:8080/tasks/user/${userId}`
    );
    setTasks(response.data);
    setRemoveIndex(null);
    setShowRemovePopup(false);
  }
  function handleEdit(id){
    const task=tasks.find(t=>t.id===id);

    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.duedate);
    setStatus(task.status);

    setEditIndex(id);

    setIsModelOpen(true);
  }
  function handleDeleteClick(id){
    setDeleteIndex(id);
    setShowDeletePopup(true);
  }
  function handleRemoveClick(id){
    setRemoveIndex(id);
    setShowRemovePopup(true);
  }
  function handleLogout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/login");
  }
  return (
    <div className="dashboard-container">

      {/* Header Section-------------------------------------------------------------------------------- */}
      <div className="header-div">
        <div className="title-area">
          <FaClipboardList className="clipboard-icon" />
          <h1>Task Manager</h1>
        </div>

        <button onClick={handleLogout}><FiLogOut/>Logout</button>
      </div>

      {/* Welcome Section--------------------------------------------------------------------------------- */}
      <div className="welcome-div">
        <div className="left-content">
          <h2>Welcome to Task Manager <MdWavingHand className="wave-icon"/></h2>
          <p>Manage your tasks efficiently</p>
        </div>
        <img src={welcomeImage} alt="Task Illustration" className="welcome-image"/>
      </div>

      {/* Statistics Section------------------------------------------------------------------------------- */}
      <div className="stats-div">

        <div className="stats-card total-card">
          <div className="card-content">

              <div className="icons">
                <img src={clipboardImage} alt="Task Illustration" />
              </div>

              <div className="details">
                <h3>Total Tasks</h3>
                <p>{tasks.length}</p>
              </div>
          </div>
        </div>

        <div className="stats-card pending-card">
          <div className="card-content">

            <div className="icons">
              <img src={pendingImage} />
            </div>

            <div className="details">
              <h3>Pending Tasks</h3>
              <p>{pendingTasks.length}</p>
            </div>
          </div>
        </div>

        <div className="stats-card completed-card">
          <div className="card-content">

            <div className="icons">
              <img src={completedImage} />
            </div>

            <div className="details">
              <h3>Completed Tasks</h3>
              <p>{completedTasks.length}</p>
            </div>
          </div>
        </div>

      </div>
      
      {/* Add Tasks Section--------------------------------------------------------------------------------- */}
      <div className="addtask-div">
        <button onClick={() => setIsModelOpen(true)}>
          + Add Task
        </button>
      </div>

      {/* Pending Task Section------------------------------------------------------------------------------ */}
      <div className="pendingtask-div">
        
        <div className="pendingtask-icon">
          <img src={pendingImage} alt="Pending Icon"/>
          <h3>Pending Tasks</h3>
        </div>

        <hr />

        <div className="pending-details">
          {
            pendingTasks.length === 0 
            ? <p className="shadow">No Pending Tasks</p> 
            : pendingTasks.map((task, index) => (
              <div key={index} className="task-card">
                <div className="information">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <span>{task.duedate}</span>
                </div>

                <div className="information-buttons">
                  <button onClick={()=> handleEdit(task.id)}>Edit</button>
                  <button onClick={()=> handleDeleteClick(task.id)}>Delete</button>
                  <button onClick={()=> handleComplete(task.id)}>Completed</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Completed Task Section---------------------------------------------------------------------------- */}
      <div className="completedtask-div">

        <div className="completedtask-icon">
          <img src={completedImage} alt="Compleed Icon"/>
          <h3>Completed Tasks</h3>
        </div>

        <hr />

        <div className="completed-details">
          {
            completedTasks.length === 0
            ? <p className="shadow">No Completed Tasks</p> 
            : completedTasks.map((task, index) =>(
              <div key={index} className="task-card">
                <div className="information">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <p>{task.duedate}</p>
                </div>
                <div className="information-buttons">
                  <button onClick={() => {handleRemoveClick(task.id)}}>Remove</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
{/* -------------------------------------save Task Popup--------------------- */}
      {
        isModelOpen && (
          <div className="model-overlay">

            <div className="model-box">

              <h2>Add New Task</h2>

              <div className="form-group">
                <label>Task Title</label>
                <input type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input type="date" 
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Status</label>

                <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button onClick={() => setIsModelOpen(false)}>
                  Cancel
                </button>
                <button onClick={handleSaveTask}>
                  Save Task
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* -----------------------------Delete Task Popup------------------------ */}

      {
        showDeletePopup && (
          <div className="delete-overlay">
            <div className="delete-box">
              <h3>Delete Task</h3>
              <p>Are you sure you want to delete this task?</p>

              <div className="delete-buttons">
                <button onClick={() => {
                  setDeleteIndex(null);
                  setShowDeletePopup(false);
                }}>No</button>
                <button onClick={() => handleDelete()}>Yes</button>
              </div>
            </div>
          </div>
        )
      }
      {
        showRemovePopup && (
          <div className="remove-overlay">
            <div className="remove-box">
              <h3>Remove Task</h3>
              <p>Are you sure you want to remove this task</p>

              <div className="remove-buttons">
                <button onClick={() => {
                  setRemoveIndex(null);
                  setShowRemovePopup(false);
                }}>No</button>
                <button onClick={handleRemove}>Yes</button>
              </div>
            </div>

          </div>
        )
      }
    </div>
  );
  
}

export default Dashboard;