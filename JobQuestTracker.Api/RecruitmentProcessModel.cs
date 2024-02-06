namespace JobQuestTracker.Api
{
    public record RecruitmentProcessModel(int Id, string Position, string CompanyName, string CompanyLocation, string ContactPerson, 
        ContractType ContractType, int Rate, WorkOfficeType WorkOfficeType, RecruitmentProcessStatus Status)
    {
        public IList<RecruitmentEventModel> Events { get; set; } = new List<RecruitmentEventModel>();
    }

    public record RecruitmentProcessAddModel(string Position, string CompanyName, string CompanyLocation, string ContactPerson, int Rate)
    {

    }
    public record RecruitmentProcessUpdateModel(string Position, string CompanyName, string CompanyLocation, string ContactPerson, int Rate)
    {
    }


    public record RecruitmentEventModel(int Id, int RecruitmentProcessId, RecruitmentEventType RecruitmentEvent, string MeetingHost, string Notes)
    {
        

    }

    public enum RecruitmentEventType
    {
        SubmitApplicationViaCompanySystem,
        SubmitApplicationViaLinkedIn,
        SendCVToRecruiterViaLinkedIn,
        SendCVToRecruiterViaMail,
        CallWithRecruiter,
        TechInterview,
        SoftSkillInterview,
        SendTaskToDo,
        SubmitTaskToDo,
        GetOffert,
        RejectOffer,
        AcceptOffer
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
        Hybrid,
        Remote
    }
}