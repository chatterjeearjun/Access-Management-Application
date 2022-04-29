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
    public class AssetController : ControllerBase
    {
        private CompanyContext _companyContext;
        private IConfiguration configuration;
        public AssetController(CompanyContext companyContext, IConfiguration iConfig)
        {
            _companyContext = companyContext;
            configuration = iConfig;
        }

        // GET: api/<AssetController>/GetByCompany/{companyId}
        [HttpGet]
        public IEnumerable<Asset> GetByCompany(string companyId)
        {
            var assets = _companyContext.Assets.Where(x => x.company_identifier == companyId && x.is_active).ToList();
            foreach (var asset in assets)
            {
                asset.asset_description_attachment = !string.IsNullOrEmpty(asset.asset_description_attachment) ? _companyContext.UploadedFiles.FirstOrDefault
                        (s => s.file_identifier.ToString() == asset.asset_description_attachment)?.blob_file_name : String.Empty;
                if (!string.IsNullOrEmpty(asset.asset_owner))
                {
                    var employee = _companyContext.Employees.FirstOrDefault(x => x.employee_identifier == new Guid(asset.asset_owner));
                    if (employee != null && employee.emp_first_name != string.Empty)
                    {
                        var listRole = new KeyValuePair<string, string>(employee.employee_identifier.ToString(), employee.emp_first_name + employee.emp_last_name);
                        asset.asset_owner = JsonConvert.SerializeObject(listRole);
                    }
                }
            }
            return assets;
        }

        // GET api/<AssetController>/{guid}
        [HttpGet("{guid}")]
        public Asset Get(string guid)
        {
            var asset = _companyContext.Assets.FirstOrDefault(x => x.asset_identifier == new Guid(guid) && x.is_active);
            if (asset != null)
            {
                asset.asset_description_attachment = !string.IsNullOrEmpty(asset.asset_description_attachment) ? _companyContext.UploadedFiles.FirstOrDefault
                        (s => s.file_identifier.ToString() == asset.asset_description_attachment)?.blob_file_name : String.Empty;
                if (!string.IsNullOrEmpty(asset.asset_owner))
                {
                    var employee = _companyContext.Employees.FirstOrDefault(x => x.employee_identifier == new Guid(asset.asset_owner));
                    if (employee != null && employee.emp_first_name != string.Empty)
                    {
                        var listRole = new KeyValuePair<string, string>(employee.employee_identifier.ToString(), employee.emp_first_name + employee.emp_last_name);
                        asset.asset_owner = JsonConvert.SerializeObject(listRole);
                    }
                }
            }
            return asset;
        }

        [Route("[action]/{companyid}/{assetid}")]
        [HttpGet]
        public List<string> GetAssetAssociation(string companyid, string assetid)
        {
            List<string> association = new List<string>();
            association.Add(string.Join(',', _companyContext.AssetToEmployees.Where
                (x => x.asset_identifier == assetid && x.company_identifier == companyid && x.is_active).Select(x => x.employee_identifier)));
            association.Add(string.Join(',', _companyContext.AssetToRoles.Where
                (x => x.asset_identifier == assetid && x.company_identifier == companyid && x.is_active).Select(x => x.role_identifier)));
            association.Add(string.Join(',', _companyContext.AssetToUsers.Where
                (x => x.asset_identifier == assetid && x.company_identifier == companyid && x.is_active).Select(x => x.user_identifier)));
            association.RemoveAll(s => s == "");
            return association;
        }

        // POST api/<AssetController>
        [HttpPost]
        [AllowAnonymous]
        public async Task<Asset> Post([FromForm] CreateAsset value)
        {
            var asset = new Asset();
            asset.created_date = DateTime.UtcNow;
            asset.created_by = "Application";
            asset.is_active = true;

            if (value.asset_description_attachment != null)
            {
                // Add user to AppUser table
                GenericAPICalls request = new GenericAPICalls(configuration);
                var file = new FileModel
                {
                    File = value.asset_description_attachment,
                    upload_category = "Asset",
                    company_identifier = value.company_identifier,
                    user_identifier = ""
                };
                var response = request.FileUploadPostEndpoint("api/FileUpload/UploadDocument", file);
                if (response.Result.IsSuccessStatusCode)
                {
                    UploadedFile userResponse = await response.Result.Content.ReadAsAsync<UploadedFile>();
                    asset.asset_description_attachment = userResponse?.file_identifier.ToString();
                }
            }

            PropertyCopier<CreateAsset, Asset>.Copy(value, asset);
            _companyContext.Assets.Add(asset);
            _companyContext.SaveChanges();
            var newAsset = _companyContext.Assets.FirstOrDefault(s => s.asset_id == value.asset_id);
            newAsset.asset_description_attachment = !string.IsNullOrEmpty(newAsset.asset_description_attachment) ?
                _companyContext.UploadedFiles.FirstOrDefault(s => s.file_identifier.ToString() == asset.asset_description_attachment)?.blob_file_name : string.Empty;
            if (!string.IsNullOrEmpty(newAsset.asset_owner))
            {
                var employee = _companyContext.Employees.FirstOrDefault(x => x.employee_identifier == new Guid(newAsset.asset_owner));
                if (employee != null && employee.emp_first_name != string.Empty)
                {
                    var listRole = new KeyValuePair<string, string>(employee.employee_identifier.ToString(), employee.emp_first_name + employee.emp_last_name);
                    newAsset.asset_owner = JsonConvert.SerializeObject(listRole);
                }
            }
            return newAsset;
        }

        // PUT api/<AssetController>/5
        [HttpPut]
        public Asset Put([FromBody] UpdateAsset value)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier.ToString() == value.asset_identifier);
            if (asset != null)
            {
                var assetNew = new Asset();
                assetNew.id = asset.id;
                assetNew.created_by = asset.created_by;
                assetNew.created_date = asset.created_date;
                assetNew.modified_date = DateTime.UtcNow;
                assetNew.modified_by = "Application";
                assetNew.asset_identifier = asset.asset_identifier;
                assetNew.is_active = true;
                PropertyCopier<UpdateAsset, Asset>.Copy(value, assetNew);
                _companyContext.Entry<Asset>(asset).CurrentValues.SetValues(assetNew);
                _companyContext.SaveChanges();
                return _companyContext.Assets.FirstOrDefault(s => s.asset_identifier.ToString() == value.asset_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<AssetController>/5
        [HttpDelete]
        public IEnumerable<Asset> Delete([FromBody] DeleteAsset value)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == value.asset_identifier && s.is_active);
            if (asset != null)
            {
                _companyContext.AssetToEmployees.UpdateRange(_companyContext.AssetToEmployees.Where(x =>
                x.company_identifier == value.company_identifier && x.asset_identifier == value.asset_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.AssetToRoles.UpdateRange(_companyContext.AssetToRoles.Where(x =>
                x.company_identifier == value.company_identifier && x.asset_identifier == value.asset_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                _companyContext.AssetToUsers.UpdateRange(_companyContext.AssetToUsers.Where(x =>
                x.company_identifier == value.company_identifier && x.asset_identifier == value.asset_identifier.ToString()).ToList()
                   .Select(x => { x.is_active = false; x.modified_date = DateTime.UtcNow; x.modified_by = "Application"; return x; }));
                asset.is_active = false;
                asset.modified_date = DateTime.UtcNow;
                asset.modified_by = "Application";
                _companyContext.Assets.Update(asset);
                _companyContext.SaveChanges();
                return _companyContext.Assets.Where(x => x.company_identifier == value.company_identifier && x.is_active);
            }
            else
            {
                return _companyContext.Assets.Where(x => x.company_identifier == value.company_identifier && x.is_active);
            }
        }
    }
}
