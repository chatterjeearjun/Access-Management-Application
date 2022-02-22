using AccessMgmtBackend.Context;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JoinerChecklistController : ControllerBase
    {
        private CompanyContext _companyContext;
        public JoinerChecklistController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<JoinerChecklistController>
        [HttpGet]
        public IEnumerable<JoinerChecklist> Get()
        {
            return _companyContext.JoinerChecklists;
        }

        // GET api/<JoinerChecklistController>/5
        [HttpGet("{id}")]
        public JoinerChecklist Get(int id)
        {
            return _companyContext.JoinerChecklists.FirstOrDefault(s => s.id == id);
        }

        // POST api/<JoinerChecklistController>
        [HttpPost]
        public void Post([FromBody] JoinerChecklist value)
        {
            _companyContext.JoinerChecklists.Add(value);
            _companyContext.SaveChanges();
        }

        // PUT api/<JoinerChecklistController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            var employee = _companyContext.JoinerChecklists.FirstOrDefault(s => s.id == id);
            if (employee != null)
            {
                _companyContext.Entry<JoinerChecklist>(employee).CurrentValues.SetValues(value);
                _companyContext.SaveChanges();
            }
        }

        // DELETE api/<JoinerChecklistController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var student = _companyContext.JoinerChecklists.FirstOrDefault(s => s.id == id);
            if (student != null)
            {
                _companyContext.JoinerChecklists.Remove(student);
                _companyContext.SaveChanges();
            }
        }
    }
}
