import React from "react";

// Este componente recebe as "props" (os dados do Cavalo)
function CavaloCard({ cavalo, onExcluir }) {

    // Estilo do Cartão (CSS no JavaScript)
    const cardStyle = {
        border: '1px solid #ddd', // Corrigi a cor para cinza (#ddd)
        borderRadius: '8px',
        padding: '16px',
        margin: '10px', 
        width: '250px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const titleStyle = {
        color: '#2c3e50',
        margin: '0 0 10px 0'
    };

    // CORREÇÃO 1: Arrumei o nome para badgeStyle (com Y)
    const badgeStyle = {
        display: 'inline-block',
        padding : '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: cavalo.genero === 'Macho' ? '#e3f2fd' : '#fce4ec',
        color: cavalo.genero === 'Macho' ? '#1565c0' : '#c2185b',
        marginTop: '5px' // CORREÇÃO 2: Era margintTop, agora é marginTop
    };

    return (
        <div style={cardStyle}>
            <h3 style={titleStyle}>{cavalo.nome}</h3>
            <div style={{ textAlign: 'left', fontSize: '14px', color: '#555' }}>
                <p><strong>Raça:</strong> {cavalo.raca}</p>
                <p><strong>Pelagem:</strong> {cavalo.pelagem}</p>
                <div style={{ textAlign: 'center' }}>
                    {/* Agora a variável existe! */}
                    <span style={badgeStyle}>{cavalo.genero}</span>
                </div>
            </div>

            <button
            //A mágica acontece aqui
            onClick={() => onExcluir(cavalo.id)}
            style={{
                marginTop: '15px',
                padding: '8px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
            }}
            >
                Excluir
            </button>
        </div>
    );
}

// CORREÇÃO 3: Faltava essa linha essencial no final!
export default CavaloCard;