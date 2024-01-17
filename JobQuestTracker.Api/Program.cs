using JobQuestTracker.Api;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.Configure<Microsoft.AspNetCore.Mvc.JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        });
});

var app = builder.Build();
app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var recruitments = new List<RecruitmentProcessModel>()
{
    new(1, "Smart Solutions", "Kraków", "Adam Bodnar",  ContractType.B2B, 150, WorkOfficeType.Onsite, RecruitmentProcessStatus.Initiated),
    new(2, "Good Designs", "London", "Amul Recruting", ContractType.B2B, 180, WorkOfficeType.Remote, RecruitmentProcessStatus.Initiated),
    new(3, "Ninjas .NET", "Berlin", "Herring Muller", ContractType.B2B, 200, WorkOfficeType.Remote, RecruitmentProcessStatus.FoundBetterMatch),
    new(4, "Swedish Devs", "Stockholm", "Mikkel Nikke", ContractType.B2B, 180, WorkOfficeType.Onsite, RecruitmentProcessStatus.Cancelled),
    new(5, "Allegro", "Warsaw", "Anna Dymna", ContractType.EmploymentContract, 21000, WorkOfficeType.Hubrid, RecruitmentProcessStatus.IResigned),
    new(6, "SAP consultants", "Hans Zimernam", "Katowice", ContractType.EmploymentContract, 19000, WorkOfficeType.Remote, RecruitmentProcessStatus.SucceededButIResign)
};

app.MapGet("/recruitmentProcesses", () =>
{
    return recruitments;
})
.WithName("GetRecruitmentProcesses")
.WithOpenApi();

app.Run();


