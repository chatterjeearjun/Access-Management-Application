using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetController : ControllerBase
    {
        private CompanyContext _companyContext;
        public AssetController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<AssetController>/GetByCompany/{companyId}
        [HttpGet]
        public IEnumerable<Asset> GetByCompany(string companyId)
        {
            return _companyContext.Assets.Where(x => x.company_identifier == companyId).ToList();
        }

        // GET api/<AssetController>/{guid}
        [HttpGet("{guid}")]
        public Asset Get(string guid)
        {
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == new Guid(guid));
            if (asset != null)
            {
                asset.asset_description_attachment = !string.IsNullOrEmpty(asset.asset_description_attachment) ? _companyContext.UploadedFiles.FirstOrDefault
                        (s => s.file_identifier.ToString() == asset.asset_description_attachment)?.blob_file_name : String.Empty;
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
                GenericAPICalls request = new GenericAPICalls();
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
            var asset = _companyContext.Assets.FirstOrDefault(s => s.asset_identifier == value.asset_identifier);
            if (asset != null)
            {
                _companyContext.AssetToEmployees.RemoveRange(_companyContext.AssetToEmployees.Where(x =>
                x.company_identifier == value.company_identifier && x.asset_identifier == value.asset_identifier.ToString()));
                _companyContext.AssetToRoles.RemoveRange(_companyContext.AssetToRoles.Where(x =>
                x.company_identifier == value.company_identifier && x.asset_identifier == value.asset_identifier.ToString()));
                _companyContext.AssetToUsers.RemoveRange(_companyContext.AssetToUsers.Where(x =>
                x.company_identifier == value.company_identifier && x.asset_identifier == value.asset_identifier.ToString()));
                _companyContext.Assets.Remove(asset);
                _companyContext.SaveChanges();
                return _companyContext.Assets.Where(x => x.company_identifier == value.company_identifier);
            }
            else
            {
                return _companyContext.Assets.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
