import { useState } from 'react';
import './App.css';
import questionsData from './questions.json';

function App() {

  const [questionNumber, setQuestionNumber] = useState(0);
  const [teamBluePoints, setTeamBluePoints] = useState(0);
  const [teamRedPoints, setTeamRedPoints] = useState(0);
  const [currentAnswerToDisplay, setCurrentAnswerToDisplay] = useState([]);
  const [currentPointsAwarded, setCurrentPointsAwarded] = useState([]);

  const [showDebug, setShowDebug] = useState(false)

  function nextQuestion() {
    setCurrentPointsAwarded([])
    setCurrentAnswerToDisplay([])
    setQuestionNumber(questionNumber + 1)
  }

  function toggleAnswer(response) {
    setCurrentAnswerToDisplay(currentAnswerToDisplay => ({
      ...currentAnswerToDisplay,
      [response]: !currentAnswerToDisplay[response]
    }));
  };

  return (
    <div className="App">
      <div className="blueTeam">
        <p>Equipe Mirai</p>
        <p>{teamBluePoints}</p>
        {showDebug && <input type='number' onChange={e => setTeamBluePoints(parseInt(e.target.value))}/>}
      </div>

      <div className="currentQuestion">
        <p id="questionNumber">Question N°{questionNumber + 1}</p>
        <p id="question">{questionsData.questions[questionNumber].question}</p>
        {questionsData.questions[questionNumber].reponses.map((element, index) => {
          if (currentAnswerToDisplay[index])
          {
            return (<div className='reponseBlock' key={index}>
              {!currentPointsAwarded[index] && <button onClick={() => { 
                  setTeamBluePoints(teamBluePoints + element.points) 
                  setCurrentPointsAwarded(currentPointsAwarded => ({
                    ...currentPointsAwarded,
                    [index]: !currentPointsAwarded[index]
                  }));
                }} id="buttonBlue">&lt;</button>}
              <div className='reponse' onClick={() => toggleAnswer(index)}>
                <p className='reponseText'>{element.reponse}</p>
                <div className='reponsePointsBlock'> 
                  <p className='reponsePoints'>{element.points}</p>
                </div>
              </div>
              
              {!currentPointsAwarded[index] && <button onClick={() => { 
                  setTeamRedPoints(teamRedPoints + element.points) 
                  setCurrentPointsAwarded(currentPointsAwarded => ({
                    ...currentPointsAwarded,
                    [index]: !currentPointsAwarded[index]
                  }));
                }} id="buttonRed">&gt;</button>}
            </div>
            )
          }
          return (<div className='reponseBlock' key={index}> 
            <div className='reponseYetToDiscover' onClick={() => toggleAnswer(index)}>
              <p>?</p>
            </div>
          </div>
          )
        })}
        {(questionNumber + 1) < questionsData.questions.length && <button onClick={nextQuestion}>Question suivante</button>}
      </div>

      <div className="redTeam">
        <p>Equipe Hooki</p>
        <p>{teamRedPoints}</p>
        {showDebug && <input type='number' onChange={e => setTeamRedPoints(parseInt(e.target.value))}/>}
      </div>

      <button onClick={() => setShowDebug(!showDebug)} id="debugButton">Debug</button>
    </div>
  );
}

export default App;
