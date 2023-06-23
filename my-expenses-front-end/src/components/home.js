import React, { createContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AddExpense from "./AddExpense";
import HomeHistoryOverview from "./home-page/Home-History-Overview";
import HomeBookView from "./home-page/Home-Book-View";

    // context for home components
const HomeContext = createContext()


function Home(){

    const token = sessionStorage.getItem('token')
    const email = sessionStorage.getItem('userEmail')
    const userName = sessionStorage.getItem('userName')
    const [earningsData,setEarningsData] = useState([])
    const [expenseData,setExpenseData] = useState([])
    const [categories,setCategories]= useState([])
    const [reLoad, setReload] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [actionId, setActionid] = useState('')

    let categoriesArray = []
    const addedCategories = []
    let legendArray = []
    const SpendChartData= []
    const earnChartData=[]
    let totalAmount = 0
    let totalEarnigs = 0



    // home context data
    const homeContextData  = {
        expenseData: expenseData,
        earningsData: earningsData,
        categoriesArray: [],
        token: token
    }

    console.log(expenseData)

    expenseData.forEach((expense)=>{
        addedCategories.indexOf(expense.category) === -1 && addedCategories.push(expense.category)
    })
    addedCategories.forEach((category,index) =>{
        categoriesArray.push({
            categoryName: category,
            value: 0
        })
        expenseData.forEach(expense =>{
            if(categoriesArray[index].categoryName == expense.category){
                categoriesArray[index].value += expense.amount
            }
        })
        SpendChartData.push(categoriesArray[index].value)
        let legends={
            legend: categoriesArray[index].categoryName,
            value: categoriesArray[index].value
        }
        legendArray.push(legends)
    })


    expenseData.forEach(expense =>{
        totalAmount+=expense.amount
    })
    earningsData.forEach(earning =>{
        totalEarnigs+=earning.amount
    })

    const historyData = {
        SpendChartData: SpendChartData,
        earnChartData:earnChartData,
        totalAmount: totalAmount,
        totalEarnigs: totalEarnigs,
        legendArray: legendArray,
    }

    homeContextData.categoriesArray = categoriesArray

    earningsData.forEach((earning)=>{
        let data = {
            data:earning.amount,
            legend: earning.title
        }
        earnChartData.push(data)
    })

    const reFresh = () =>{
        setReload(!reLoad)
    }

    useEffect(()=>{
        if(token){
            setIsAuthenticated(true)
            axios.get(`http://localhost:8800/api/`,{
                headers: {
                    authorization: `Bearer ${token}`
                },
            }).then(res => {
                setExpenseData(res.data)
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
                setEarningsData(res.data)
            })
        } 
    },[reLoad])
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
                <button className="addTrip" data-bs-toggle="modal" data-bs-target="#addExpenseModal"></button>
                <div className="contentArea">
                <section className="homePage pageComponent" id="homePage">
                    <div className="sectionTopArea">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="sectionHeading">Dashboard</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-5">
                            <div class="welcomeWidget">
                                <h3>Welcome {userName}!</h3>
                                <p>Here is your overall details about your spending and earning. Click on the full details to view the detailed report.</p>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="totalFigures">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="widgetBox totalBox earning">
                                            <h4>Earnings for this month <i class="fa fa-arrow-up text-success"></i></h4>
                                            <h4 class="amount earningAmountTotal"><span>$ </span>{totalEarnigs}</h4>
                                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEarningModal">Add Earning</button>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="widgetBox totalBox spending">
                                            <h4>Spending for this month <i class="fa fa-arrow-down text-danger"></i></h4>
                                            <h4 class="amount spendAmountTotal"><span>$ </span>{totalAmount}</h4>
                                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addExpenseModal">Add Spending</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="overview-tab" data-bs-toggle="pill" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">Overview</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="books-tab" data-bs-toggle="pill" data-bs-target="#books" type="button" role="tab" aria-controls="books" aria-selected="false">My Books</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                            <HomeHistoryOverview historyData={historyData}/>
                        </div>
                        <div class="tab-pane fade" id="books" role="tabpanel" aria-labelledby="books">
                            <HomeBookView reFresh={reFresh}/>
                        </div>
                    </div>
                </section>
                </div>
                <AddExpense reFresh={reFresh}  categories={categories} email={email} id={actionId} />
            </div>
        </HomeContext.Provider>
    )
}

export default Home
export {HomeContext}