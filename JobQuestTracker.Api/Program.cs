using JobQuestTracker.Api;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Xml.Linq;

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
if (frontendUrl == null)
{
    throw new Exception("Frontend Url is not set");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder =>
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();
app.UseCors("CorsPolicy");

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
        Events = new List<RecruitmentEventModel>()
        {
            new(1, 1, RecruitmentEventType.SubmitApplicationViaLinkedIn, "-", "Sent my Application"),
            new(2, 1, RecruitmentEventType.CallWithRecruiter, "Adam Bodnar",   "All was nice - I liked it"),
            new(3, 1, RecruitmentEventType.TechInterview, "Elon Musk", "Tech interview - went really nice"),
            new(4, 1, RecruitmentEventType.SoftSkillInterview, "Bill gates", "CEO interview - very nice")
        }
    },
    new(2, ".NET dev", "Good Designs", "London", "Amul Recruting", ContractType.B2B, 180, WorkOfficeType.Remote, RecruitmentProcessStatus.Initiated),
    new(3, "Senior Developer" ,"Ninjas .NET", "Berlin", "Herring Muller", ContractType.B2B, 200, WorkOfficeType.Remote, RecruitmentProcessStatus.FoundBetterMatch),
    new(4, "Specialist", "Swedish Devs", "Stockholm", "Mikkel Nikke", ContractType.B2B, 180, WorkOfficeType.Onsite, RecruitmentProcessStatus.Cancelled),
    new(5, "Team lead", "Allegro", "Warsaw", "Anna Dymna", ContractType.EmploymentContract, 21000, WorkOfficeType.Hybrid, RecruitmentProcessStatus.IResigned),
    new(6, "Sap Consultant","SAP consultants", "Hans Zimernam", "Katowice", ContractType.EmploymentContract, 19000, WorkOfficeType.Remote, RecruitmentProcessStatus.SucceededButIResign)
};

app.MapGet("/recruitmentProcesses", () =>
{
    return recruitments;
})
.WithName("GetRecruitmentProcesses").WithOpenApi();

app.MapPost("/recruitmentProcesses", (RecruitmentProcessAddModel model) =>
{
if (model.CompanyName == "")
{
    return Results.BadRequest();
}

    var newId = recruitments.Max(x => x.Id) + 1;
    var newProcess = new RecruitmentProcessModel(
        newId,
        model.Position,
        model.CompanyName,
        model.CompanyLocation,
        model.ContactPerson,
        ContractType.B2B,
        model.Rate,
        WorkOfficeType.Onsite,
        RecruitmentProcessStatus.Initiated);
    
    recruitments.Add(newProcess);


    return Results.Ok(newProcess);

});

//Edit
app.MapPut("/recruitmentProcesses/{processID}", (RecruitmentProcessUpdateModel model, [FromRoute] int processID) =>
{
    var index = recruitments.FindIndex(x => x.Id == processID);
    if (index < 0)
    {
        return Results.NotFound();
    }
    var process = recruitments[index];
    var newProcess = process with { 
        Position = model.Position,  
        CompanyName = model.CompanyName,
        CompanyLocation = model.CompanyLocation,
        ContactPerson = model.ContactPerson,
        Rate = model.Rate,
    };
    recruitments[index] = newProcess;

    return Results.Ok(newProcess);

});

app.MapDelete("/recruitmentProcesses/{processID}", ([FromRoute] int processID) =>
{
    if (processID == 0)
    {
        return Results.BadRequest();
    }
    var recruitmentToRemove = recruitments.FirstOrDefault(x => x.Id == processID);
    if(recruitmentToRemove == null)
    {
        return Results.BadRequest();
    }
    recruitments.Remove(recruitmentToRemove);

    return Results.Ok(processID);

});

app.MapGet("/metadata/ContractTypes", () =>
{
    return Enum.GetValues<ContractType>().Select(x => new { id = (int)x, label = x, value = x }).ToArray();

});
app.MapGet("/metadata/RecruitmentEventTypes", () =>
{
    return Enum.GetValues<RecruitmentEventType>().Select(x => new { id = (int)x, label = x, value = x }).ToArray();

});
app.MapGet("/metadata/RecruitmentProcessStatuses", () =>
{
    return Enum.GetValues<RecruitmentProcessStatus>().Select(x => new { id = (int)x, label = x, value = x }).ToArray();

});
app.MapGet("/metadata/WorkOfficeTypes", () =>
{
    return Enum.GetValues<WorkOfficeType>().Select(x => new { id = (int)x, label = x, value = x }).ToArray();

});



app.Run();


