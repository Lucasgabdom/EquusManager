using EquusManager.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using EquusManager.Application.Interfaces;
using EquusManager.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


// --- 1. Configuração do Banco ---
var connectionString = builder.Configuration.GetConnectionString("EquusCs");

builder.Services.AddDbContext<EquusDbContext>(options =>
    options.UseNpgsql(connectionString));

// --- 2. Injeção de Dependência (O Elo Perdido) ---
// A Lógica: "Quando alguém pedir ICavaloService, entregue uma instância nova de CavaloService"
// AddScoped significa: Crie um serviço novo para cada requisição HTTP (economiza memória).
builder.Services.AddScoped<ICavaloService, CavaloService>();


// --- 3. Configurações da API ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- 4. Pipeline de Execução ---
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();