import React, { PureComponent } from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

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
    data.push({"subject":exam.therapy.name,"A":responses,"B":questions.length})
  });
  
    return (
      <ResponsiveContainer width="100%" aspect={2}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis  />
          <Radar name="Respondidas" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          <Radar name="Preguntas" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
