using EquusManager.Application.DTOs;
using EquusManager.Domain.Entities;

// 1. O Endereço correto (Namespace)
namespace EquusManager.Application.Interfaces
{
    // 2. O acesso PUBLICO (sem isso, ninguém de fora vê)
    public interface ICavaloService
    {
        Task<Cavalo> Cadastrar(CriarCavaloDto dto);
        Task<IEnumerable<Cavalo>> ObterTodos();
        Task<Cavalo?> ObterPorId(int id);
        Task<bool> Excluir(int id);
        Task<Cavalo?> Atualizar(int id, CriarCavaloDto dto);


    }

}