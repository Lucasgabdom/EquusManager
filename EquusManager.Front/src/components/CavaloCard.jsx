import React from "react";

function CavaloCard({ cavalo, onExcluir, onEditar }) { // <--- Recebendo onEditar

    const cardStyle = {
        border: '1px solid #ddd', borderRadius: '8px', padding: '16px', margin: '10px', 
        width: '250px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff',
        textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    };

    const titleStyle = { color: '#2c3e50', margin: '0 0 10px 0' };

    const badgeStyle = {
        display: 'inline-block', padding : '4px 8px', borderRadius: '12px',
        fontSize: '12px', fontWeight: 'bold',
        backgroundColor: cavalo.genero === 'Macho' ? '#e3f2fd' : '#fce4ec',
        color: cavalo.genero === 'Macho' ? '#1565c0' : '#c2185b',
        marginTop: '5px'
    };

    return (
        <div style={cardStyle}>
            <h3 style={titleStyle}>{cavalo.nome}</h3>
      
            <div style={{ textAlign: 'left', fontSize: '14px', color: '#555' }}>
                <p><strong>Raça:</strong> {cavalo.raca}</p>
                <p><strong>Pelagem:</strong> {cavalo.pelagem}</p>
                <div style={{ textAlign: 'center' }}>
                    <span style={badgeStyle}>{cavalo.genero}</span>
                </div>
            </div>

            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {/* BOTÃO EDITAR (NOVO) */}
                <button 
                    onClick={() => onEditar(cavalo)} // Manda o cavalo inteiro pro pai
                    style={{ 
                        padding: '8px', backgroundColor: '#f1c40f', color: '#fff', 
                        border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                    }}
                >
                    Editar
                </button>

                {/* BOTÃO EXCLUIR */}
                <button 
                    onClick={() => onExcluir(cavalo.id)}
                    style={{ 
                        padding: '8px', backgroundColor: '#e74c3c', color: 'white', 
                        border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
                    }}
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default CavaloCard;