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
        public async Task<HttpResponseMessage> PostEndpoint(string requestURI,CreateAppUser type)
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

    }
}
