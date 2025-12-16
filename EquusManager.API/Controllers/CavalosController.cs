using EquusManager.Application.DTOs;
using EquusManager.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

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

        // 1. O POST (Que já está funcionando)
        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] CriarCavaloDto dto)
        {
            var cavaloCriado = await _service.Cadastrar(dto);
            return CreatedAtAction(nameof(Cadastrar), new { id = cavaloCriado.Id }, cavaloCriado);
        }

        // 2. O GET (Que estava faltando)
        [HttpGet]
        public async Task<IActionResult> ListarTodos()
        {
            var cavalos = await _service.ObterTodos();
            return Ok(cavalos);
        }
    }
}