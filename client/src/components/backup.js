<div className="row">
<div className="col-lg-8">
    <div className="widgetBox h-100">
        <div className="d-flex justify-content-between align-items-center">
            <h2 className="widgetTitle">Expenses Overview</h2>
            <div className="dropdown checkBoxDropdown customDropdown">
                        <span className="form-select" data-bs-toggle="dropdown" data-bs-auto-close="outside">Select Categories</span>
                        <ul className="dropdown-menu">
                            {
                                categories.map((category,index)=>{
                                    let isChecked = chartLegends.includes(category)
                                    return(
                                        <li className="pb-2" key={index}>
                                            <input type="checkbox" name="categoryCheckboxes" checked={isChecked} value={category} id={category} onChange={handleCategoryCheckboxes}/>
                                            <label htmlFor={category}>{category}</label>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
        </div>
        <div className="row align-items-center">
            <div className="col-lg-4">
            <div className="chartOuter overviewChart">
                <div className="chartWrapper">
                <HomeDoughnutChart chartData={chartData} />
                <p className="chartInsideData">
                    <span>₹</span>{totalAmount}
                </p>
                </div>
            </div>
            </div>
            <div className="col-lg-4">
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
            <div className="col-lg-4">
            <div className="chartOuter overviewChart">
                <div className="chartWrapper">
               
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
                            <a href="#">
                                <div className="quickLink">
                                    <div>
                                        <i className="fas fa-globe"></i>
                                        <span>Trip</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4">
                            <a href="#">
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