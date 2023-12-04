import React, { useEffect} from "react";
import Sidebar from "../Components/Navbar/Sidebar";
import TobBar from "../Components/Navbar/TobBar";
import LineChartOD from "./vendors/charts/LineChart";
import ReportCard from "./vendors/others/ReportCard";
import './vendors/style/core.css'
import PieChartOD from "./vendors/charts/PieChart";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, setOrder } from "../features/UserReducer";


const Dashboard = () => {
  const { orders,loading} = useSelector((state) => state.order_list);
  const dash = [
    {
      title : 'total ordered',
      value: orders.length,
      icon: "fa-truck"
    },
    {
      title : 'total delivered',
      value: orders.filter((order) => order.status === 'delivered').length,
      icon: "fa-truck"
    },
    {
      title : 'new orders',
      value: orders.filter((order) => order.status === 'order').length,
      icon: "fa-truck"
    },
  ]
  const dispatch = useDispatch()
  useEffect(()=>{
    const getData = async() =>{
      try {
        dispatch(setLoading())
        const response = await axios.get('https://65630c3eee04015769a6bb77.mockapi.io/orders')
      dispatch(setOrder(response.data))
        
      } catch (error) {
        console.log(error)
      }
    }
    getData()
 
  },[dispatch])
  return (
    <div id="page-top">
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TobBar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a> */}
              </div>
              <div className="row">
               
                {
                  dash.map((report,index)=> <ReportCard {...report} loading={loading}  key={index} /> )
                }
                
              </div>

              <div className="row ">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4 ">
                    <div className="card-header py-3 text-center">
                      <h6 className="m-0 font-weight-bold text-orange">Earnings Overview</h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-area">
                        
                        <LineChartOD />

                      </div>
                    </div>
                  </div>
                </div>


                <div className="col-xl-4 col-lg-5">
                  <div className="card shadow mb-4">
                    
                    <div className="card-header py-3 text-center">
                      <h6 className="m-0 font-weight-bold text-orange">Revenue Sources</h6>
                    </div>
                    
                    <div className="card-body">
                      <div className="chart-pie">
                            <PieChartOD />
                      </div>
                      <div className="mt-4 text-center small">
                        <span className="mr-2">
                          <i className="fas fa-circle text-primary" /> Direct
                        </span>
                        <span className="mr-2">
                          <i className="fas fa-circle text-success" /> Social
                        </span>
                        <span className="mr-2">
                          <i className="fas fa-circle text-info" /> Referral
                        </span>
                      </div>
                    </div>
                  </div>
                </div>


              </div>





            </div>

















          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
