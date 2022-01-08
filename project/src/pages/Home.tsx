import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg';

import '../styles/auth.scss'

import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';


export default function Home() {

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  function handleCreateRoom() {
    if (!user) {
      signInWithGoogle();
    }
    
    history.push('/rooms/new')
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      return alert('Sala inexistente!');
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Imagem do logo" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">
            ou entre em uma sala
          </div>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                value={roomCode}
                onChange={e=>setRoomCode(e.target.value)}
              />
              <Button type="submit">
                Entrar na sala
              </Button>
            </form>
        </div>
      </main>
    </div>
  )
}
