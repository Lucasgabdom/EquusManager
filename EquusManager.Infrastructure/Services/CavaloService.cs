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
    }
}