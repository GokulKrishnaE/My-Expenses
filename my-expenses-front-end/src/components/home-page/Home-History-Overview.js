import React, { useContext, useState} from 'react';
import axios from "axios";
import { HomeContext } from '../home';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {FilterMatchMode,FilterOperator } from 'primereact/api'
import HomeChartEarning from './Home-Chart-Earning';
import HomeChartSpending from './Home-Chart-Spending';

// import {InputText} from 'primereact/inputtext'

// primereact css



const HomeHistoryOverview = ({historyData}) => {

    const homeContextData = useContext(HomeContext)

    const [filters,setFilteres] = useState({
        global: {value:null,matchMode: FilterMatchMode.CONTAINS},
        category: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    })

    const SpendChartData= historyData.SpendChartData
    const totalAmount= historyData.totalAmount
    const totalEarnigs= historyData.totalEarnigs
    const legendArray= historyData.legendArray
    const earnChartData = historyData.earnChartData
    const expenseData = homeContextData.expenseData
    const earningsData = homeContextData.earningsData
    const itemsCount = expenseData.length
    const [toggleSpendEarn,SetToggleSpendEarn] = useState('spend')
    console.log(itemsCount)
    // delete item from table
    const deleteItem = (id) =>{
        console.log(id)
        axios.delete(`http://localhost:8800/api/deleteExpense/${id}`)
        .then(res =>{})
        window.location.reload()
    }

    const deleteIconTemplate=(rowData, column)=> {
        return <div>
            <a href="#" onClick={()=>deleteItem(rowData.id)}><i className="fas fa-trash-can text-danger deleteIcon"></i></a>
        </div>
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
            <div className="col-lg-8">
                <div className="widgetBox widgetHistory mb-0">
                <div className='d-md-flex justify-content-between align-items-center'>
                <div className="d-md-flex">
                {toggleSpendEarn === 'spend' ? <h2 className="widgetTitle">My Spendings</h2> : <h2 className="widgetTitle">My Earnings</h2>}
                    <div class="itemSwitch toggleButton ms-3">
                        <input type="checkbox" name="itemswitch" id="itemswitch" onChange={spendEarnToggle}/>
                        <label for="itemswitch"></label>
                    </div>
                    </div>
                    <div class="input-group historySearch mb-3">
                        <input type='text' className='form-control w-auto' onInput={(e)=>setFilteres({...filters,global:{value: e.target.value, matchMode:FilterMatchMode.CONTAINS}})} />
                        <span class="input-group-text" id="basic-addon3"><i className='fa fa-magnifying-glass'></i></span>
                    </div>
                    </div>
                    <div className="historyTable">
                    <div className="table-responsive">
                    <DataTable tableStyle={{ width:'100%' }} className="table customTable w-100" id="historyTable" value={toggleSpendEarn === 'spend' ? expenseData : earningsData} filters={filters} paginator rows={10} rowsPerPageOptions={[5,10,15,20,25,30]} totalRecords={itemsCount}>
                        <Column field="title" header="Title"></Column>
                        {toggleSpendEarn === 'spend' &&  <Column field="category" header="Category" filterField="category" dataType="text" filter></Column>} 
                        <Column field="date" header="Date"></Column>
                        <Column field="amount" header="Amount"></Column>
                        <Column body={deleteIconTemplate} >
                        </Column>
                        <Column body={<a href="#"><i className="fas fa-pen-to-square"></i></a>}></Column>
                    </DataTable>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="widgetBox h-100">
                <h2 className="widgetTitle">Overview</h2>
                    <div className="chartOuter overviewChart">
                        <div className="chartWrapper">
                        {toggleSpendEarn === 'spend' ? <HomeChartSpending SpendChartData={SpendChartData} /> : <HomeChartEarning earnChartData={earnChartData}/>}
                        <p className="chartInsideData">
                            {toggleSpendEarn === 'spend' ? <span>₹ {totalAmount}</span> : <span>₹ {totalEarnigs}</span>}
                        </p>
                        </div>
                    </div>
                    <ul className="list-unstyled chartLegend overviewLegend">{
                        legendArray.map((legends,index)=>{
                            return (<li key={index} className="legend1 d-flex justify-content-between align-items-center">
                            <p className="legendTitle">{legends.legend}</p>
                            <p className="legendValue">{legends.value}</p>
                            </li>)
                        })
                    }
                    </ul>
                </div>
            </div>
        </div></>
    );
}

export default HomeHistoryOverview;
