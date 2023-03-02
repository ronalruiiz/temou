import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LineDos({exams}){
  let data = []
  exams.forEach(exam => {
    const questions = JSON.parse(exam.questions).filter((question) => question.type!="text")
    let responses = 0
    
    questions.forEach(question=>{
      if(question.type == "single" && question.response != null ){
        responses += 1
      }if(question.type == "multiple" && question.response.length > 0 ){
        responses += 1
      }
    })
    
    let result =  (responses / questions.length ) *100
    data.push({"name":exam.therapy.name,"uv":result})
  });

    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

