import React, { useState, useEffect } from 'react';

function CavaloForm({ onAdicionar, cavaloEditando, onCancelarEdicao }) {
    // States dos campos
    const [id, setId] = useState(null); // Guardamos o ID escondido
    const [nome, setNome] = useState('');
    const [raca, setRaca] = useState('');
    const [pelagem, setPelagem] = useState('');
    const [genero, setGenero] = useState('Macho');

    // MÁGICA: Quando "cavaloEditando" mudar (clicou no botão), preenche os campos
    useEffect(() => {
        if (cavaloEditando) {
            setId(cavaloEditando.id);
            setNome(cavaloEditando.nome);
            setRaca(cavaloEditando.raca);
            setPelagem(cavaloEditando.pelagem);
            setGenero(cavaloEditando.genero);
        } else {
            limparFormulario();
        }
    }, [cavaloEditando]);

    const limparFormulario = () => {
        setId(null);
        setNome('');
        setRaca('');
        setPelagem('');
        setGenero('Macho');
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Monta o objeto
        const cavaloDados = {
            id: id, // Se for nulo, é criação. Se tiver número, é edição.
            nome,
            raca,
            pelagem,
            genero,
            dataNascimento: new Date().toISOString()
        };

        // Manda pro Pai resolver
        onAdicionar(cavaloDados);
        limparFormulario();
    };

    // Estilos CSS
    const formStyle = {
        backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '20px auto',
        display: 'flex', flexDirection: 'column', gap: '10px', border: cavaloEditando ? '2px solid #f1c40f' : 'none'
    };
    const inputStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>
                {cavaloEditando ? '✏️ Editando Cavalo' : '➕ Novo Cavalo'}
            </h3>
            
            <input type="text" placeholder="Nome" required value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Raça" required value={raca} onChange={(e) => setRaca(e.target.value)} style={inputStyle} />
            <input type="text" placeholder="Pelagem" required value={pelagem} onChange={(e) => setPelagem(e.target.value)} style={inputStyle} />

            <select value={genero} onChange={(e) => setGenero(e.target.value)} style={inputStyle}>
                <option value="Macho">Macho</option>
                <option value="Femea">Fêmea</option>
            </select>

            <button type="submit" style={{
                padding: '10px', 
                backgroundColor: cavaloEditando ? '#f1c40f' : '#27ae60', // Amarelo se edita, Verde se cria
                color: cavaloEditando ? '#333' : 'white',
                border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
            }}>
                {cavaloEditando ? 'Salvar Alterações' : 'Cadastrar'}
            </button>

            {/* Botão Cancelar só aparece se estiver editando */}
            {cavaloEditando && (
                <button type="button" onClick={onCancelarEdicao} style={{ padding: '5px', cursor: 'pointer', background: 'transparent', border: 'none', color: '#777' }}>
                    Cancelar Edição
                </button>
            )}
        </form>
    );
}

export default CavaloForm;