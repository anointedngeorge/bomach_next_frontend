import { Table3 } from 'components/lib/Tabledata'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';





export const DashboardCharts = () => {
  


    useEffect(() => {
      let myChart = null;
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];
      if (document) {
          myChart = new Chart(
          document.getElementById('acquisitions'),
          {
            type: 'bar',
            data: {
              labels: data.map(row => row.year),
              datasets: [
                {
                  label: 'Acquisitions by year',
                  data: data.map(row => row.count)
                }
              ]
            }
          }
        );
      }

      return () => {
        myChart.current.destroy()
      }

    }, [])
    
  
  
  return (
    <div className="row">
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-chart-area me-1" />
                  Revenue Chart
                </div>
                <div className="card-body">
                    
                    <canvas id="acquisitions"></canvas>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header">
                  <i className="fas fa-chart-bar me-1" />
                  Available Notification
                </div>
                <Table3 
                thead={['name']}
                tbody={[]}
                buttons={[]}

                
                 />
              </div>
            </div>
          </div>
  )
}
