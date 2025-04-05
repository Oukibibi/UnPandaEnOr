import { useState } from 'react';
import './App.css';
import questionsData from './questions.json';

function App() {

  const [questionNumber, setQuestionNumber] = useState(0);

  const [teamBluePoints, setTeamBluePoints] = useState(0);
  const [teamRedPoints, setTeamRedPoints] = useState(0);
  const [teamGreenPoints, setTeamGreenPoints] = useState(0);

  const [currentAnswerToDisplay, setCurrentAnswerToDisplay] = useState([]);
  const [currentPointsAwarded, setCurrentPointsAwarded] = useState([]);

  const [showDebug, setShowDebug] = useState(false)

  function nextQuestion() {
    setCurrentPointsAwarded([])
    setCurrentAnswerToDisplay([])
    setQuestionNumber(questionNumber + 1)
  }

  function previousQuestion() {
    setCurrentPointsAwarded([])
    setCurrentAnswerToDisplay([])
    setQuestionNumber(questionNumber - 1)
  }

  function toggleAnswer(response) {
    setCurrentAnswerToDisplay(currentAnswerToDisplay => ({
      ...currentAnswerToDisplay,
      [response]: !currentAnswerToDisplay[response]
    }));
  };

  return (
    <div className="App">

      <div className="currentQuestion">
        <p id="questionNumber">Question N°{questionNumber + 1}</p>
        <p id="question">{questionsData.questions[questionNumber].question}</p>
        {questionsData.questions[questionNumber].reponses.map((element, index) => {
          if (currentAnswerToDisplay[index])
          {
            return (<div className='reponseBlock' key={index}>
              <div className='reponse' onClick={() => toggleAnswer(index)}>
                <p className='reponseText'>{element.reponse}</p>
                <div className='reponsePointsBlock'> 
                  <p className='reponsePoints'>{element.points}</p>
                </div>
              </div>
              <div className='buttons'>

              {!currentPointsAwarded[index] && <button onClick={() => { 
                  setTeamBluePoints(teamBluePoints + element.points) 
                  setCurrentPointsAwarded(currentPointsAwarded => ({
                    ...currentPointsAwarded,
                    [index]: !currentPointsAwarded[index]
                  }));
                }} id="buttonBlue">&gt;</button>}
              
              {!currentPointsAwarded[index] && <button onClick={() => { 
                  setTeamRedPoints(teamRedPoints + element.points) 
                  setCurrentPointsAwarded(currentPointsAwarded => ({
                    ...currentPointsAwarded,
                    [index]: !currentPointsAwarded[index]
                  }));
                }} id="buttonRed">&gt;</button>}

              {!currentPointsAwarded[index] && <button onClick={() => { 
                  setTeamGreenPoints(teamGreenPoints + element.points) 
                  setCurrentPointsAwarded(currentPointsAwarded => ({
                    ...currentPointsAwarded,
                    [index]: !currentPointsAwarded[index]
                  }));
                }} id="buttonGreen">&gt;</button>}
              </div>
            </div>
            )
          }
          return (<div className='reponseBlock' key={index}> 
            <div className='reponseYetToDiscover' onClick={() => toggleAnswer(index)}>
              <p>?</p>
            </div>
            <div className='buttons'></div>
          </div>
          )
        })}
        <div className='questionsButtons'>
        {(questionNumber - 1) >= 0 && <button onClick={previousQuestion}>Question précédente</button>}
        {(questionNumber + 1) < questionsData.questions.length && <button onClick={nextQuestion}>Question suivante</button>}
        </div>
      </div>

      <div className='points'>


        <div className="blueTeam">
          <p>Equipe Mirai</p>
          <p>{teamBluePoints}</p>
          {showDebug && <input type='number' onChange={e => setTeamBluePoints(parseInt(e.target.value))}/>}
        </div>

        <div className="redTeam">
          <p>Equipe Hooki</p>
          <p>{teamRedPoints}</p>
          {showDebug && <input type='number' onChange={e => setTeamRedPoints(parseInt(e.target.value))}/>}
        </div>
        

        <div className="greenTeam">
          <p>Equipe Drako</p>
          <p>{teamGreenPoints}</p>
          {showDebug && <input type='number' onChange={e => setTeamGreenPoints(parseInt(e.target.value))}/>}
        </div>
      </div>

      <button onClick={() => setShowDebug(!showDebug)} id="debugButton">Debug</button>
    </div>
  );
}

export default App;
