import { useState, useEffect } from 'react'
import CavaloCard from './components/CavaloCard'
import CavaloForm from './components/CavaloForm' // <--- Importamos o Formulário!

function App() {
  const [cavalos, setCavalos] = useState([])
  const [erro, setErro] = useState(null)

  // URL da API
  const urlDaApi = 'https://localhost:7275/api/Cavalos'; 

  // --- BUSCAR (GET) ---
  useEffect(() => {
    fetch(urlDaApi)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar dados');
        return res.json();
      })
      .then(dados => setCavalos(dados))
      .catch(error => setErro(error.message));
  }, [])

  // --- EXCLUIR (DELETE) ---
  const handleExcluir = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    fetch(`${urlDaApi}/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          setCavalos(cavalos.filter(cavalo => cavalo.id !== id));
        } else {
          alert("Erro ao excluir. A API não deixou.");
        }
      })
      .catch(erro => console.error("Erro na exclusão:", erro));
  }

  // --- NOVO: ADICIONAR (POST) ---
  const handleAdicionar = (novoCavalo) => {
    fetch(urlDaApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Avisa a API que estamos mandando JSON
        },
        body: JSON.stringify(novoCavalo) // Transforma o objeto JS em texto JSON
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // A API devolve o cavalo criado (com ID novo)
        } else {
            throw new Error('Erro ao criar cavalo');
        }
    })
    .then(cavaloCriado => {
        // Adiciona na lista visualmente (O "..." espalha os antigos e põe o novo no final)
        setCavalos([...cavalos, cavaloCriado]);
    })
    .catch(error => alert("Erro ao salvar: " + error.message));
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
        
        {/* Aqui entra o Formulário novo */}
        <CavaloForm onAdicionar={handleAdicionar} />

        <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid #ccc' }} />

        {erro && <p style={{ color: 'red', textAlign: 'center' }}>⚠️ {erro}</p>}

        <div style={gridStyle}>
          {cavalos.map(cavalo => (
            <CavaloCard 
                key={cavalo.id} 
                cavalo={cavalo} 
                onExcluir={handleExcluir} 
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App