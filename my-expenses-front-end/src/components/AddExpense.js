import { useState } from "react"
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom"

function AddExpense({email,categories,reFresh}){

  console.log('addexpense renderd')

  const [newCategory,setNewCategory] = useState({category: ''})
  const [newExpense, setNewExpense] = useState({
    email: email,
    title: '',
    category: 'food',
    date: '',
    amount: ''
  })


  function handleAdd(e){
    const value = e.target.value;
    setNewExpense({
      ...newExpense,
      [e.target.name]: value
    })
  }

  const addNewCategory = async () =>{
    console.log(newCategory)
    const url = `http://localhost:8800/api/categories/add/${email}`
    await axios.post(url,newCategory)
    .then(res => {
        console.log(res)
        reFresh()
    })
}

  const addExpense = async () =>{
    if(newExpense.title && newExpense.category && newExpense.date && newExpense.amount){
      document.querySelector('.errorMsg').classList.remove('active')
      const url = `http://localhost:8800/api/addExpense/${email}`
      await axios.post(url,newExpense)
      .then(res => {
          console.log(res.data)
          reFresh()
      })
    }  
    else{
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
                            <a href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#addCategoryForm"><i className="fas fa-plus"></i> Add a category</a>
                        </div>
                        <div className="form-group collapse" id="addCategoryForm">
                          <div className="row">
                            <div className="col-7">
                              <input type="text" value={newCategory.category} onChange={(e)=>setNewCategory({category:e.target.value})} className="form-control"/>
                            </div>
                            <div className="col-5">
                              <button className="btn btn-primary" onClick={addNewCategory}><i class="fas fa-plus"></i></button>
                            </div>
                          </div>
                        </div>
                        <select name="category" className="form-select" value={newExpense.category} onChange={handleAdd}>
                          {categories.map(category=>{
                            return <option>{category}</option>
                          })}
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