using EquusManager.Application.DTOs;
using EquusManager.Application.Interfaces;
using EquusManager.Domain.Entities;
using EquusManager.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore; // <--- Importante para o ToListAsync funcionar

namespace EquusManager.Infrastructure.Services
{
    public class CavaloService : ICavaloService
    {
        private readonly EquusDbContext _context;

        public CavaloService(EquusDbContext context)
        {
            _context = context;
        }

        // Implementação 1: Cadastrar
        public async Task<Cavalo> Cadastrar(CriarCavaloDto dto)
        {
            var novoCavalo = new Cavalo(
                dto.Nome,
                dto.Raca,
                dto.DataNascimento,
                dto.Pelagem,
                dto.Genero
            );

            _context.Cavalos.Add(novoCavalo);
            await _context.SaveChangesAsync();

            return novoCavalo;
        }

        // --- A PARTE QUE ESTAVA FALTANDO ---
        // Implementação 2: ObterTodos
        public async Task<IEnumerable<Cavalo>> ObterTodos()
        {
            // Vai no banco, pega tudo e transforma em Lista
            return await _context.Cavalos.AsNoTracking().ToListAsync();
        }

        public async Task<Cavalo?> ObterPorId(int id)
        {
            // O erro acontece aqui porque falta dizer a tabela
            return await _context.Cavalos.FindAsync(id);
        }

        public async Task<bool> Excluir(int id)
        {
            var cavalo = await _context.Cavalos.FindAsync(id);
            if (cavalo == null)
            {
                return false;
            }
            _context.Cavalos.Remove(cavalo);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Cavalo?> Atualizar(int id, CriarCavaloDto dto)
        {
            var cavaloExiste = await _context.Cavalos.FindAsync(id);
            if (cavaloExiste == null) return null;
            cavaloExiste.AtualizarDados(
                dto.Nome,
                dto.Raca,
                dto.DataNascimento,
                dto.Pelagem,
                dto.Genero
                );
            _context.Cavalos.Update(cavaloExiste);
            await _context.SaveChangesAsync();

            return cavaloExiste;
        }
    }
}