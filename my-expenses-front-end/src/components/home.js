import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddExpense from "./AddExpense";


function Home(){

    const token = localStorage.getItem('token')
    const data = localStorage.getItem('data')
    const email = localStorage.getItem('userEmail')
    const [trips,setTrips] = useState([])
    const [reLoad, setReload] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [mode, setMode] = useState('add')
    const [actionId, setActionid] = useState('')
    const [itemsCount, setItemsCount] = useState(0)

    console.log(data)

    const deleteItem = (id) =>{
        console.log(id)
        axios.delete(`http://localhost:8800/api/deleteExpense/${id}`)
        .then(res => console.log(res.data))
        window.location.reload()
    }

    const renderElement = ()=>{
        if(itemsCount > 0){
            return trips.map((trip,index)=>{
                return (
                    <tr key={index}>
                    <td>
                    {trip.title}
                    </td>
                    <td>{trip.category}</td>
                    <td>{trip.date}</td>
                    <td>{trip.amount}</td>
                    <td><a href="javascript:void(0)" onClick={()=>deleteItem(trip.id)}><i className="fas fa-trash-can text-danger deleteIcon"></i></a></td>
                    <td><a href="javascript:void(0)"><i className="fas fa-pen-to-square"></i></a></td>
                </tr>
                )
            })
        }
        else{
            return <tr><td colspan="6"><p className="warningMsg">No data. Please add item using the plus icon</p></td></tr>
        }
    }


    useEffect(()=>{
        if(token){
            setIsAuthenticated(true)
            axios.get(`http://localhost:8800/api/${email}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                console.log(res.data)
                setTrips(res.data)
                setItemsCount(res.data.length)
                setReload(true)
            })
        }
    },[reLoad])
    if(!isAuthenticated){
        return(
            <>
            <h1>you are not autherized to visit this site</h1>
            </>
        )
    }
    return(
        <div className="wrapper">
        <button className="addTrip" data-bs-toggle="modal" data-bs-target="#addExpenseModal"></button>
            <div className="contentArea">
            <section className="homePage pageComponent" id="homePage">
                <div className="sectionTopArea">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="sectionHeading">Quick View</h2>
                </div>
                </div>
                <div className="widgetBox">
                <div className="row">
                    <div className="col-lg-7">
                    <div className="d-lg-flex justify-content-between">
                                    <h2 className="widgetTitle">Recent Items</h2>
                                    <div className="showItemsCount">
                                        <span>Show</span>
                                        <select name="showCount" className="mx-2 form-control showCount">
                                            <option value="">10</option>
                                            <option value="">20</option>
                                            <option value="">30</option>
                                            <option value="">40</option>
                                        </select>
                                        <span>Items</span>
                                    </div>
                                </div>
                <div className="historyTable">
                    <div className="table-responsive">
                    <table className="table customTable" id="historyTable">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            renderElement()
                        } 
                        </tbody>
                    </table>
                    </div>
                </div>
                    </div>
                    <div className="col-lg-5">
                                <div className="options">
                                    <div className="optionRow">
                                        <div className="tableFilters">
                                            <h2 className="h5 fw-bold mb-2">Filters</h2>
                                            <div className="row">
                                                <div className="col-lg-4">
                                                    <label className="mb-2">Category</label>
                                                    <select name="selectCategory" className="form-select">
                                                        <option value="">Food</option>
                                                        <option value="">Accomodation</option>
                                                        <option value="">Travel</option>
                                                        <option value="">Others</option>
                                                    </select>
                                                </div>
                                                <div className="col-lg-4">
                                                    <label className="mb-2">Date</label>
                                                    <input type="date" name="selectDate" className="form-control"/>
                                                </div>
                                                <div className="col-lg-4">
                                                    <label className="mb-2">Month</label>
                                                    <select name="selectMonth" className="form-select">
                                                        <option value="">January</option>
                                                        <option value="">February</option>
                                                        <option value="">March</option>
                                                        <option value="">April</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="optionRow">
                                        <h2 className="h5 fw-bold mb-2">Add new category</h2>
                                        <div className="row">
                                            <div className="col-7">
                                                <input type="text" name="" id="" className="form-control"/>
                                            </div>
                                            <div className="col-5">
                                                <button className="btn btn-primary">Add Category</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                </div>
                <div className="row">
                <div className="col-lg-8">
                    <div className="widgetBox h-100">
                    <h2 className="widgetTitle">Expenses Overview</h2>
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                        <div className="chartOuter overviewChart">
                            <div className="chartWrapper">
                            <canvas id="overviewChart" />
                            <p className="chartInsideData">
                                <span>₹</span>12,0000
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-4">
                        <ul className="list-unstyled chartLegend overviewLegend">
                            <li className="legend1 d-flex justify-content-between align-items-center">
                            <p className="legendTitle">Food Expenses</p>
                            <p className="legendValue">50%</p>
                            </li>
                            <li className="legend2 d-flex justify-content-between align-items-center">
                            <p className="legendTitle">Travel Expenses</p>
                            <p className="legendValue">30%</p>
                            </li>
                            <li className="legend3 d-flex justify-content-between align-items-center">
                            <p className="legendTitle">Accomodation Expenses</p>
                            <p className="legendValue">20%</p>
                            </li>
                            <li className="legend4 d-flex justify-content-between align-items-center">
                            <p className="legendTitle">Other Expenses</p>
                            <p className="legendValue">10%</p>
                            </li>
                        </ul>
                        </div>
                        <div className="col-lg-4">
                        <div className="chartOuter overviewChart">
                            <div className="chartWrapper">
                            <canvas id="overviewBarchart" />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-4">
                            <div className="widgetBox widgetBoxColor1 upcomingTrips h-100">
                                <div className="d-flex justify-content-between">
                                    <div className="widgetTitle">Plan a..</div>
                                </div>
                                <div className="widgetData quickLinks">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <a href="javascript:void(0)">
                                                <div className="quickLink">
                                                    <div>
                                                        <i className="fas fa-globe"></i>
                                                        <span>Trip</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <div className="col-lg-4">
                                            <a href="javascript:void(0)">
                                                <div className="quickLink">
                                                    <div>
                                                        <i className="fa-solid fa-cake-candles"></i>
                                                        <span>Function</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
            </div>
            <AddExpense email={email} id={actionId} mode={mode} />
        </div>
    )
}

export default Home