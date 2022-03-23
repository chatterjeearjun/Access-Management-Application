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
        [Route("UploadDocument")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> UploadDocument([FromForm] FileModel file)
        {
            try
            {
                var filename = GenerateFileName(file.File.FileName, file.company_identifier, file.user_identifier);
                var fileUrl = "";
                BlobContainerClient container = new BlobContainerClient("DefaultEndpointsProtocol=https;AccountName=accessmanagement;AccountKey=n/iZ6tfNgH8sRbbItnRPbo+1F32DZzr57MGQvMWmuNW+jhrD1Acfr+KNS99dOt6LwQrNafxOrkyNnFHmSoVriw==;EndpointSuffix=core.windows.net",
                "accessmanagement");
                try
                {
                    BlobClient blob = container.GetBlobClient(filename);
                    using (Stream stream = file.File.OpenReadStream())
                    {
                        blob.Upload(stream);
                    }
                    fileUrl = blob.Uri.AbsoluteUri;
                }
                catch (Exception ex) { }
                var result = fileUrl;
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Ok();
            }
        }
        private string GenerateFileName(string fileName, string CompanyIdentifier, string UserIdentifier)
        {
            try
            {
                string strFileName = string.Empty;
                string[] strName = fileName.Split('.');
                strFileName = CompanyIdentifier + "/" + UserIdentifier + "/" + DateTime.UtcNow.ToString("yyyy-MM-dd") + "/"
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
