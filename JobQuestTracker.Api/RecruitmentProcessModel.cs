namespace JobQuestTracker.Api
{
    public record RecruitmentProcessModel(int Id, string CompanyName, string CompanyLocation, string ContactPerson, 
        ContractType ContractType, int Rate, WorkOfficeType WorkOfficeType, RecruitmentProcessStatus Status)
    {

    }
    public enum ContractType
    {
        B2B,
        EmploymentContract
    }

    public enum RecruitmentProcessStatus
    {
        Initiated,
        InProgress,
        IResigned,
        Succeeded,
        SucceededButIResign,
        Cancelled,
        FoundBetterMatch
    }

    public enum WorkOfficeType
    {
        Onsite,
        Hubrid,
        Remote
    }
}