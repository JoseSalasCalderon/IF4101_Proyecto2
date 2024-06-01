using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Conexión a BD
//builder.Services.AddDbContext<Tarea4Context>(options =>
//{
//    // Usar la cadena de conexión desde la configuración
//    //var connectionString = "Data Source=DESKTOP-FEUS1TM;User Id=sa;Password=sa123456;Initial Catalog=Tarea4_Lenguajes;TrustServerCertificate=true;";
//    var connectionString = "Data Source=(local);User Id=sa;Password=12345;Initial Catalog=Tarea4_Lenguajes;TrustServerCertificate=true;";
//    options.UseSqlServer(connectionString);
//    // Otros ajustes del contexto de base de datos pueden ser configurados aquí, si es necesario
//});



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
