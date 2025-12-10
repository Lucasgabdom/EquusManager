using System;
using System.Diagnostics.Contracts;

namespace EquusManager.Domain.Entities
{
    public class Cavalo
    {
        public Guid Id { get; private set; }
        public string Nome { get; private set; }
        public string Raca { get; private set; }
        public DateTime DataNascimento { get; private set; }
        public string Pelagem { get; private set; }
        public string Genero { get; private set; }

        // Construtor vazio necessário para o Entity Framework

        protected Cavalo() { }
        
        public Cavalo (string nome, string raca, DateTime dataNascimento, string pelagem, string genero)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Raca = raca;
            DataNascimento = dataNascimento;
            Pelagem = pelagem;
            Genero = genero;
        }

        public void Atualizar(string nome, string pelagem)
        {
            Nome = nome;
            Pelagem = pelagem;
        }

    }
}
