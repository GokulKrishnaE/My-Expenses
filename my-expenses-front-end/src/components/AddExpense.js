import { useState,useContext } from "react"
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Calendar } from 'primereact/calendar';

import { HomeContext } from './home';

function AddExpense({email,categories,reFresh}){

  const homeContextData = useContext(HomeContext)
  const token = homeContextData.token
  
  const [newCategory,setNewCategory] = useState({category: ''})
  const [newExpense, setNewExpense] = useState({
    email: email,
    title: '',
    category: 'food',
    date: '',
    month: '',
    year: '',
    amount: '',
  })
  const [newEarning, setNewEarning] = useState({
    email: email,
    title: '',
    date: '',
    month: '',
    year: '',
    amount: '',
  })


  function handleAdd(e){
    const value = e.target.value;
    setNewExpense({
      ...newExpense,
      [e.target.name]: value
    })
  }
  function handleEarning(e){
    const value = e.target.value;
    setNewEarning({
      ...newEarning,
      [e.target.name]: value
    })
  }


  function handleDate(e){
    const value = e.target.value;
    var date = value.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var month = monthNames[value.getMonth()];
    var year = value.getFullYear();
    var dateStr = date + "/" + month + "/" + year;
    setNewExpense({
      ...newExpense,
      date: dateStr,
      month:month,
      year: year
    })
  }
  function handleDateEarning(e){
    const value = e.target.value;
    var date = value.getDate();
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var month = monthNames[value.getMonth()];
    var year = value.getFullYear();
    var dateStr = date + "/" + month + "/" + year;
    setNewEarning({
      ...newEarning,
      date: dateStr,
      month:month,
      year: year
    })
  }

  const addNewCategory = async () =>{
    console.log(newCategory)
    const url = `http://localhost:8800/api/categories/add/`
    await axios.post(url,newCategory,{
      headers: {
          Authorization: `Bearer ${token}`
      },
  })
    .then(res => {
        console.log(res)
        reFresh()
    })
}

  const addExpense = async () =>{
    if(newExpense.title && newExpense.category && newExpense.date && newExpense.amount){
      document.querySelector('.errorMsg').classList.remove('active')
      const url = `http://localhost:8800/api/addExpense/`
      await axios.post(url,newExpense,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
      .then(res => {
          console.log(res.data)
          toast('item has been added',{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success"
          })
          reFresh()
      })
    }  
    else{
      document.querySelector('.errorMsg').classList.add('active')
    }
  }
  const addEarning = async () =>{
    if(newEarning.title && newEarning.date && newEarning.amount){
      document.querySelector('.errorMsg').classList.remove('active')
      const url = `http://localhost:8800/api/addEarning/`
      await axios.post(url,newEarning,{
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
      .then(res => {
          console.log(res.data)
          toast('New Earning has been added',{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success"
          })
          reFresh()
      })
    }  
    else{
      document.querySelector('.errorMsg').classList.add('active')
    }
  }

    return(
       <>
        <div className="modal fade" id="addExpenseModal">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addExpenseModalLabel">Add Expense</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                <div className="form-group">
                        <label className="label">Title</label>
                        <input type="text" className="form-control" name="title" value={newExpense.title} onChange={handleAdd}/>
                    </div>
                    <div className="form-group">
                        <div className="d-flex justify-content-between">
                            <label className="label">Category</label>
                            <a href="#" data-bs-toggle="collapse" data-bs-target="#addCategoryForm"><i className="fas fa-plus"></i> Add a category</a>
                        </div>
                        <div className="form-group collapse" id="addCategoryForm">
                          <div className="row">
                            <div className="col-7">
                              <input type="text" value={newCategory.category} onChange={(e)=>setNewCategory({category:e.target.value})} className="form-control"/>
                            </div>
                            <div className="col-5">
                              <button className="btn btn-primary" onClick={addNewCategory}><i className="fas fa-plus"></i></button>
                            </div>
                          </div>
                        </div>
                        <select name="category" className="form-select" value={newExpense.category} onChange={handleAdd}>
                          {categories.map((category,index)=>{
                            return <option key={index}>{category}</option>
                          })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Date</label>
                        <Calendar value={newExpense.date} onChange={handleDate} dateFormat="dd/mm/yy" />
                        {/* <input type="date" name="date" className="form-control" value={newExpense.date} onChange={handleAdd}/> */}
                    </div>
                    <div className="form-group">
                        <label className="label">Cost</label>
                        <input type="number" name="amount" className="form-control" value={newExpense.amount} onChange={handleAdd}/>
                    </div>
                    <p className="errorMsg">Fields can't be empty</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={addExpense}>Add Expense</button>
                </div>
              </div>
            </div>
        </div>
        <div className="modal fade" id="addEarningModal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addEarningModalLabel">Add Earning</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
            <div className="form-group">
                    <label className="label">Title</label>
                    <input type="text" className="form-control" name="title" value={newEarning.title} onChange={handleEarning}/>
                </div>
                <div className="form-group">
                    <label className="label">Date</label>
                    <Calendar value={newEarning.date} onChange={handleDateEarning} dateFormat="dd/mm/yy" />
                    {/* <input type="date" name="date" className="form-control" value={newEarning.date} onChange={handleEarning}/> */}
                </div>
                <div className="form-group">
                    <label className="label">Amount</label>
                    <input type="number" name="amount" className="form-control" value={newEarning.amount} onChange={handleEarning}/>
                </div>
                <p className="errorMsg">Fields can't be empty</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={addEarning}>Add Earning</button>
            </div>
          </div>
        </div>
        </div>
       </>
    )
}

export default AddExpense