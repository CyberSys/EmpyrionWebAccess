﻿using EmpyrionNetAPITools;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpyrionModWebHost.Models
{
    public class FactionContext : DbContext
    {
        public FactionContext(){}

        public FactionContext(DbContextOptions<FactionContext> options): base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var ewaDbPath = Path.Combine(EmpyrionConfiguration.SaveGameModPath, "EWA", "DB");
            Directory.CreateDirectory(ewaDbPath);
            optionsBuilder.UseSqlite($"Filename={ewaDbPath}/Factions.db");
        }

        public DbSet<Faction> Factions { get; set; }
    }

    public class Faction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int FactionId { get; set; }
        public byte Origin { get; set; }
        public string Name { get; set; }
        public string Abbrev { get; set; }
    }
}
