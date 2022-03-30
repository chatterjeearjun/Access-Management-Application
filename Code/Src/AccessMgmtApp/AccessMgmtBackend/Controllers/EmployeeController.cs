using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class EmployeeController : ControllerBase
    {
        private CompanyContext _companyContext;

        public EmployeeController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        /// <summary>
        /// GET: api/<EmployeeController>
        /// </summary>
        /// <param name="companyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<Employee> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                var listEmployees = _companyContext.Employees.Where(x => x.company_identifier == companyId).ToList();
                foreach (var employee in listEmployees)
                {
                    employee.emp_profile_picture = !string.IsNullOrEmpty(employee.emp_profile_picture) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_profile_picture)?.blob_file_name : String.Empty;
                    employee.emp_nda_document1 = !string.IsNullOrEmpty(employee.emp_nda_document1) ? _companyContext.UploadedFiles.FirstOrDefault
                           (s => s.file_identifier.ToString() == employee.emp_nda_document1)?.blob_file_name : String.Empty;
                    employee.emp_nda_document2 = !string.IsNullOrEmpty(employee.emp_nda_document2) ? _companyContext.UploadedFiles.FirstOrDefault
                           (s => s.file_identifier.ToString() == employee.emp_nda_document2)?.blob_file_name : String.Empty;
                    employee.emp_bc_document1 = !string.IsNullOrEmpty(employee.emp_bc_document1) ? _companyContext.UploadedFiles.FirstOrDefault
                           (s => s.file_identifier.ToString() == employee.emp_bc_document1)?.blob_file_name : String.Empty;
                    employee.emp_bc_document2 = !string.IsNullOrEmpty(employee.emp_bc_document2) ? _companyContext.UploadedFiles.FirstOrDefault
                           (s => s.file_identifier.ToString() == employee.emp_bc_document2)?.blob_file_name : String.Empty;
                    employee.emp_cert_document1 = !string.IsNullOrEmpty(employee.emp_cert_document1) ? _companyContext.UploadedFiles.FirstOrDefault
                           (s => s.file_identifier.ToString() == employee.emp_cert_document1)?.blob_file_name : String.Empty;
                    employee.emp_cert_document2 = !string.IsNullOrEmpty(employee.emp_cert_document2) ? _companyContext.UploadedFiles.FirstOrDefault
                           (s => s.file_identifier.ToString() == employee.emp_cert_document2)?.blob_file_name : String.Empty;
                    employee.emp_role = String.Join(",",
                        _companyContext.EmployeeToRoles.Where
                        (x => x.company_identifier == companyId && x.employee_identifier == employee.employee_identifier.ToString()).
                        Select(x => x.role_identifier));
                    employee.emp_group = String.Join(",",
                       _companyContext.EmployeeToGroups.Where
                       (x => x.company_identifier == companyId && x.employee_identifier == employee.employee_identifier.ToString()).
                       Select(x => x.group_identifier));
                    var list = new List<KeyValuePair<string, string>>();
                    var assetToEmployees = _companyContext.AssetToEmployees.Where
                             (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString()).ToList();
                    foreach (var assetDetail in assetToEmployees)
                    {
                        var assetName = _companyContext.Assets.FirstOrDefault
                                 (x => x.company_identifier == employee.company_identifier && x.asset_identifier.ToString() == assetDetail.asset_identifier.ToString())
                                 ?.asset_name;

                        if (!string.IsNullOrEmpty(assetName)) list.Add(new KeyValuePair<string, string>(assetName, assetDetail.asset_identifier));
                    }
                    employee.associated_assets = JsonConvert.SerializeObject(list);
                }
                return listEmployees;
            }
            else
            {
                return null;
            }

        }

        // GET api/<EmployeeController>/5
        [HttpGet("{guid}")]
        public Employee Get(string guid)
        {
            var employee = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == new Guid(guid));
            if (employee != null)
            {
                employee.emp_profile_picture = !string.IsNullOrEmpty(employee.emp_profile_picture) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_profile_picture)?.blob_file_name : String.Empty;
                employee.emp_nda_document1 = !string.IsNullOrEmpty(employee.emp_nda_document1) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_nda_document1)?.blob_file_name : String.Empty;
                employee.emp_nda_document2 = !string.IsNullOrEmpty(employee.emp_nda_document2) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_nda_document2)?.blob_file_name : String.Empty;
                employee.emp_bc_document1 = !string.IsNullOrEmpty(employee.emp_bc_document1) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_bc_document1)?.blob_file_name : String.Empty;
                employee.emp_bc_document2 = !string.IsNullOrEmpty(employee.emp_bc_document2) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_bc_document2)?.blob_file_name : String.Empty;
                employee.emp_cert_document1 = !string.IsNullOrEmpty(employee.emp_cert_document1) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_cert_document1)?.blob_file_name : String.Empty;
                employee.emp_cert_document2 = !string.IsNullOrEmpty(employee.emp_cert_document2) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_cert_document2)?.blob_file_name : String.Empty;
                employee.emp_role = String.Join(",",
                 _companyContext.EmployeeToRoles.Where(x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString()).
                 Select(x => x.role_identifier));
                employee.emp_group = String.Join(",",
                       _companyContext.EmployeeToGroups.Where
                       (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString()).
                       Select(x => x.group_identifier));

                var list = new List<KeyValuePair<string, string>>();
                var assetToEmployees = _companyContext.AssetToEmployees.Where
                         (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString()).ToList();
                foreach (var assetDetail in assetToEmployees)
                {
                    var assetName = _companyContext.Assets.FirstOrDefault
                             (x => x.company_identifier == employee.company_identifier && x.asset_identifier.ToString() == assetDetail.asset_identifier.ToString())
                             ?.asset_name;

                   if(!string.IsNullOrEmpty(assetName)) list.Add(new KeyValuePair<string, string>(assetName, assetDetail.asset_identifier));
                }
                employee.associated_assets = JsonConvert.SerializeObject(list);
            }
            return employee;
        }
        private async Task<UploadedFile> PostUploadFile(IFormFile document, string companyId)
        {
            UploadedFile employeeResponse = new UploadedFile();
            GenericAPICalls request = new GenericAPICalls();
            var file = new FileModel
            {
                File = document,
                upload_category = "Employee",
                company_identifier = companyId,
                user_identifier = ""
            };
            var response = request.FileUploadPostEndpoint("api/FileUpload/UploadDocument", file);
            if (response.Result.IsSuccessStatusCode)
            {
                employeeResponse = await response.Result.Content.ReadAsAsync<UploadedFile>();
            }
            return employeeResponse;
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<Employee> Post([FromForm] CreateEmployee value)
        {
            var employee = new Employee();
            employee.created_date = DateTime.UtcNow;
            employee.created_by = "Application";
            employee.is_active = true;
            if (value.emp_profile_picture != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_profile_picture, value.company_identifier);
                employee.emp_profile_picture = employeeResponse?.file_identifier.ToString();
            }
            if (value.emp_nda_document1 != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_nda_document1, value.company_identifier);
                employee.emp_nda_document1 = employeeResponse?.file_identifier.ToString();
            }
            if (value.emp_nda_document2 != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_nda_document2, value.company_identifier);
                employee.emp_nda_document2 = employeeResponse?.file_identifier.ToString();
            }
            if (value.emp_bc_document1 != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_bc_document1, value.company_identifier);
                employee.emp_bc_document1 = employeeResponse?.file_identifier.ToString();
            }
            if (value.emp_bc_document2 != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_bc_document2, value.company_identifier);
                employee.emp_bc_document2 = employeeResponse?.file_identifier.ToString();
            }
            if (value.emp_cert_document1 != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_cert_document1, value.company_identifier);
                employee.emp_cert_document1 = employeeResponse?.file_identifier.ToString();
            }
            if (value.emp_cert_document2 != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_cert_document2, value.company_identifier);
                employee.emp_cert_document2 = employeeResponse?.file_identifier.ToString();
            }

            PropertyCopier<CreateEmployee, Employee>.Copy(value, employee);
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
                    var associatedRolesAssets = _companyContext.AssetToRoles.Where(s => s.role_identifier == role && s.company_identifier == employee.company_identifier).ToList()
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
            _companyContext.SaveChanges();
            return _companyContext.Employees.FirstOrDefault(s => s.emp_email == value.emp_email);

        }

        // PUT api/<EmployeeController>/5
        [HttpPut]
        public Employee Put([FromBody] UpdateEmployee value)
        {
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier);
            if (employeeStore != null)
            {
                var employeeNew = new Employee();
                employeeNew.id = employeeStore.id;
                employeeNew.created_by = employeeStore.created_by;
                employeeNew.created_date = employeeStore.created_date;
                employeeNew.modified_date = DateTime.UtcNow;
                employeeNew.modified_by = "Application";
                employeeNew.emp_profile_picture = employeeStore.emp_profile_picture;
                employeeNew.emp_nda_document1 = employeeStore.emp_nda_document1;
                employeeNew.emp_nda_document2 = employeeStore.emp_nda_document2;
                employeeNew.emp_bc_document1 = employeeStore.emp_bc_document1;
                employeeNew.emp_bc_document2 = employeeStore.emp_bc_document2;
                employeeNew.emp_cert_document1 = employeeStore.emp_cert_document1;
                employeeNew.emp_cert_document2 = employeeStore.emp_cert_document2;
                PropertyCopier<UpdateEmployee, Employee>.Copy(value, employeeNew);
                _companyContext.Entry<Employee>(employeeStore).CurrentValues.SetValues(employeeNew);
                //Added logic for asset addition/updation
                _companyContext.AssetToEmployees.RemoveRange(_companyContext.AssetToEmployees.Where
                    (x => x.company_identifier == employeeStore.company_identifier && x.employee_identifier == employeeStore.employee_identifier.ToString()));
                _companyContext.EmployeeToRoles.RemoveRange(_companyContext.EmployeeToRoles.Where
                    (x => x.company_identifier == employeeStore.company_identifier && x.employee_identifier == employeeStore.employee_identifier.ToString()));
                _companyContext.EmployeeToGroups.RemoveRange(_companyContext.EmployeeToGroups.Where
                   (x => x.company_identifier == employeeStore.company_identifier && x.employee_identifier == employeeStore.employee_identifier.ToString()));

                if (!string.IsNullOrEmpty(employeeNew.associated_assets))
                {
                    string[] assets = employeeNew.associated_assets.Split(',');
                    foreach (var asset in assets)
                    {
                        _companyContext.AssetToEmployees.Add(new AssetToEmployee
                        {
                            id = 0,
                            company_identifier = employeeNew.company_identifier,
                            asset_identifier = asset.ToString(),
                            employee_identifier = employeeNew.employee_identifier.ToString(),
                            is_active = true,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
                if (!string.IsNullOrEmpty(employeeNew.emp_role))
                {
                    string[] roles = employeeNew.emp_role.Split(',');
                    foreach (var role in roles)
                    {
                        _companyContext.EmployeeToRoles.Add(new EmployeeToRole
                        {
                            id = 0,
                            company_identifier = employeeNew.company_identifier,
                            role_identifier = role.ToString(),
                            employee_identifier = employeeNew.employee_identifier.ToString(),
                            is_active = true,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
                if (!string.IsNullOrEmpty(employeeNew.emp_group))
                {
                    string[] groups = employeeNew.emp_group.Split(',');
                    foreach (var group in groups)
                    {
                        _companyContext.EmployeeToGroups.Add(new EmployeeToGroup
                        {
                            id = 0,
                            company_identifier = employeeNew.company_identifier,
                            employee_identifier = employeeNew.employee_identifier.ToString(),
                            group_identifier = group.ToString(),
                            is_active = true,
                            created_date = DateTime.UtcNow,
                            created_by = "Application"
                        });
                    }
                }
                _companyContext.SaveChanges();
                return _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete]
        public IEnumerable<Employee> Delete([FromBody] DeleteEmployee value)
        {
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier);
            if (employeeStore != null)
            {
                _companyContext.Employees.Remove(employeeStore);
                _companyContext.EmployeeToRoles.RemoveRange(_companyContext.EmployeeToRoles.Where
                   (x => x.company_identifier == value.company_identifier && x.employee_identifier == value.employee_identifier.ToString()));
                _companyContext.AssetToEmployees.RemoveRange(_companyContext.AssetToEmployees.Where
                   (x => x.company_identifier == value.company_identifier && x.employee_identifier == value.employee_identifier.ToString()));
                _companyContext.EmployeeToGroups.RemoveRange(_companyContext.EmployeeToGroups.Where
                   (x => x.company_identifier == value.company_identifier && x.employee_identifier == value.employee_identifier.ToString()));
                _companyContext.SaveChanges();
                return _companyContext.Employees.Where(x => x.company_identifier == value.company_identifier).ToList();

            }
            else
            {
                return _companyContext.Employees.Where(x => x.company_identifier == value.company_identifier).ToList();
            }
        }
    }
}
