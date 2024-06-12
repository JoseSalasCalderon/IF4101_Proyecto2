using Microsoft.EntityFrameworkCore;
using Proyecto2.BW.CU;
using Proyecto2.BW.Interfaces.BW;
using Proyecto2.BW.Interfaces.DA;
using Proyecto2.BW.Interfaces.SG;
using Proyecto2.DA.Acciones;
using Proyecto2.DA.Contexto;
using Proyecto2.SG;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

//Inyección de Dependencias
builder.Services.AddTransient<IGestionarUsuarioBW, GestionarUsuarioBW>();
builder.Services.AddTransient<IGestionarUsuarioDA, GestionarUsuarioDA>();
builder.Services.AddTransient<IGestionarCompraBW, GestionarCompraBW>();
builder.Services.AddTransient<IGestionarCompraDA, GestionarCompraDA>();
builder.Services.AddTransient<IGestionarDatosCuponBW, GestionarDatosCuponBW>();
builder.Services.AddTransient<IGestionarDatosCuponDA, GestionarDatosCuponDA>();
builder.Services.AddTransient<IGestionarCuponBW, GestionarCuponBW>();
builder.Services.AddTransient<IGestionarCuponSG, GestionarCuponSG>();
builder.Services.AddTransient<IGestionarCategoriaBW, GestionarCategoriaBW>();
builder.Services.AddTransient<IGestionarCategoriaSG, GestionarCategoriaSG>();

//Conexión a BD
builder.Services.AddDbContext<Proyecto2Context>(options =>
{
    // Usar la cadena de conexión desde la configuración
    var connectionString = "Data Source=DESKTOP-FEUS1TM;User Id=sa;Password=sa123456;Initial Catalog=Proyecto2Lenguajes;TrustServerCertificate=true;";
    //var connectionString = "Data Source=(local);User Id=sa;Password=12345;Initial Catalog=Proyecto2Lenguajes;TrustServerCertificate=true;";
    options.UseSqlServer(connectionString);
    // Otros ajustes del contexto de base de datos pueden ser configurados aquí, si es necesario
});



var app = builder.Build();

app.UseCors("AllowOrigin");
app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
