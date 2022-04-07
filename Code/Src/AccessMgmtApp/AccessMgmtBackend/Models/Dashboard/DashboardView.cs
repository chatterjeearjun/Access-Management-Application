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


    }
}
