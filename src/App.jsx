import axios from "axios"
import { useEffect, useState } from "react"


const App = () => {

const [question, setQuestion] = useState(null)
const [index, setIndex] = useState(0)
useEffect(() => {
  axios.get('https://the-trivia-api.com/v2/questions')
  .then((res)=>{
    console.log(res.data);
    setQuestion(res.data)
  })
  .catch((err)=>{
   console.log(err);
  })
}, [])
const nextQustions =()=>{
   setIndex(index + 1)
}
  return (
  <>
  <h1>Qiuz app</h1>
  {question ? <div>

    <h2>Q{index}</h2>
    {question[index].question.text}
    <br />
    <button onClick={()=>
      nextQustions()
    }>Next</button>
  </div> 
    : <h2>Loading.....</h2>}
  </>
  )
}

export default App