import { useState, useEffect } from 'react'

function App() {
  // 1. Criamos uma "gaveta" para guardar os cavalos
  const [cavalos, setCavalos] = useState([])
  
  // 2. Criamos uma "gaveta" para guardar erros (se houver)
  const [erro, setErro] = useState(null)

  // 3. useEffect: Roda assim que a tela carrega
  useEffect(() => {
    // URL da sua API (CONFIRA A PORTA DO SEU SWAGGER AQUI 👇)
    const urlDaApi = 'https://localhost:7275/api/Cavalos'; 

    fetch(urlDaApi)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
      })
      .then(dados => {
        console.log("Dados recebidos:", dados); // Para olhar no Console do navegador
        setCavalos(dados);
      })
      .catch(error => {
        console.error("Deu ruim:", error);
        setErro(error.message);
      });
  }, []) // O array vazio [] diz: "Rode apenas 1 vez no início"

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🐎 Equus Manager - Plantel</h1>
      <p>Gerenciamento de Cavalos</p>

      {/* Se tiver erro, mostra mensagem vermelha */}
      {erro && <p style={{ color: 'red' }}>⚠️ {erro}</p>}

      {/* Se a lista estiver vazia e não tiver erro */}
      {cavalos.length === 0 && !erro && <p>Carregando ou nenhum cavalo encontrado...</p>}

      {/* A Lista de Cavalos */}
      <ul>
        {cavalos.map(cavalo => (
          <li key={cavalo.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <strong>{cavalo.nome}</strong> - {cavalo.raca} ({cavalo.pelagem})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App