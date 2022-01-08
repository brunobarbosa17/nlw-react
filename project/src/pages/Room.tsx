import logoImg from '../assets/logo.svg'
import Button from '../components/Button'
import RoomCode from '../components/RoomCode'

import '../styles/room.scss'

import { useParams } from 'react-router-dom'
import {useState} from 'react';
import { useAuth } from '../hooks/useAuth'

type RoomParams = {
  id: string;
}

export function Room() {
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');

  async function handleSendQuestion() {
    if (newQuestion.trim() === '') {
      return;
    }

    if(!user) {
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
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Logo do sistema" />
          <RoomCode code={params.id}/>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala Title</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea 
            placeholder='O que você quer perguntar?'
            value={newQuestion}
            onChange={e=>setNewQuestion(e.target.value)}
            />
            <div className="form-footer">
              <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
              <Button type="submit">Enviar pergunta</Button>
            </div>
        </form>
      </main>
    </div>
  )
}