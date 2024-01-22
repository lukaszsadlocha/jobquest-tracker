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

var frontendUrl = builder.Configuration.GetValue<string>("FrontendUrl");
if(frontendUrl == null)
{
    throw new Exception("Frontend Url is not set");
}

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins(frontendUrl!);
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
    new(1, "Tech lead", "Smart Solutions", "Kraków", "Adam Bodnar",  ContractType.B2B, 150, WorkOfficeType.Onsite, RecruitmentProcessStatus.Initiated)
    {
        Meetings = new List<MeetingModel>()
        {
            new(1, 1, "Adam Bodnar", "All was nice - I liked it"),
            new(2, 1, "Elon Musk", "Tech interview - went really nice"),
            new(3, 1, "Bill gates", "CEO interview - very nice")
        }
    },
    new(2, ".NET dev", "Good Designs", "London", "Amul Recruting", ContractType.B2B, 180, WorkOfficeType.Remote, RecruitmentProcessStatus.Initiated),
    new(3, "Senior Developer" ,"Ninjas .NET", "Berlin", "Herring Muller", ContractType.B2B, 200, WorkOfficeType.Remote, RecruitmentProcessStatus.FoundBetterMatch),
    new(4, "Specialist", "Swedish Devs", "Stockholm", "Mikkel Nikke", ContractType.B2B, 180, WorkOfficeType.Onsite, RecruitmentProcessStatus.Cancelled),
    new(5, "Team lead", "Allegro", "Warsaw", "Anna Dymna", ContractType.EmploymentContract, 21000, WorkOfficeType.Hubrid, RecruitmentProcessStatus.IResigned),
    new(6, "Sap Consultant","SAP consultants", "Hans Zimernam", "Katowice", ContractType.EmploymentContract, 19000, WorkOfficeType.Remote, RecruitmentProcessStatus.SucceededButIResign)
};

app.MapGet("/recruitmentProcesses", () =>
{
    return recruitments;
})
.WithName("GetRecruitmentProcesses")
.WithOpenApi();

app.Run();


