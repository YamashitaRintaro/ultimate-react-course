import { useQuiz } from "../context/QuizContext";
import Error from './Error';
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Header from "./Header";
import Loader from './Loader';
import NextButton from "./NextButton";
import Progress from "./Progress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import Timer from "./Timer";
import Main from './main';

function App() {
  const { status } = useQuiz()

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" &&
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
