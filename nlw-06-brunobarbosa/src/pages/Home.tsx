import illustrationImg from '../assets/illustration.svg'
import logoImg from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg';

import '../styles/auth.scss'

export default function Home() {
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
          <button>
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>
          <div>
            ou entre em uma sala
            <form>
              <input
                type="text"
                placeholder="Digite o código da sala"
              />
              <button type="submit">
                Entrar na sala 
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
