﻿// <auto-generated />
using EmpyrionModWebHost.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EmpyrionModWebHost.Migrations
{
    [DbContext(typeof(PlayerContext))]
    [Migration("20181119184150_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024");

            modelBuilder.Entity("EmpyrionModWebHost.Models.Player", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("bodyTemp");

                    b.Property<float>("bodyTempMax");

                    b.Property<int>("clientId");

                    b.Property<double>("credits");

                    b.Property<int>("died");

                    b.Property<int>("entityId");

                    b.Property<int>("exp");

                    b.Property<byte>("factionGroup");

                    b.Property<int>("factionId");

                    b.Property<byte>("factionRole");

                    b.Property<float>("food");

                    b.Property<float>("foodMax");

                    b.Property<float>("health");

                    b.Property<float>("healthMax");

                    b.Property<int>("kills");

                    b.Property<byte>("origin");

                    b.Property<float>("oxygen");

                    b.Property<float>("oxygenMax");

                    b.Property<int>("permission");

                    b.Property<int>("ping");

                    b.Property<string>("playerName");

                    b.Property<string>("playfield");

                    b.Property<float>("posX");

                    b.Property<float>("posY");

                    b.Property<float>("posZ");

                    b.Property<float>("radiation");

                    b.Property<float>("radiationMax");

                    b.Property<float>("rotX");

                    b.Property<float>("rotY");

                    b.Property<float>("rotZ");

                    b.Property<float>("stamina");

                    b.Property<float>("staminaMax");

                    b.Property<string>("startPlayfield");

                    b.Property<string>("steamId");

                    b.Property<string>("steamOwnerId");

                    b.Property<int>("upgrade");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });
#pragma warning restore 612, 618
        }
    }
}
