using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Azure.Storage.Blobs;
using EFCore.BulkExtensions;
using ExcelDataReader;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Net;

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataImportController : ControllerBase
    {
        private CompanyContext _companyContext;
        public DataImportController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        [Route("ImportEmployees")]
        [HttpPost]
        public string ImportEmployees([FromForm] FileModel file)
        {
            try
            {
                #region Variable Declaration
                string message = "";
                DataSet dsexcelRecords = new DataSet();
                IExcelDataReader reader = null;
                Stream FileStream = null;
                #endregion

                #region Save Student Detail From Excel

                if (file != null && !string.IsNullOrEmpty(file.File.FileName))
                {

                    FileStream = file.File.OpenReadStream();

                    if (file != null && FileStream != null)
                    {
                        if (file.File.FileName.EndsWith(".xls"))
                            reader = ExcelReaderFactory.CreateBinaryReader(FileStream);
                        else if (file.File.FileName.EndsWith(".xlsx"))
                            reader = ExcelReaderFactory.CreateOpenXmlReader(FileStream);
                        else
                            message = "The file format is not supported.";

                        dsexcelRecords = reader.AsDataSet();
                        reader?.Close();

                        if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                        {
                            DataTable dtEmployeeRecords = dsexcelRecords.Tables[0];
                            DataRow rowToromove = dtEmployeeRecords.Rows[0];
                            dtEmployeeRecords.Rows.Remove(rowToromove);
                            foreach (DataRow row in dtEmployeeRecords.Rows)
                            {
                                Employee employee = new Employee();
                                employee.company_identifier = row[0].ToString();
                                employee.emp_role = row[1].ToString();
                                employee.emp_group = row[2].ToString();
                                employee.emp_designation = row[3].ToString();
                                employee.emp_first_name = row[4].ToString();
                                employee.emp_last_name = row[5].ToString();
                                employee.emp_email = row[6].ToString();
                                employee.emp_office_phone = row[7].ToString();
                                employee.emp_mobile_number = row[8].ToString();
                                employee.emp_dob = row[9] != null ? Convert.ToDateTime(row[9]) : DateTime.MinValue;
                                employee.emp_joining_date = row[9] != null ? Convert.ToDateTime(row[9]) : DateTime.MinValue;
                                employee.emp_relieving_date = row[9] != null ? Convert.ToDateTime(row[9]) : DateTime.MaxValue;
                                employee.associated_assets = row[12].ToString();
                                employee.emp_approval_overdue = row[9] != null ? Convert.ToDateTime(row[9]) : DateTime.MaxValue;
                                employee.created_date = DateTime.UtcNow;
                                employee.created_by = "Application";
                                employee.is_active = true;
                                _companyContext.Employees.Add(employee);

                                if (!string.IsNullOrEmpty(employee.emp_role))
                                {
                                    string[] roles = employee.emp_role.Split(',');
                                    foreach (var role in roles)
                                    {
                                        _companyContext.EmployeeToRoles.Add(new EmployeeToRole
                                        {
                                            id = 0,
                                            company_identifier = employee.company_identifier,
                                            employee_identifier = employee.employee_identifier.ToString(),
                                            role_identifier = role.ToString(),
                                            is_active = true,
                                            created_date = DateTime.UtcNow,
                                            created_by = "Application"
                                        });
                                        var associatedRolesAssets = _companyContext.AssetToRoles.Where(s => s.role_identifier == role && s.company_identifier == employee.company_identifier && s.is_active == true).ToList()
                                        .Select(x => x.asset_identifier);
                                        employee.associated_assets = (!string.IsNullOrEmpty(employee.associated_assets)) ?
                                            employee.associated_assets + "," + String.Join(",", associatedRolesAssets) : String.Join(",", associatedRolesAssets);
                                    }
                                }
                                if (!string.IsNullOrEmpty(employee.emp_group))
                                {
                                    string[] groups = employee.emp_group.Split(',');
                                    foreach (var group in groups)
                                    {
                                        _companyContext.EmployeeToGroups.Add(new EmployeeToGroup
                                        {
                                            id = 0,
                                            company_identifier = employee.company_identifier,
                                            employee_identifier = employee.employee_identifier.ToString(),
                                            group_identifier = group.ToString(),
                                            is_active = true,
                                            created_date = DateTime.UtcNow,
                                            created_by = "Application"
                                        });
                                    }
                                }

                                if (!string.IsNullOrEmpty(employee.associated_assets))
                                {
                                    string[] assets = employee.associated_assets.Split(',');
                                    foreach (var asset in assets.Distinct())
                                    {
                                        _companyContext.AssetToEmployees.Add(new AssetToEmployee
                                        {
                                            id = 0,
                                            company_identifier = employee.company_identifier,
                                            asset_identifier = asset.ToString(),
                                            employee_identifier = employee.employee_identifier.ToString(),
                                            is_active = true,
                                            created_date = DateTime.UtcNow,
                                            created_by = "Application"
                                        });
                                    }
                                }                            
                            }
                            //_companyContext.BulkInsert(employees, options =>
                            //{
                            //    options.BatchSize = 100;
                            //});

                            int output = _companyContext.SaveChanges();
                            if (output > 0)
                                message = "The Excel file has been successfully uploaded.";
                            else
                                message = "Something Went Wrong!, The Excel file uploaded has fiald.";
                        }
                        else
                            message = "Selected file is empty.";
                    }
                    else
                        message = "Invalid File.";
                }

                return message;
                #endregion
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
