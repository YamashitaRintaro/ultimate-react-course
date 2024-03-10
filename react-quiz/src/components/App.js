import { useEffect, useReducer } from "react";
import Error from './Error';
import Header from "./Header";
import Loader from './Loader';
import Question from "./Question";
import StartScreen from "./StartScreen";
import Main from './main';

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'start':
      return {
        ...state,
        status: 'active'
      }
    case 'newAnswer':
      return {
        ...state,
        answer: action.payload
      }
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && <Question question={questions[index]} dispatch={dispatch} answer={answer} />}
      </Main>
    </div>
  );
}

export default App;
