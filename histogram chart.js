import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme,
           VictoryLine, VictoryScatter,VictoryHistogram } from 'victory';

export default function App () {  
    const [data, setData] = useState([]);
  
    useEffect(() => {
        fetch('https://www.googleapis.com/fitness/v1/users/me/dataSources/raw:com.adhawk.eyetracking.fixation:407408718192:TheAdHawkMicrosystems:MINDLINK:MINDLINK-004:Fixations/datasets/1635553779905821952-1635558206920766208', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${'ya29.a0ARrdaM_IW67Ug0Kje5-ht9KnM7-SNz6biuN-CK5EZu9e6L8YElthPgRIktDcfb0xHnpOMMPagVQmi1KfvYLJ0zjcsjsYG5lviZo-GjCiP4rTxzw91iYmhLfRxCbGQ88k_EBQ54aBl__j0_hXy506Bggn79kJ'}`
            },
          })
          
          .then((response) => response.json())
          .then((json) => {setData(json.point), console.log(data[1])})
          .catch((error) => console.error(error))
      },
      []);
      console.log(data[1]);
      //problem: histogram can't edit y props, thus there needs an edit in y variable to fixation duration (adjustment)
      return (
        <VictoryChart
        theme={VictoryTheme.material}
        >                           
            <VictoryHistogram  x={(d) => new Date (d.startTimeNanos/1000000)} //working/wrong code // objective code: x={(d) => d.value[1].fpVal }
                  style={{
                    data: { stroke: "green" },
                    parent: { border: "1px solid #ccc"}
                  }}
                    data={data}
                    labels={({ datum }) => `${datum.y}`}
            />
        </VictoryChart>
      )  
};