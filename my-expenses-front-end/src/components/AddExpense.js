import { useState } from "react"
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom"

function AddExpense({email}){

  const [newExpense, setNewExpense] = useState({
    email: email,
    title: '',
    category: 'food',
    date: '',
    amount: ''
  })

  function handleAdd(e){
    const value = e.target.value;
    console.log(value)
    setNewExpense({
      ...newExpense,
      [e.target.name]: value
    })
  }

  const addExpense = async () =>{
    console.log(newExpense)
    if(newExpense.title && newExpense.category && newExpense.date && newExpense.amount){
      console.log('going in')
      document.querySelector('.errorMsg').classList.remove('active')
      const url = `http://localhost:8800/api/addExpense/${email}`
      await axios.post(url,newExpense)
      .then(res => {
          console.log(res.data)
          window.location.reload()
      })
    }  
    else{
      console.log('error')
      document.querySelector('.errorMsg').classList.add('active')
    }
  }

    return(
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
                            <a href="javascript:void(0)"><i className="fas fa-plus"></i> Add a category</a>
                        </div>
                        <select name="category" className="form-select" value={newExpense.category} onChange={handleAdd}>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="accomodation">Accomodation</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="label">Date</label>
                        <input type="date" name="date" className="form-control" value={newExpense.date} onChange={handleAdd}/>
                    </div>
                    <div className="form-group">
                        <label className="label">Cost</label>
                        <input type="number" name="amount" className="form-control" value={newExpense.amount} onChange={handleAdd}/>
                    </div>
                </div>
                <p className="errorMsg">Fields can't be empty</p>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={addExpense}>Add Expense</button>
                </div>
              </div>
            </div>
          </div>
    )
}

export default AddExpense