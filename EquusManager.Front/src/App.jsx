import { useState, useEffect } from 'react'
import CavaloCard from './components/CavaloCard'
import CavaloForm from './components/CavaloForm'

function App() {
  const [cavalos, setCavalos] = useState([])
  const [erro, setErro] = useState(null)
  
  // Estado para saber quem está sendo editado (null = ninguém)
  const [cavaloSendoEditado, setCavaloSendoEditado] = useState(null);

  const urlDaApi = 'https://localhost:7275/api/Cavalos'; 

  // --- GET (Buscar) ---
  useEffect(() => {
    fetch(urlDaApi)
      .then(res => { if (!res.ok) throw new Error('Erro ao buscar'); return res.json(); })
      .then(dados => setCavalos(dados))
      .catch(error => setErro(error.message));
  }, [])

  // --- DELETE (Excluir) ---
  const handleExcluir = (id) => {
    if (!window.confirm("Tem certeza?")) return;
    fetch(`${urlDaApi}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) setCavalos(cavalos.filter(c => c.id !== id));
      });
  }

  // --- PREPARAR PARA EDITAR ---
  const handleBotaoEditar = (cavalo) => {
    setCavaloSendoEditado(cavalo); // Joga o cavalo lá pro formulário
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sobe a tela suavemente
  }

  const handleCancelarEdicao = () => {
    setCavaloSendoEditado(null);
  }

  // --- SALVAR (CRIAR ou ATUALIZAR) ---
  const handleSalvar = (cavaloDados) => {
    
    // DECISÃO: Se tem ID, é PUT (Atualizar). Se não tem, é POST (Criar).
    if (cavaloDados.id) {
        // --- ATUALIZAR (PUT) ---
        fetch(`${urlDaApi}/${cavaloDados.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cavaloDados)
        })
        .then(res => {
            if (res.ok) {
                // Atualiza a lista trocando o antigo pelo novo
                setCavalos(cavalos.map(c => c.id === cavaloDados.id ? cavaloDados : c));
                setCavaloSendoEditado(null); // Sai do modo edição
            } else {
                alert('Erro ao atualizar!');
            }
        });

    } else {
        // --- CRIAR (POST) ---
        fetch(urlDaApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cavaloDados)
        })
        .then(res => res.json())
        .then(novo => setCavalos([...cavalos, novo]))
        .catch(err => alert("Erro ao criar"));
    }
  }

  const gridStyle = { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', padding: '20px' };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1>🐎 Equus Manager</h1>
      </header>

      <main style={{ padding: '20px' }}>
        
        {/* Formulário agora recebe o cavalo para editar e a função de cancelar */}
        <CavaloForm 
            onAdicionar={handleSalvar} 
            cavaloEditando={cavaloSendoEditado}
            onCancelarEdicao={handleCancelarEdicao}
        />

        <hr style={{ margin: '30px 0', borderTop: '1px solid #ccc' }} />

        {cavalos.length === 0 && !erro && <p style={{ textAlign: 'center' }}>Nenhum cavalo cadastrado.</p>}

        <div style={gridStyle}>
          {cavalos.map(cavalo => (
            <CavaloCard 
                key={cavalo.id} 
                cavalo={cavalo} 
                onExcluir={handleExcluir}
                onEditar={handleBotaoEditar} // Passamos a nova função
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App