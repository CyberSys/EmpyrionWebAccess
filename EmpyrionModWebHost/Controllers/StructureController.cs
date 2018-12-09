﻿using Eleon.Modding;
using EmpyrionModWebHost.Extensions;
using EmpyrionModWebHost.Models;
using EmpyrionNetAPIAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace EmpyrionModWebHost.Controllers
{

    public class StructureManager : EmpyrionModBase, IEWAPlugin
    {

        public ModGameAPI GameAPI { get; private set; }

        public override void Initialize(ModGameAPI dediAPI)
        {
            GameAPI = dediAPI;
        }

        public GlobalStructureList GlobalStructureList()
        {
            return TaskWait.For(10, Request_GlobalStructure_List()).Result;
        }

    }

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class StructureController : ControllerBase
    {
        public StructureManager StructureManager { get; }

        public StructureController()
        {
            StructureManager = Program.GetManager<StructureManager>();
        }

        [HttpGet("GlobalStructureList")]
        public IActionResult GlobalStructureList()
        {
            return Ok(StructureManager.GlobalStructureList());
        }

    }
}