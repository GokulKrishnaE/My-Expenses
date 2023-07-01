import React, { useState,useEffect,useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DoughnutChart from './Doughnut-chart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Calendar } from 'primereact/calendar';

const BookDetails = ({setHomeViewMode}) => {

    const navigate = useNavigate()

    const token = sessionStorage.getItem('token')

    const {state} = useLocation();
    const { bookname,categories,email } = state; // Read values passed on state

    const [reLoad,setReLoad] = useState(false)
    const [bookDetailsData, setBookDetailsData] = useState([])
    const [spendingCategoriesArray, setSpendingCategoriesArray] = useState([])
    const [SpendChartData, SetSpendChartData] = useState([])
    const [spendingTotalAmount,setSpendingTotalAmount] = useState(0)

    // refresh 
    const [reFresh,setReFresh] = useState(false)

    // earning data states
    const [earningsData,setEarningsData] = useState([])
    const [earnChartData,setEarnChartData] = useState([])
    const [totalEarnigs,setTotalEarning] = useState(0)

     // getting only the values for the chart
     let earnChartDataValues = []
     earnChartData.forEach(data=>{
         earnChartDataValues.push(data.data)
     })

     const [newCategory,setNewCategory] = useState({category: ''})
     const [newExpense, setNewExpense] = useState({
        email: email,
        title: '',
        category: 'food',
        bookname: bookname,
        date: '',
        month: '',
        year: '',
        amount: '',
      })
      const [newEarning, setNewEarning] = useState({
        email: email,
        title: '',
        bookname: bookname,
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
        const url = `http://localhost:8800/api/categories/add/`
        await axios.post(url,newCategory,{
          headers: {
              Authorization: `Bearer ${token}`
          },
      })
        .then(res => {
            setReFresh(!reFresh)
        })
    }
    
      const addExpense = async () =>{
        if(newExpense.title && newExpense.category && newExpense.date && newExpense.amount,newExpense.bookname){
          document.querySelector('.errorMsg').classList.remove('active')
          const url = `http://localhost:8800/api/addExpense/`
          await axios.post(url,newExpense,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
          .then(res => {
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
              setReFresh(!reFresh)
          })
        }  
        else{
          document.querySelector('.errorMsg').classList.add('active')
        }
      }
      const addEarning = async () =>{
        if(newEarning.title && newEarning.date && newEarning.amount && newEarning.bookname){
            console.log(newEarning)
          document.querySelector('.errorMsg').classList.remove('active')
          const url = `http://localhost:8800/api/addEarning/`
          await axios.post(url,newEarning,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
          .then(res => {
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
              setReFresh(!reFresh)
          })
        }  
        else{
          document.querySelector('.errorMsg').classList.add('active')
        }
      }


    useEffect(()=>{
        if(token){
            axios.post(`http://localhost:8800/api/books/getBookDetails/spending`,{bookname:bookname},{
                headers: {
                    authorization: `Bearer ${token}`
                },
            }).then(res => {
                setBookDetailsData(res.data.bookDetailsData)
                setSpendingCategoriesArray(res.data.spendingCategoriesArray)
                SetSpendChartData(res.data.SpendChartData)
                setSpendingTotalAmount(res.data.spendingTotalAmount)
            })
        }
    },[reFresh])
    useEffect(()=>{
        if(token){
            axios.post(`http://localhost:8800/api/books/getBookDetails/earning`,{bookname:bookname},{
                headers: {
                    authorization: `Bearer ${token}`
                },
            }).then(res => {
                console.log(res.data)
                setEarningsData(res.data.earningsData)
                setEarnChartData(res.data.earnChartData)
                setTotalEarning(res.data.totalEarnigs)
            })
        }
    },[reFresh])

    const deleteItem = (id) =>{
        axios.delete(`http://localhost:8800/api/deleteExpense/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then(res =>{
            toast('item has been deleted',{
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
          })
          setReFresh(!reFresh)
    }
    const deleteItemEarn = (id) =>{
        axios.delete(`http://localhost:8800/api/deleteEarning/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then(res =>{
            toast('item has been deleted',{
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
        })
        setReFresh(!reFresh)
    }

    function goHome(){
        setHomeViewMode('books')
        navigate('/home',{state:{mode:'books'}})
    }

    const getSpendAmount = (rowData,column)=>{
        return <span>₹ {rowData.amount}</span>
    }
    const getEarnAmount = (rowData,column)=>{
        return <span>₹ {rowData.amount}</span>
    }
    const deleteSpend = (rowData,column)=>{
        return <a href="javascript:void(0)" onClick={()=>deleteItem(rowData.id)}><i className="fas fa-trash-can text-danger"></i></a>
    }
    const deleteEarn = (rowData,column)=>{
        return <a href="javascript:void(0)" onClick={()=>deleteItemEarn(rowData.id)}><i className="fas fa-trash-can text-danger"></i></a>
    }

    return (
        <div>
           <div className='wrapper'>
            <div className='contentArea'>
                <div className="sectionTopArea mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="sectionHeading">{bookname}</h2>
                        <a role='button' className='text-primary' onClick={goHome}>Go to Your Books</a>
                    </div>
                </div>
                <div className='widgetBox'>
                    <div className='d-flex justify-content-between mb-3'>
                        <h2 className='widgetTitle widgetTitle2 mb-0'>Spending</h2>
                        <button className='btn btn-primary plusButton' data-bs-toggle="modal" data-bs-target="#addExpenseBookModal"><i className='fas fa-plus'></i></button>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                        <div className="table-responsive">
                        <DataTable tableStyle={{ width:'100%' }} className="table customTable w-100" id="historyTable" value={bookDetailsData}>
                            <Column field="title" header="Title"></Column>
                            <Column field="category" header="Category" filterField="category" dataType="text" filter></Column>
                            <Column field="date" header="Date"></Column>
                            <Column body={getSpendAmount} header="Amount"></Column>
                            {/* <Column body= {toggleSpendEarn === 'spend' ? deleteIconSpend : deleteIconEarn} >
                            </Column> */}
                            <Column body={deleteSpend}></Column>
                        </DataTable>
                    </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='bookDetailsChart'>
                            <div className='chartOuter'>
                                <div className='chartWrapper'>
                                    <DoughnutChart chartData={SpendChartData}/>
                                        <p className="chartInsideData">
                                        <span>₹ {spendingTotalAmount}</span>
                                        </p>
                                    </div>
                                </div>
                                <ul className="list-unstyled chartLegend overviewLegend">{
                                    spendingCategoriesArray.map((data,index)=>{
                                        return (<li key={index} className={`legend${index+1} d-flex justify-content-between align-items-center`}>
                                        <p className="legendTitle">{data.categoryName}</p>
                                        <p className="legendValue">₹ {data.value}</p>
                                        </li>)
                                    })
                                }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='widgetBox'>
                    <div className='d-flex justify-content-between mb-3'>
                        <h2 className='widgetTitle widgetTitle2 mb-0'>Earnings</h2>
                        <button className='btn btn-primary plusButton' data-bs-toggle="modal" data-bs-target="#addEarningBookModal"><i className='fas fa-plus'></i></button>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                        <div className="table-responsive">
                        <DataTable tableStyle={{ width:'100%' }} className="table customTable w-100" id="historyTable" value={earningsData}>
                            <Column field="title" header="Title"></Column>
                            {/* <Column field="category" header="Category" filterField="category" dataType="text" filter></Column> */}
                            <Column field="date" header="Date"></Column>
                            <Column body={getEarnAmount} header="Amount"></Column>
                            {/* <Column body= {toggleSpendEarn === 'spend' ? deleteIconSpend : deleteIconEarn} >
                            </Column> */}
                            <Column body={deleteEarn}></Column>
                        </DataTable>
                    </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='bookDetailsChart'>
                                <div className='chartOuter'>
                                    <div className='chartWrapper'>
                                            <DoughnutChart chartData={earnChartDataValues}/>
                                            <p className="chartInsideData">
                                            <span>₹ {totalEarnigs}</span>
                                            </p>
                                        </div>
                                </div>
                                <ul className="list-unstyled chartLegend overviewLegend">{
                                        earnChartData.map((data,index)=>{
                                            return (<li key={index} className={`legend${index+1} d-flex justify-content-between align-items-center`}>
                                            <p className="legendTitle">{data.legend}</p>
                                            <p className="legendValue">₹ {data.data}</p>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
           <>
            <div className="modal fade" id="addExpenseBookModal">
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
            <div className="modal fade" id="addEarningBookModal">
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
        </div>
    );
}

export default BookDetails;
