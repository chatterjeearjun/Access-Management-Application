namespace AccessMgmtBackend.Models
{
    public class DashboardView
    {
        public int TotalEmployees { get; set; }
        public string MonthlyEmployeeCountChanges { get; set; }
        public int TotalAssets { get; set; }
        public string MonthlyAssetCountChanges { get; set; }
        public int TotalApprovals { get; set; }
        public int ApprovedApprovals { get; set; }
        public int PendingApprovals { get; set; }
        public int ApprovedEmployees { get; set; }
        public int OverdueEmployees { get; set; }
        public int ExpiredEmployees { get; set; }
        public int ExpiredAssets { get; set; }
        public IEnumerable<Employee> TopPendingEmployees { get; set; }
        public int MonthlyEmployeeAdded { get; set; }
        public int YearlyEmployeeAdded { get; set; }
        public int PendingEmployees { get; set; }
        public int RejectedEmployees { get; set; }
        public int ApprovedEmployeePercentage { get; set; }
        public int AuditCompletedPercentage { get; set; }
        public int TicketClosurePercentage { get; set; }

    }
}
