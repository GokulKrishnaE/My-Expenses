import React, { useContext, useState} from 'react';
import axios from "axios";
import { HomeContext } from '../home';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {FilterMatchMode,FilterOperator } from 'primereact/api'
import DoughnutChart from './Doughnut-chart';



const HomeHistoryOverview = ({historyData,reFresh}) => {

    const homeContextData = useContext(HomeContext)
    const SpendChartData= historyData.SpendChartData
    const totalAmount= historyData.totalAmount
    const totalEarnigs= historyData.totalEarnigs
    const legendArray= historyData.legendArray
    const earnChartData = historyData.earnChartData

    // getting only the values for the chart
    let earnChartDataValues = []
    earnChartData.forEach(data=>{
        earnChartDataValues.push(data.data)
    })

    console.log(homeContextData)

    // taking data from context
    const expenseData = homeContextData.expenseData
    const earningsData = homeContextData.earningsData
    const token = homeContextData.token

    const itemsCount = expenseData.length
    const [toggleSpendEarn,SetToggleSpendEarn] = useState('spend')

    // datatable filters
    const [filters,setFilteres] = useState({
        global: {value:null,matchMode: FilterMatchMode.CONTAINS},
        category: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    })

    // delete item from table
    const deleteItem = (id) =>{
        axios.delete(`http://localhost:8800/api/deleteExpense/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then(res =>{})
        reFresh()
    }
    const deleteItemEarn = (id) =>{
        axios.delete(`http://localhost:8800/api/deleteEarning/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        .then(res =>{})
        reFresh()
    }

    const deleteIconSpend=(rowData, column)=> {
        return <div>
            <a href="#" onClick={()=>deleteItem(rowData.id)}><i className="fas fa-trash-can text-danger deleteIcon"></i></a>
        </div>
    }
    const deleteIconEarn=(rowData, column)=> {
        return <div>
            <a href="#" onClick={()=>deleteItemEarn(rowData.id)}><i className="fas fa-trash-can text-danger deleteIcon"></i></a>
        </div>
    }

    const tableAmount = (rowData,column)=>{
        return <span>₹ {rowData.amount}</span>
    }

    function spendEarnToggle(e){
        if(e.target.checked){
            SetToggleSpendEarn('earn')
        }
        else{
            SetToggleSpendEarn('spend')
        }
    }

    return (
        <>
        <div className="row">
            <div className="col-lg-8 mb-4 mb-lg-0">
                <div className="widgetBox widgetHistory mb-0">
                <div className='d-md-flex justify-content-between align-items-center'>
                <div className="d-flex align-items-center">
                {toggleSpendEarn === 'spend' ? <h2 className="widgetTitle widgetTitle2">My Spendings</h2> : <h2 className="widgetTitle widgetTitle2">My Earnings</h2>}
                    <div className="toggleButton overviewToggle ms-sm-1">
                        <input type="checkbox" name="itemswitch" id="itemswitch" onChange={spendEarnToggle}/>
                        <label htmlFor="itemswitch"><i className='fas fa-repeat ms-2 text-primary'></i></label>
                    </div>
                    </div>
                    <div className="input-group historySearch mb-3">
                        <input type='text' className='form-control w-auto' onInput={(e)=>setFilteres({...filters,global:{value: e.target.value, matchMode:FilterMatchMode.CONTAINS}})} />
                        <span className="input-group-text" id="basic-addon3"><i className='fa fa-magnifying-glass'></i></span>
                    </div>
                    </div>
                    <div className="historyTable">
                    <div className="table-responsive">
                    <DataTable tableStyle={{ width:'100%' }} className="table customTable w-100" id="historyTable" value={toggleSpendEarn === 'spend' ? expenseData : earningsData} filters={filters} paginator rows={10} rowsPerPageOptions={[5,10,15,20,25,30]} totalRecords={itemsCount}>
                        <Column field="title" header="Title"></Column>
                        {toggleSpendEarn === 'spend' &&  <Column field="category" header="Category" filterField="category" dataType="text" filter></Column>} 
                        <Column field="date" header="Date"></Column>
                        <Column header="Amount" body={tableAmount}></Column>
                        <Column body= {toggleSpendEarn === 'spend' ? deleteIconSpend : deleteIconEarn} >
                        </Column>
                        <Column body={<a href="#"><i className="fas fa-pen-to-square"></i></a>}></Column>
                    </DataTable>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="widgetBox h-100">
                    <div className='d-flex justify-content-between'>
                        <h2 className="widgetTitle widgetTitle2">Breakdown</h2>
                        {/* <p role='button' className='fw-bold text-primary' data-bs-toggle="modal" data-bs-target="#compareModal">Compare<i className="fa-solid fa-repeat ms-2"></i></p> */}
                    </div>
                    <div className="chartOuter overviewChart">
                        <div className="chartWrapper">
                        {toggleSpendEarn === 'spend' ? <DoughnutChart chartData={SpendChartData} /> : <DoughnutChart chartData={earnChartDataValues}/>}
                        <p className="chartInsideData">
                            {toggleSpendEarn === 'spend' ? <span>₹ {totalAmount}</span> : <span>₹ {totalEarnigs}</span>}
                        </p>
                        </div>
                    </div>
                    <ul className="list-unstyled chartLegend overviewLegend">{
                        toggleSpendEarn === 'spend'
                        ? legendArray.map((legends,index)=>{
                            return (<li key={index} className={`legend${index+1} d-flex justify-content-between align-items-center`}>
                            <p className="legendTitle">{legends.legend}</p>
                            <p className="legendValue">₹ {legends.value}</p>
                            </li>)
                        })
                        : earnChartData.map((data,index)=>{
                            return (<li key={index} className={`legend${index+1} d-flex justify-content-between align-items-center`}>
                            <p className="legendTitle">{data.legend}</p>
                            <p className="legendValue">₹ {data.value}</p>
                            </li>)
                        })
                    }
                    </ul>
                </div>
            </div>
        </div>
      
        </>
    );
}

export default HomeHistoryOverview;
