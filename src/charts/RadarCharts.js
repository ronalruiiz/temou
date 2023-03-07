import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     subject: 'Math',
//     A: 120,
//     B: 110,
//     fullMark: 150,
//   },
//   {
//     subject: 'Chinese',
//     A: 98,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: 'English',
//     A: 86,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     subject: 'Geography',
//     A: 99,
//     B: 100,
//     fullMark: 150,
//   },
//   {
//     subject: 'Physics',
//     A: 85,
//     B: 90,
//     fullMark: 150,
//   },
//   {
//     subject: 'History',
//     A: 65,
//     B: 85,
//     fullMark: 150,
//   },
// ];

export default function RadarCharts({exams}){
  let data = []
  exams.forEach(exam => {
    const questions = JSON.parse(exam.questions).filter((question) => question.type=="single" || question.type == "multiple")
    let responses = 0
    
    questions.forEach(question=>{
      if (question.response != null){
        if(question.type == "single" ){
          responses += 1
        }if(question.type == "multiple" && question.response.length > 0 ){
          responses += 1
        }
      }
    })
    
    let result =  (responses / questions.length ) *100
    data.push({"subject":exam.therapy.name,"respuestas":responses,"preguntas":questions.length})
  });
  
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <BarChart
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
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="respuestas" fill="#8884d8" />
          <Bar dataKey="preguntas" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
