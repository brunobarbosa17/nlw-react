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



type RoomParams = {
  id: string;
}



export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState('');
  
  const {title, questions} = useRoom(roomId);

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('Necessário estar logado!')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighligted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${params.id}/questions`).push(question);
    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do sistema" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) :
              (
                <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
              )}

            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        <div className="question-list">

          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author} />
            )
          })}
        </div>
      </main>
    </div>
  )
}