﻿using EmpyrionNetAPITools;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmpyrionModWebHost.Models
{
    public class ChatContext : DbContext
    {
        public ChatContext(){}

        public ChatContext(DbContextOptions<ChatContext> options): base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var ewaDbPath = Path.Combine(EmpyrionConfiguration.SaveGameModPath, "EWA", "DB");
            Directory.CreateDirectory(ewaDbPath);
            optionsBuilder.UseSqlite($"Filename={ewaDbPath}/Chats.db");
        }

        public DbSet<Chat> Chats { get; set; }
    }

    public class Chat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string PlayerSteamId { get; set; }   // 'null' für "Systemchats"
        public string PlayerName { get; set; }   // Name des Spieler zum Zeitpunkt des Chateintrages
        public int FactionId { get; set; }
        public string FactionName { get; set; }  // Name der Fraction zum Zeitpunkt des Chateintrages
        public string Message { get; set; }
        public byte Type { get; set; }
    }
}
