using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EquusManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EquusManager.Infrastructure.Persistence
{
   public class EquusDbContext : DbContext
    {
        public EquusDbContext(DbContextOptions<EquusDbContext> options) : base(options)
        {
        }

        // Aqui definimos as tabelas. "DbSet<Cavalo>" vira a tabela "Cavalos"
        public DbSet<Cavalo> Cavalos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Aqui configuramos detalhes da tabela, chave primária, etc.
            modelBuilder.Entity<Cavalo>()
                .HasKey(c => c.Id);

        }
    }
}
