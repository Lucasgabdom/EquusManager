import { useState, useEffect } from 'react'
import CavaloCard from './components/CavaloCard' // <--- Importamos o molde!

function App() {
  const [cavalos, setCavalos] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {
    // Lembre de conferir se a porta 7275 é a correta do seu back-end
    const urlDaApi = 'https://localhost:7275/api/Cavalos'; 

    fetch(urlDaApi)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then(dados => setCavalos(dados))
      .catch(error => setErro(error.message));
  }, [])

  // Estilo do Container (A "Mesa" onde jogamos as cartas)
  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Permite que os cards quebrem linha
    gap: '20px',
    justifyContent: 'center',
    padding: '20px'
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      
      {/* Cabeçalho simples */}
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>🐎 Equus Manager</h1>
      </header>

      <main style={{ padding: '20px' }}>
        {erro && <p style={{ color: 'red', textAlign: 'center' }}>⚠️ {erro}</p>}

        {cavalos.length === 0 && !erro && (
            <p style={{ textAlign: 'center' }}>Nenhum cavalo encontrado...</p>
        )}

        {/* Aqui usamos o Container Grid */}
        <div style={gridStyle}>
          {cavalos.map(cavalo => (
            // Para cada cavalo, desenhamos um Card
            <CavaloCard key={cavalo.id} cavalo={cavalo} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App