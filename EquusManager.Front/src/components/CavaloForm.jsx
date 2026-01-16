import React, { useState } from 'react';

function CavaloForm({ onAdicionar }) {
    // 1. Variáveis para guardar o que o usuário digita
    const [nome, setNome] = useState('');
    const [raca, setRaca] = useState('');
    const [pelagem, setPelagem] = useState('');
    const [genero, setGenero] = useState('Macho'); // Valor padrão

    // 2. Função que roda quando clica em "Salvar"
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que a página recarregue (padrão do HTML antigo)

        // Monta o objeto cavalo
        const novoCavalo = {
            nome: nome,
            raca: raca,
            pelagem: pelagem,
            genero: genero,
            dataNascimento: new Date().toISOString() // Data automática de hoje (simplificado)
        };

        // Manda pro Pai (App.jsx) resolver
        onAdicionar(novoCavalo);

        // Limpa os campos
        setNome('');
        setRaca('');
        setPelagem('');
    };

    // Estilos (CSS simples)
    const formStyle = {
        backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', maxWidth: '500px', margin: '20px auto',
        display: 'flex', flexDirection: 'column', gap: '10px'
    };

    const inputStyle = {
        padding: '10px', borderRadius: '5px', border: '1px solid #ccc'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>Novo Cavalo</h3>
            
            <input 
                type="text" placeholder="Nome do Cavalo" required
                value={nome} onChange={(e) => setNome(e.target.value)}
                style={inputStyle}
            />
            
            <input 
                type="text" placeholder="Raça (Ex: Crioulo)" required
                value={raca} onChange={(e) => setRaca(e.target.value)}
                style={inputStyle}
            />
            
            <input 
                type="text" placeholder="Pelagem (Ex: Tordilho)" required
                value={pelagem} onChange={(e) => setPelagem(e.target.value)}
                style={inputStyle}
            />

            <select 
                value={genero} onChange={(e) => setGenero(e.target.value)}
                style={inputStyle}
            >
                <option value="Macho">Macho</option>
                <option value="Femea">Fêmea</option>
            </select>

            <button type="submit" style={{
                padding: '10px', backgroundColor: '#27ae60', color: 'white',
                border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold'
            }}>
                + Cadastrar
            </button>
        </form>
    );
}

export default CavaloForm;