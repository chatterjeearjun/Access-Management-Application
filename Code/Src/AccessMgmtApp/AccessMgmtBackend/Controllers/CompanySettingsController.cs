using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanySettingsController : ControllerBase
    {
        private CompanyContext _companyContext;
        EncryptionHelper encryptionHelper = new EncryptionHelper();
        public CompanySettingsController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<CompanySettingsController>
        [Route("GetCompanySettings")]
        [HttpGet]
        public IEnumerable<CompanySetting> GetCompanySettings(string companyId)
        {
            var companysettings = _companyContext.CompanySetting.Where(s => s.company_identifier == companyId).ToList();
           
            foreach (var i in companysettings)
            {
                i.setting_value = !string.IsNullOrEmpty(i.setting_value) ? encryptionHelper.Decryptword(i.setting_value):String.Empty;
            }
            return companysettings;
        }

        // POST api/<CompanySettingsController>
        [HttpPost]
        public CompanySetting Post([FromBody] CreateCompanySetting value)
        {
            var company = new CompanySetting();
            company.created_date = DateTime.UtcNow;
            company.created_by = "Application";
            company.is_active = true;
            PropertyCopier<CreateCompanySetting, CompanySetting>.Copy(value, company);
            company.setting_value = !string.IsNullOrEmpty(company.setting_value) ? encryptionHelper.Encryptword(company.setting_value) : String.Empty;
            _companyContext.CompanySetting.Add(company);
            _companyContext.SaveChanges();
            var returnSetting = _companyContext.CompanySetting.FirstOrDefault(s => s.setting_identifier == company.setting_identifier);
            returnSetting.setting_value = value.setting_value;
            return returnSetting;
        }

        // PUT api/<CompanySettingsController>/
        [HttpPut]
        public CompanySetting Put([FromBody] UpdateCompanySetting value)
        {
            var company = _companyContext.CompanySetting.FirstOrDefault(s => s.setting_identifier == value.setting_identifier);
            if (company != null)
            {
                var companyNew = new CompanySetting();
                companyNew.id = company.id;
                companyNew.created_by = company.created_by;
                companyNew.created_date = company.created_date;
                companyNew.modified_date = DateTime.UtcNow;
                companyNew.modified_by = "Application";
                companyNew.is_active = true;
                PropertyCopier<UpdateCompanySetting, CompanySetting>.Copy(value, companyNew);
                companyNew.setting_value = !string.IsNullOrEmpty(value.setting_value) ? encryptionHelper.Encryptword(value.setting_value) : String.Empty;
                _companyContext.Entry<CompanySetting>(company).CurrentValues.SetValues(companyNew);
                _companyContext.SaveChanges();
                var returnSetting = _companyContext.CompanySetting.FirstOrDefault(s => s.setting_identifier == value.setting_identifier);
                returnSetting.setting_value = value.setting_value;
                return returnSetting;
            }
            else
            {
                return null;
            }
        }


        // DELETE api/<CompanySettingsController>/5
        [HttpDelete]
        public IEnumerable<CompanySetting> Delete(DeleteCompanySetting value)
        {
            var student = _companyContext.CompanySetting.FirstOrDefault(s => s.setting_identifier == value.setting_identifier);
            if (student != null)
            {
                student.is_active = false;
                student.modified_date = DateTime.UtcNow;
                student.modified_by = "Application";
                _companyContext.CompanySetting.Update(student);
                _companyContext.SaveChanges();
                return _companyContext.CompanySetting.Where(x => x.company_identifier == value.company_identifier && x.is_active);
            }
            else
            {
                return _companyContext.CompanySetting.Where(x => x.company_identifier == value.company_identifier && x.is_active);
            }
        }
    }
}
