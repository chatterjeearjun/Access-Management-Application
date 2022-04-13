using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {

        private CompanyContext _companyContext;
        public CompanyController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        [Route("GetCompanyDocument")]
        [HttpGet]
        public IEnumerable<AdditionalDocument> GetCompanyDocument(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.AdditionalDocuments.Where(x => x.company_identifier == companyId);
            }
            else
            {
                return null;
            }
        }

        [Route("UpdateCompanyDocument")]
        [HttpPost]
        public IEnumerable<AdditionalDocument> UpdateCompanyDocument(string companyId, List<KeyValuePair<string, bool>> documentAssociation)
        {
            try
            {
                if (!string.IsNullOrEmpty(companyId) && documentAssociation != null && documentAssociation.Count > 0)
                {
                    foreach (var docAssociation in documentAssociation)
                    {
                        var addDoc = _companyContext.AdditionalDocuments.FirstOrDefault(x => x.company_identifier == companyId
                        && x.document_identifier.ToString() == docAssociation.Key.Trim());
                        if (addDoc != null)
                        {
                            addDoc.modified_date = DateTime.UtcNow;
                            addDoc.modified_by = "Application";
                            addDoc.is_active = docAssociation.Value;
                            _companyContext.AdditionalDocuments.Update(addDoc);
                        }
                    }
                    _companyContext.SaveChanges();
                    return _companyContext.AdditionalDocuments.Where(x => x.company_identifier == companyId);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [Route("AddNewCompanyDocument")]
        [HttpPost]
        public IEnumerable<AdditionalDocument> AddNewCompanyDocument(string companyId, List<string> documentName)
        {
            try
            {
                if (!string.IsNullOrEmpty(companyId) && documentName != null && documentName.Count > 0)
                {
                    foreach (var document in documentName)
                    {
                        var isExist = _companyContext.AdditionalDocuments.FirstOrDefault(x => x.company_identifier == companyId
                        && x.document_name == document.Trim() && x.is_active) != null ? true : false;
                        if (!isExist)
                        {
                            AdditionalDocument additionalDocument = new AdditionalDocument();
                            additionalDocument.company_identifier = companyId;
                            additionalDocument.document_category = "Additional Document";
                            additionalDocument.document_name = document;
                            additionalDocument.created_date = DateTime.UtcNow;
                            additionalDocument.created_by = "Application";
                            additionalDocument.is_active = true;
                            _companyContext.AdditionalDocuments.Add(additionalDocument);
                        }
                    }
                    _companyContext.SaveChanges();
                    return _companyContext.AdditionalDocuments.Where(x => x.company_identifier == companyId && x.is_active);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // GET: api/<CompanyController>
        [HttpGet]
        public IEnumerable<Company> Get()
        {
            return _companyContext.Companies.Where(x => x.is_active);
        }

        // GET api/<CompanyController>/''
        [HttpGet("{guid}")]
        public Company Get(string guid)
        {
            return _companyContext.Companies.FirstOrDefault(s => s.company_identifier == new Guid(guid) && s.is_active);
        }

        // POST api/<CompanyController>
        [HttpPost]
        public Company Post([FromBody] CreateCompany value)
        {
            var company = new Company();
            company.created_date = DateTime.UtcNow;
            company.created_by = "Application";
            company.is_active = true;
            PropertyCopier<CreateCompany, Company>.Copy(value, company);
            _companyContext.Companies.Add(company);
            var commonDocs = _companyContext.CommonDocuments.Where(x => x.is_active).ToList();
            if (commonDocs != null && commonDocs.Count > 0)
            {
                foreach (var comDoc in commonDocs)
                {
                    AdditionalDocument additionalDocument = new AdditionalDocument();
                    additionalDocument.company_identifier = company.company_identifier.ToString();
                    additionalDocument.document_category = "Additional Document";
                    additionalDocument.document_name = comDoc.document_name;
                    additionalDocument.created_date = DateTime.UtcNow;
                    additionalDocument.created_by = "Application";
                    additionalDocument.is_active = true;
                    _companyContext.AdditionalDocuments.Add(additionalDocument);
                }
            }
            _companyContext.SaveChanges();
            return _companyContext.Companies.FirstOrDefault(s => s.company_email == value.company_email);
        }

        // PUT api/<CompanyController>/''
        [HttpPut]
        public Company Put([FromBody] UpdateCompany value)
        {
            var company = _companyContext.Companies.FirstOrDefault(s => s.company_identifier == value.company_identifier);
            if (company != null)
            {
                var companyNew = new Company();
                companyNew.id = company.id;
                companyNew.created_by = company.created_by;
                companyNew.created_date = company.created_date;
                companyNew.modified_date = DateTime.UtcNow;
                companyNew.modified_by = "Application";
                companyNew.is_active = true;
                PropertyCopier<UpdateCompany, Company>.Copy(value, companyNew);
                _companyContext.Entry<Company>(company).CurrentValues.SetValues(companyNew);
                _companyContext.SaveChanges();
                return _companyContext.Companies.FirstOrDefault(s => s.company_identifier == value.company_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<CompanyController>/''
        [HttpDelete]
        public IEnumerable<Company> Delete([FromBody] DeleteCompany value)
        {
            var student = _companyContext.Companies.FirstOrDefault(s => s.company_identifier == value.company_identifier);
            if (student != null)
            {
                student.is_active = false;
                student.modified_date = DateTime.UtcNow;
                student.modified_by = "Application";
                _companyContext.Companies.Update(student);
                _companyContext.SaveChanges();
                return _companyContext.Companies.Where(x => x.company_identifier == value.company_identifier && x.is_active);
            }
            else
            {
                return _companyContext.Companies.Where(x => x.company_identifier == value.company_identifier && x.is_active);
            }
        }
    }
}
