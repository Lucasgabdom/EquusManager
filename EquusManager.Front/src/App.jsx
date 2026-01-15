import { useState, useEffect } from 'react'
import CavaloCard from './components/CavaloCard'

function App() {
  const [cavalos, setCavalos] = useState([])
  const [erro, setErro] = useState(null)

  // URL da API (Se mudar a porta, mude aqui)
  const urlDaApi = 'https://localhost:7275/api/Cavalos'; 

  useEffect(() => {
    fetch(urlDaApi)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then(dados => setCavalos(dados))
      .catch(error => setErro(error.message));
  }, [])

  // --- NOVA FUNÇÃO: EXCLUIR ---
  const handleExcluir = (id) => {
    // 1. Pergunta se tem certeza (Segurança básica)
    if (!window.confirm("Tem certeza que deseja excluir este cavalo?")) return;

    // 2. Manda o DELETE para a API
    fetch(`${urlDaApi}/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // 3. Se deu certo na API, remove da tela instantaneamente
          // "Filtre a lista e mantenha apenas os cavalos que tem ID DIFERENTE do que eu apaguei"
          setCavalos(cavalos.filter(cavalo => cavalo.id !== id));
        } else {
          alert("Erro ao excluir. A API não deixou.");
        }
      })
      .catch(erro => console.error("Erro na exclusão:", erro));
  }

  const gridStyle = {
    display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px'
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>🐎 Equus Manager</h1>
      </header>

      <main style={{ padding: '20px' }}>
        {erro && <p style={{ color: 'red', textAlign: 'center' }}>⚠️ {erro}</p>}
        {cavalos.length === 0 && !erro && <p style={{ textAlign: 'center' }}>Nenhum cavalo encontrado...</p>}

        <div style={gridStyle}>
          {cavalos.map(cavalo => (
            // PASSAMOS A FUNÇÃO PARA O FILHO AQUI 👇
            <CavaloCard 
                key={cavalo.id} 
                cavalo={cavalo} 
                onExcluir={handleExcluir} // "Toma essa ferramenta, filho"
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App