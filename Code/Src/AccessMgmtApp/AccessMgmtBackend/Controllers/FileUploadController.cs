using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private CompanyContext _companyContext;
        public FileUploadController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        [Route("UploadDocument")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<UploadedFile> UploadDocument([FromForm] FileModel file)
        {
            try
            {
                var filename = GenerateFileName(file.File.FileName, file.company_identifier, file.user_identifier, file.upload_category);
                var fileUrl = "";
                BlobContainerClient container = new BlobContainerClient("DefaultEndpointsProtocol=https;AccountName=accessmanagement;AccountKey=n/iZ6tfNgH8sRbbItnRPbo+1F32DZzr57MGQvMWmuNW+jhrD1Acfr+KNS99dOt6LwQrNafxOrkyNnFHmSoVriw==;EndpointSuffix=core.windows.net",
                "accessmanagement");
                try
                {
                    var uploadedFile = new UploadedFile();
                    BlobClient blob = container.GetBlobClient(filename);
                    using (Stream stream = file.File.OpenReadStream())
                    {
                        blob.Upload(stream);
                    }
                    fileUrl = blob.Uri.AbsoluteUri;
                    if (!string.IsNullOrEmpty(fileUrl))
                    {
                        
                        uploadedFile.company_identifier = file.company_identifier;
                        uploadedFile.user_identifier = file.user_identifier;
                        uploadedFile.friendly_file_name = file.File.FileName;
                        uploadedFile.blob_file_name = fileUrl;
                        uploadedFile.upload_category = file.upload_category;
                        uploadedFile.created_date = DateTime.UtcNow;
                        uploadedFile.created_by = "Application";
                        uploadedFile.is_approved = true;
                        _companyContext.UploadedFiles.Add(uploadedFile);
                        _companyContext.SaveChanges();
                    }
                    return _companyContext.UploadedFiles.FirstOrDefault
                        (s => s.file_identifier== uploadedFile.file_identifier);
                }
                catch (Exception ex) { return null; }
                //var result = fileUrl;
                //return Ok(result);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        private string GenerateFileName(string fileName, string CompanyIdentifier, string UserIdentifier, string UploadCategory)
        {
            try
            {
                string strFileName = string.Empty;
                string[] strName = fileName.Split('.');
                string apprendString = !string.IsNullOrEmpty(UserIdentifier) ? CompanyIdentifier + "/" + UserIdentifier : CompanyIdentifier;
                strFileName = apprendString + "/" + UploadCategory + "/"
                   + DateTime.UtcNow.ToString("yyyyMMdd\\THHmmssfff") + "." +
                   strName[strName.Length - 1];
                return strFileName;
            }
            catch (Exception ex)
            {
                return fileName;
            }
        }
    }
}
