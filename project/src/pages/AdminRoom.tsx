import logoImg from '../assets/logo.svg'
import Button from '../components/Button'
import RoomCode from '../components/RoomCode'

import '../styles/room.scss'

import { useParams } from 'react-router-dom'
import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import Question from '../components/Question'
import { useRoom } from '../hooks/useRoom'

import deleteImg from '../assets/delete.svg'

type RoomParams = {
  id: string;
}



export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  
  const {title, questions} = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do sistema" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}>
                <button>
                  <img src={deleteImg} alt="Deletar pergunta" />
                </button>
                  </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}