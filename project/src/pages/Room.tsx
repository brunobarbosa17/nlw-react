import logoImg from '../assets/logo.svg'
import Button from '../components/Button'
import RoomCode from '../components/RoomCode'

import '../styles/room.scss'

import { useParams } from 'react-router-dom'
import { FormEvent, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type RoomParams = {
  id: string;
}

export function Room() {
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');

  useEffect( () => {
    const roomRef = database.ref(`rooms/${params.id}`);

    roomRef.once('value', room => {
      console.log(room.val());
    })
  }, [])

  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault();

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

    await database.ref(`rooms/${params.id}/questions`).push(question);
    setNewQuestion('');
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

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder='O que você quer perguntar?'
            value={newQuestion}
            onChange={e=>setNewQuestion(e.target.value)}
            />
            <div className="form-footer">
              { user ? (
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
      </main>
    </div>
  )
}