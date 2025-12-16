using EquusManager.Application.DTOs;
using EquusManager.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi;

namespace EquusManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CavalosController : ControllerBase
    {
        private readonly ICavaloService _service;

        public CavalosController(ICavaloService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] CriarCavaloDto dto)
        {
            var cavaloCriado = await _service.Cadastrar(dto);
            return CreatedAtAction(nameof(Cadastrar), new { id = cavaloCriado.Id }, cavaloCriado);
        }

        [HttpGet]
        public async Task<IActionResult> ListarTodos()
        {
            var cavalos = await _service.ObterTodos();
            return Ok(cavalos);
        }

        // --- CORREÇÃO 1: Aqui deve ser GET (Buscar), não DELETE ---
        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var cavalo = await _service.ObterPorId(id);

            if (cavalo == null)
            {
                return NotFound($"Não encontrei nenhum cavalo com o ID {id}");
            }

            return Ok(cavalo);
        }

        // --- CORREÇÃO 2: Aqui deve ser DELETE (Excluir), não GET ---
        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var sucesso = await _service.Excluir(id);

            if (!sucesso)
            {
                return NotFound("Cavalo não encontrado para exclusão.");
            }
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] CriarCavaloDto dto)
        {
            var cavaloAtualizado = await _service.Atualizar(id, dto);
           
            if (cavaloAtualizado == null)
            {
                return NotFound($"Não encontrei nenhum cavalo com o ID {id}");

            }

            return Ok(cavaloAtualizado);
        }
    }
}