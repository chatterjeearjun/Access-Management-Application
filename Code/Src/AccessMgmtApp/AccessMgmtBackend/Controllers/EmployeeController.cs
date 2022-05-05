using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Runtime.InteropServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(AuthenticationSchemes = "Bearer")]
    public class EmployeeController : ControllerBase
    {
        private CompanyContext _companyContext;
        private IConfiguration configuration;

        public EmployeeController(CompanyContext companyContext, IConfiguration iConfig)
        {
            _companyContext = companyContext;
            configuration = iConfig;
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
                var listEmployees = _companyContext.Employees.Where(x => x.company_identifier == companyId && x.is_active).ToList();
                var listEmployeeDocs = _companyContext.EmployeeToDocuments.Where(x => x.company_identifier == companyId && x.is_active).ToList();
                foreach (var employee in listEmployees)
                {
                    List<EmployeeDocument> documents = new List<EmployeeDocument>();
                    employee.emp_profile_picture = !string.IsNullOrEmpty(employee.emp_profile_picture) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_profile_picture)?.blob_file_name : String.Empty;
                    var employeeDoc = listEmployeeDocs.Where(x => x.employee_identifier == employee.employee_identifier.ToString()).ToList();
                    foreach (var docs in employeeDoc)
                    {
                        string path = _companyContext.UploadedFiles.FirstOrDefault(s => s.file_identifier.ToString() == docs.file_identifier)?.blob_file_name;
                        documents.Add(new EmployeeDocument
                        {
                            DocumentId = docs.document_identifier,
                            DocumentName = docs.document_name,
                            DocumentPath = path
                        });
                    }
                    employee.emp_documents = documents;
                    var listRoles = new List<KeyValuePair<string, string>>();
                    var employeesToRoles = _companyContext.EmployeeToRoles.Where
                             (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString() && x.is_active == true).ToList();
                    foreach (var roleDetail in employeesToRoles)
                    {
                        var roleName = _companyContext.CompanyRoles.FirstOrDefault
                                 (x => x.company_identifier == employee.company_identifier && x.role_identifier.ToString() == roleDetail.role_identifier.ToString())
                                 ?.role_name;

                        if (!string.IsNullOrEmpty(roleName)) listRoles.Add(new KeyValuePair<string, string>(roleName, roleDetail.role_identifier));
                    }
                    employee.emp_role = JsonConvert.SerializeObject(listRoles);

                    employee.emp_group = String.Join(",",
                       _companyContext.EmployeeToGroups.Where
                       (x => x.company_identifier == companyId && x.employee_identifier == employee.employee_identifier.ToString()).
                       Select(x => x.group_identifier));

                    var list = new List<KeyValuePair<string, string>>();
                    var assetToEmployees = _companyContext.AssetToEmployees.Where
                             (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString() && x.is_active == true).ToList();
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
                List<EmployeeDocument> documents = new List<EmployeeDocument>();
                var listEmployeeDocs = _companyContext.EmployeeToDocuments.Where(x => x.company_identifier == employee.company_identifier && x.is_active).ToList();
                employee.emp_profile_picture = !string.IsNullOrEmpty(employee.emp_profile_picture) ? _companyContext.UploadedFiles.FirstOrDefault
                       (s => s.file_identifier.ToString() == employee.emp_profile_picture)?.blob_file_name : String.Empty;
                var employeeDoc = listEmployeeDocs.Where(x => x.employee_identifier == employee.employee_identifier.ToString()).ToList();
                foreach (var docs in employeeDoc)
                {
                    string path = _companyContext.UploadedFiles.FirstOrDefault(s => s.file_identifier.ToString() == docs.file_identifier)?.blob_file_name;
                    documents.Add(new EmployeeDocument
                    {
                        DocumentId = docs.document_identifier,
                        DocumentName = docs.document_name,
                        DocumentPath = path
                    });
                }
                employee.emp_documents = documents;
                var listRoles = new List<KeyValuePair<string, string>>();
                var employeesToRoles = _companyContext.EmployeeToRoles.Where
                         (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString() && x.is_active == true).ToList();
                foreach (var roleDetail in employeesToRoles)
                {
                    var roleName = _companyContext.CompanyRoles.FirstOrDefault
                             (x => x.company_identifier == employee.company_identifier && x.role_identifier.ToString() == roleDetail.role_identifier.ToString())
                             ?.role_name;

                    if (!string.IsNullOrEmpty(roleName)) listRoles.Add(new KeyValuePair<string, string>(roleName, roleDetail.role_identifier));
                }
                employee.emp_role = JsonConvert.SerializeObject(listRoles);

                employee.emp_group = String.Join(",",
                       _companyContext.EmployeeToGroups.Where
                       (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString() && x.is_active == true).
                       Select(x => x.group_identifier));

                var list = new List<KeyValuePair<string, string>>();
                var assetToEmployees = _companyContext.AssetToEmployees.Where
                         (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString() && x.is_active == true).ToList();
                foreach (var assetDetail in assetToEmployees)
                {
                    var assetName = _companyContext.Assets.FirstOrDefault
                             (x => x.company_identifier == employee.company_identifier && x.asset_identifier.ToString() == assetDetail.asset_identifier.ToString())
                             ?.asset_name;

                    if (!string.IsNullOrEmpty(assetName)) list.Add(new KeyValuePair<string, string>(assetName, assetDetail.asset_identifier));
                }
                employee.associated_assets = JsonConvert.SerializeObject(list);
            }
            return employee;
        }
        private async Task<UploadedFile> PostUploadFile(IFormFile document, string companyId, [Optional] string userIdentifier)
        {
            UploadedFile employeeResponse = new UploadedFile();
            GenericAPICalls request = new GenericAPICalls(configuration);
            var file = new FileModel
            {
                File = document,
                upload_category = "Employee",
                company_identifier = companyId,
                user_identifier = !string.IsNullOrEmpty(userIdentifier)?userIdentifier:"NA"
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
            var docList = new List<EmployeeDocument>();
            employee.created_date = DateTime.UtcNow;
            employee.created_by = "Application";
            employee.is_active = true;
            employee.is_approved = false;
            employee.is_rejected = false;
            if (value.emp_profile_picture != null)
            {
                UploadedFile employeeResponse = await PostUploadFile(value.emp_profile_picture, value.company_identifier);
                employee.emp_profile_picture = employeeResponse?.file_identifier.ToString();
            }
            if (value.emp_documents != null && value.emp_documents.Count > 0)
            {
                foreach (var document in value.emp_documents)
                {
                    UploadedFile employeeResponse = await PostUploadFile(document.DocumentDetail, value.company_identifier);
                    docList.Add(
                        new EmployeeDocument { DocumentId = document.DocumentId, DocumentName = document.DocumentName, DocumentPath = employeeResponse?.file_identifier.ToString() }
                        );
                    if (employeeResponse != null)
                    {
                        _companyContext.EmployeeToDocuments.Add(new EmployeeToDocument
                        {
                            company_identifier = value.company_identifier,
                            employee_identifier = employee.employee_identifier.ToString(),
                            document_identifier = document.DocumentId,
                            document_name = document.DocumentName,
                            file_identifier = employeeResponse.file_identifier.ToString(),
                            created_date = DateTime.UtcNow,
                            created_by = "Application",
                            is_active = true
                            
                        });
                    }
                }
            }
            employee.emp_documents = docList;
            if (value.emp_approval_overdue != null && value.emp_approval_overdue < DateTime.UtcNow)
            {
                employee.emp_approval_overdue = DateTime.UtcNow.AddDays(7);
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
            _companyContext.Tickets.Add(new Ticket
            {
                id=0,
                company_identifier= employee.company_identifier,
                ticket_subject = "New Employee Created - "+employee.emp_email,
                ticket_content = "Please approve the employee.",
                ticket_status =1,
                ticket_user_guid = employee.employee_identifier.ToString(),
                ticket_agent_guid = "NA",
                created_date = DateTime.UtcNow,
                created_by = "Application"
            });
            _companyContext.SaveChanges();

            var updatedEmployee = _companyContext.Employees.FirstOrDefault(s => s.emp_email == value.emp_email);
            var listRoles = new List<KeyValuePair<string, string>>();
            var employeesToRoles = _companyContext.EmployeeToRoles.Where
                     (x => x.company_identifier == employee.company_identifier && x.employee_identifier == employee.employee_identifier.ToString() && x.is_active == true).ToList();
            foreach (var roleDetail in employeesToRoles)
            {
                var roleName = _companyContext.CompanyRoles.FirstOrDefault
                         (x => x.company_identifier == employee.company_identifier && x.role_identifier.ToString() == roleDetail.role_identifier.ToString())
                         ?.role_name;

                if (!string.IsNullOrEmpty(roleName)) listRoles.Add(new KeyValuePair<string, string>(roleName, roleDetail.role_identifier));
            }
            updatedEmployee.emp_role = JsonConvert.SerializeObject(listRoles);

            return updatedEmployee;

        }

        // PUT api/<EmployeeController>/5
        [HttpPut]
        public async Task<Employee> Put([FromForm] UpdateEmployee value)
        {
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier);
            if (employeeStore != null)
            {
                var employeeNew = new Employee();
                var docList = new List<EmployeeDocument>();
                employeeNew.id = employeeStore.id;
                employeeNew.created_by = employeeStore.created_by;
                employeeNew.created_date = employeeStore.created_date;
                employeeNew.modified_date = DateTime.UtcNow;
                employeeNew.modified_by = "Application";
                employeeNew.is_approved = employeeStore.is_approved;
                employeeNew.is_rejected = employeeStore.is_rejected;
                employeeNew.emp_profile_picture = employeeStore.emp_profile_picture;
                if (value.emp_documents != null && value.emp_documents.Count > 0)
                {
                    foreach (var document in value.emp_documents)
                    {
                        var existingDocument = _companyContext.EmployeeToDocuments.FirstOrDefault(x => x.employee_identifier == value.employee_identifier.ToString()
                        && x.document_identifier == document.DocumentId);
                        if (existingDocument != null)
                        {
                            UploadedFile employeeResponse = await PostUploadFile(document.DocumentDetail, value.company_identifier);
                            docList.Add(
                                new EmployeeDocument { DocumentId = document.DocumentId, DocumentName = document.DocumentName, DocumentPath = employeeResponse?.file_identifier.ToString() }
                                );
                            if (employeeResponse != null)
                            {
                                _companyContext.EmployeeToDocuments.Add(new EmployeeToDocument
                                {
                                    company_identifier = value.company_identifier,
                                    employee_identifier = value.employee_identifier.ToString(),
                                    document_identifier = document.DocumentId,
                                    document_name = document.DocumentName,
                                    file_identifier = employeeResponse.file_identifier.ToString(),
                                    created_date = DateTime.UtcNow,
                                    created_by = "Application",
                                    is_active = true
                                });
                            }


                        }
                    }
                }
                employeeNew.emp_documents = docList;
                employeeNew.is_active = true;
                if (value.emp_approval_overdue != null && value.emp_approval_overdue < DateTime.UtcNow)
                {
                    employeeNew.emp_approval_overdue = DateTime.UtcNow.AddDays(7);
                }
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
            var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier == value.employee_identifier && s.is_active);
            if (employeeStore != null)
            {
                employeeStore.is_active = false;
                employeeStore.modified_date = DateTime.UtcNow;
                employeeStore.modified_by = "Application";
                _companyContext.Employees.Update(employeeStore);
                _companyContext.EmployeeToRoles.UpdateRange(_companyContext.EmployeeToRoles.Where
                   (x => x.company_identifier == value.company_identifier && x.employee_identifier == value.employee_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.AssetToEmployees.UpdateRange(_companyContext.AssetToEmployees.Where
                   (x => x.company_identifier == value.company_identifier && x.employee_identifier == value.employee_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.EmployeeToGroups.UpdateRange(_companyContext.EmployeeToGroups.Where
                   (x => x.company_identifier == value.company_identifier && x.employee_identifier == value.employee_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.SaveChanges();
                return _companyContext.Employees.Where(x => x.company_identifier == value.company_identifier && x.is_active).ToList();

            }
            else
            {
                return _companyContext.Employees.Where(x => x.company_identifier == value.company_identifier && x.is_active).ToList();
            }
        }

        [Route("EmployeeImageUpload")]
        [HttpPost]
        public async Task<Employee> EmployeeImageUpload([FromForm] EmployeePhotoUpload value)
        {
            if (!string.IsNullOrEmpty(value.employee_identifier) && !string.IsNullOrEmpty(value.company_identifier) && value.emp_profile_picture != null)
            {
                var employeeStore = _companyContext.Employees.FirstOrDefault(s => s.employee_identifier.ToString() == value.employee_identifier && s.is_active);
                if (employeeStore != null)
                {
                    UploadedFile employeeResponse = await PostUploadFile(value.emp_profile_picture, value.company_identifier, value.employee_identifier);
                    employeeStore.emp_profile_picture = employeeResponse?.file_identifier.ToString();
                    _companyContext.Employees.Attach(employeeStore);
                    _companyContext.Entry(employeeStore).Property(x => x.emp_profile_picture).IsModified = true;
                    _companyContext.SaveChanges();
                }

                return employeeStore;
            }
            else
            {
                return null;
            }

        }

    }
}
