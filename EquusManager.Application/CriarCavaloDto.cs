using System;

namespace EquusManager.Application.DTOs
{
    public class CriarCavaloDto
    {
        // Inicializamos com string.Empty para o erro sumir
        public string Nome { get; set; } = string.Empty;
        public string Raca { get; set; } = string.Empty;
        public string Pelagem { get; set; } = string.Empty;
        public string Genero { get; set; } = string.Empty;

        public DateTime DataNascimento { get; set; }
    }
}