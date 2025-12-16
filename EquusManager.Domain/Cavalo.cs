using System;

namespace EquusManager.Domain.Entities
{
    public class Cavalo
    {
        public int Id { get; private set; }

        // TRUQUE: = string.Empty;
        // Isso diz: "Se ninguém passar valor, comece como um texto vazio, mas NUNCA nulo".
        // Isso mata o erro CS8618.
        public string Nome { get; private set; } = string.Empty;
        public string Raca { get; private set; } = string.Empty;
        public string Pelagem { get; private set; } = string.Empty;
        public string Genero { get; private set; } = string.Empty;

        public DateTime DataNascimento { get; private set; }

        // Construtor Vazio (Obrigatório para o EF Core funcionar)
        protected Cavalo() { }

        // Construtor que usamos para criar (Note que ele preenche as variáveis)
        public Cavalo(string nome, string raca, DateTime dataNascimento, string pelagem, string genero)
        {
            Nome = nome;
            Raca = raca;
            DataNascimento = dataNascimento;
            Pelagem = pelagem;
            Genero = genero;
        }

        //Método para atualizar os dados

        public void AtualizarDados(string nome, string raca, DateTime dataNascimento, string pelagem, string genero)
        {
            Nome = nome;
            Raca = raca;
            DataNascimento = dataNascimento;
            Pelagem = pelagem;
            Genero = genero;
        }
    }
}