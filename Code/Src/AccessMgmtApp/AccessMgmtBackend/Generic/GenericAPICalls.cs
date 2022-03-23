using AccessMgmtBackend.Models;
using System.Net.Http.Headers;

namespace AccessMgmtBackend.Generic
{
    public class GenericAPICalls
    {
        private static string BaseAddress = "https://localhost:5001/";
        public async Task<HttpResponseMessage> GetEndpoint(string requestURI)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //GET Method
                HttpResponseMessage response = await client.GetAsync(requestURI);
                return response;
            }
        }
        public async Task<HttpResponseMessage> AppUserPostEndpoint(string requestURI, CreateAppUser type)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseAddress);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //POST Method                
                HttpResponseMessage response = await client.PostAsJsonAsync(requestURI, type);
                return response;
            }

        }

        public async Task<HttpResponseMessage> FileUploadPostEndpoint(string requestURI, FileModel file)
        {

            var client = new HttpClient
            {
                BaseAddress = new(BaseAddress)
            };
            await using var stream = file.File.OpenReadStream();
            using var request = new HttpRequestMessage(HttpMethod.Post, requestURI);
            var payload = new
            {
                upload_category = file.upload_category,
                company_identifier = file.company_identifier,
                user_identifier = file.user_identifier

            };

            using var content = new MultipartFormDataContent
            {
                // file
                { new StreamContent(stream), "File", file.File.FileName },

                // payload
                { new StringContent(payload.upload_category), "upload_category" },
                { new StringContent(payload.company_identifier), "company_identifier" },
                { new StringContent(payload.user_identifier), "user_identifier" }
            };

            request.Content = content;
            HttpResponseMessage response = await client.SendAsync(request);
            //POST Method                
            //HttpResponseMessage response = await client.PostAsJsonAsync(requestURI, type);
            return response;

        }

    }
}
