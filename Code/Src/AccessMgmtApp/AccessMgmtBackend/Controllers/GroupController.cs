﻿using AccessMgmtBackend.Context;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private CompanyContext _companyContext;
        public GroupController(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }

        // GET: api/<GroupController>
        [HttpGet]
        public IEnumerable<Group> GetByCompany(string companyId)
        {
            if (!string.IsNullOrEmpty(companyId))
            {
                return _companyContext.Groups.Where(x => x.company_identifier == companyId).ToList();
            }
            else
            {
                return null;
            }
        }

        // GET api/<GroupController>/5
        [HttpGet("{guid}")]
        public Group Get(string guid)
        {
            return _companyContext.Groups.FirstOrDefault(s => s.group_identifier == new Guid(guid));
        }

        // POST api/<GroupController>
        [HttpPost]
        public async Task<Group> Post([FromForm] CreateGroup value)
        {
            var group = new Group();
            group.created_date = DateTime.UtcNow;
            group.created_by = "Application";
            group.is_active = true;

            if (value.group_description_attachment != null)
            {
                // Add user to AppUser table
                GenericAPICalls request = new GenericAPICalls();
                var file = new FileModel
                {
                    File = value.group_description_attachment,
                    upload_category = "Group",
                    company_identifier = value.company_identifier,
                    user_identifier = ""
                };
                var response = request.FileUploadPostEndpoint("api/FileUpload/UploadDocument", file);
                if (response.Result.IsSuccessStatusCode)
                {
                    UploadedFile userResponse = await response.Result.Content.ReadAsAsync<UploadedFile>();
                    group.group_description_attachment = userResponse?.file_identifier.ToString();
                }
            }

            PropertyCopier<CreateGroup, Group>.Copy(value, group);
            _companyContext.Groups.Add(group);
            _companyContext.SaveChanges();
            var newGroup = _companyContext.Groups.FirstOrDefault(s => s.id == group.id);
            newGroup.group_description_attachment = !string.IsNullOrEmpty(newGroup.group_description_attachment) ?
                _companyContext.UploadedFiles.FirstOrDefault(s => s.file_identifier.ToString() == group.group_description_attachment)?.blob_file_name : string.Empty;
            return newGroup;
        }

        // PUT api/<GroupController>/5
        [HttpPut]
        public Group Put([FromBody] UpdateGroup value)
        {
            var group = _companyContext.Groups.FirstOrDefault(s => s.group_identifier.ToString() == value.group_identifier);
            if (group != null)
            {
                var groupNew = new Group();
                groupNew.id = group.id;
                groupNew.created_by = group.created_by;
                groupNew.created_date = group.created_date;
                groupNew.modified_date = DateTime.UtcNow;
                groupNew.modified_by = "Application";
                groupNew.group_identifier = group.group_identifier;
                PropertyCopier<UpdateGroup, Group>.Copy(value, groupNew);
                _companyContext.Entry<Group>(group).CurrentValues.SetValues(groupNew);
                _companyContext.SaveChanges();
                return _companyContext.Groups.FirstOrDefault(s => s.group_identifier.ToString() == value.group_identifier);
            }
            else
            {
                return null;
            }
        }

        // DELETE api/<GroupController>/5
        [HttpDelete]
        public IEnumerable<Group> Delete([FromBody] DeleteGroup value)
        {
            var group = _companyContext.Groups.FirstOrDefault(s => s.group_identifier == value.group_identifier);
            if (group != null)
            {
                _companyContext.GroupToRoles.RemoveRange(_companyContext.GroupToRoles.Where
                    (x => x.company_identifier == value.company_identifier && x.group_identifier == value.group_identifier.ToString()));
                _companyContext.Groups.Remove(group);                
                _companyContext.SaveChanges();
                return _companyContext.Groups.Where(x => x.company_identifier == value.company_identifier);
            }
            else
            {
                return _companyContext.Groups.Where(x => x.company_identifier == value.company_identifier);
            }
        }
    }
}
