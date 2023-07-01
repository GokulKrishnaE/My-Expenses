import React, { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddExpense from "./AddExpense";
import HomeHistoryOverview from "./home-page/Home-History-Overview";
import HomeBookView from "./home-page/Home-Book-View";
import { useLocation } from "react-router-dom";

// context for home components
const HomeContext = createContext()


function Home({homeViewMode}){
    const token = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('userEmail')
    const userName = sessionStorage.getItem('userName')
    const [books,setBooks] = useState([])
    const [categories,setCategories]= useState([])
    const [reLoad, setReload] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    let viewMode = homeViewMode

    
    // spending data states
    const [expenseData,setExpenseData] = useState([])
    const [categoriesArray,setCategoriesArray] = useState([])
    const [SpendChartData,setSpendChartData] = useState([])
    const [legendArray,setLegendArray] = useState([])
    const [totalAmount,setTotalAmount] = useState()


    // earning data states
    const [earningsData,setEarningsData] = useState([])
    const [earnChartData,setEarnChartData] = useState([])
    const [totalEarnigs,setTotalEarning] = useState(0)



    // data for history component
    const historyData = {
        SpendChartData: SpendChartData,
        earnChartData:earnChartData,
        totalAmount: totalAmount,
        totalEarnigs: totalEarnigs,
        legendArray: legendArray,
    }

    console.log('expesedata',expenseData)

    // home context data
    const homeContextData  = {
    expenseData: expenseData,
    earningsData: earningsData,
    categoriesArray: [],
    books: books,
    token: token,
    }

    
    // refreshing the component
    const reFresh = () =>{
        setReload(!reLoad)
    }

    // api calls

    useEffect(()=>{
        if(token){
            setIsAuthenticated(true)
            axios.get(`http://localhost:8800/api/`,{
                headers: {
                    authorization: `Bearer ${token}`
                },
            }).then(res => {
                setExpenseData(res.data.expenseData)
                setCategoriesArray(res.data.categoriesArray)
                setSpendChartData(res.data.SpendChartData)
                setLegendArray(res.data.legendArray)
                setTotalAmount(res.data.totalAmount)
            })
        }
    },[reLoad])
    useEffect(()=>{
        if(token){
            axios.get(`http://localhost:8800/api/categories/`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                setCategories(res.data[0].categories)
            })
        } 
    },[reLoad])
    useEffect(()=>{
        if(token){
            axios.get(`http://localhost:8800/api/getEarnigs/`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                setEarningsData(res.data.earningsData)
                setEarnChartData(res.data.earnChartData)
                setTotalEarning(res.data.totalEarnigs)
            })
        } 
    },[reLoad])
    useEffect(()=>{
        if(token){
            axios.get(`http://localhost:8800/api/books/getBooks/`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(res => {
                setBooks(res.data.books)
            })
        } 
    },[reLoad])

    // checking if the user is authenticated
    if(!isAuthenticated){
        return(
            <>
            <div className="container">
                <div className="notAuth">
                    <div className="text-center">
                        <h1>Error:401!</h1>
                        <p>You are not authorized to visit the page. Please login or register</p>
                    </div>
                </div>
            </div>
            </>
        )
    }

    return(
        <HomeContext.Provider value={homeContextData}>
             <div className="wrapper">
                <div className="contentArea">
                <section className="homePage pageComponent" id="homePage">
                    <div className="sectionTopArea d-none d-lg-block">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="sectionHeading">Dashboard</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="welcomeWidget">
                                <h3>Welcome {userName}!</h3>
                                
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="totalFigures">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="widgetBox totalBox earning">
                                            <span className="totalBoxLeft">
                                                <i className="fas fa-sack-dollar"></i>
                                            </span>
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <h4 className="amount earningAmountTotal mb-0"><span>₹ </span>{totalEarnigs}<i className="fas fa-arrow-up text-success ms-2 plusMinusIcon"></i></h4>
                                                <button className="btn btn-outline-primary totalBoxAdd" data-bs-toggle="modal" data-bs-target="#addEarningModal"><i className="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="widgetBox totalBox spending">
                                        <span className="totalBoxLeft">
                                            <i className="fas fa-wallet"></i>
                                        </span>
                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                <h4 className="amount spendAmountTotal mb-0"><span>₹ </span>{totalAmount}<i className="fas fa-arrow-down text-danger ms-2 plusMinusIcon"></i></h4>
                                                <button className="btn btn-outline-primary totalBoxAdd" data-bs-toggle="modal" data-bs-target="#addExpenseModal"><i className="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${viewMode == 'overview' ? 'active' : null}`} id="overview-tab" data-bs-toggle="pill" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true"><i className="fas fa-chart-line me-2"></i>Overview</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className={`nav-link ${viewMode == 'books' ? 'active' : null}`} id="books-tab" data-bs-toggle="pill" data-bs-target="#books" type="button" role="tab" aria-controls="books" aria-selected="false"><i className="fas fa-book me-2"></i>Your Books</button>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className={`tab-pane fade show ${viewMode == 'overview' ? 'active' : null}`} id="overview" role="tabpanel" aria-labelledby="overview">
                            <HomeHistoryOverview reFresh={reFresh} historyData={historyData}/>
                        </div>
                        <div className={`tab-pane fade ${viewMode == 'books' ? 'active show' : null}`} id="books" role="tabpanel" aria-labelledby="books">
                            <HomeBookView categories={categories} reFresh={reFresh} email={email}/>
                        </div>
                    </div>
                </section>
                </div>
                <AddExpense reFresh={reFresh}  categories={categories} email={email} />
            </div>
        </HomeContext.Provider>
    )
}

export default Home
export {HomeContext}