using System;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
   public DbSet<Domain.Activity> Activities { get; set; }
}
