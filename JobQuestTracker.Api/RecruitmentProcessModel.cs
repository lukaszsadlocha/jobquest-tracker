namespace JobQuestTracker.Api
{
    public record RecruitmentProcessModel(int Id, string Position, string CompanyName, string CompanyLocation, string ContactPerson, 
        ContractType ContractType, int Rate, WorkOfficeType WorkOfficeType, RecruitmentProcessStatus Status)
    {
        public IList<MeetingModel> Meetings { get; set; } = new List<MeetingModel>();
    }

    public record MeetingModel(int Id, int RecruitmentProcessId, string MeetingHost, string Notes)
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