using AccessMgmtBackend.Data.Entities;
using AccessMgmtBackend.Dto;
using AccessMgmtBackend.Generic;
using AccessMgmtBackend.Models;
using AccessMgmtBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;

namespace AccessMgmtBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> logger;
        private readonly SignInManager<User> signInManager;
        private readonly UserManager<User> userManager;
        private readonly IConfiguration config;
        private readonly ITokenService _tokenService;

        public AccountController(ILogger<AccountController> logger,
            SignInManager<User> signInManager,
            UserManager<User> userManager,
            IConfiguration config, ITokenService tokenService)
        {
            this.logger = logger;
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.config = config;
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await this.userManager.FindByEmailAsync(model.Email);
                if (existingUser == null)
                {
                    User user = new User();
                    user.UserName = model.Email;
                    user.Email = model.Email;
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;

                    IdentityResult result = userManager.CreateAsync(user, model.Password).Result;

                    if (result.Succeeded && !string.IsNullOrEmpty(model.user_role))
                    {
                        // Add user to AppUser table
                        GenericAPICalls request = new GenericAPICalls(this.config);
                        var appuser = new CreateAppUser
                        {
                            company_identifier = model.CompanyIdentifier,
                            user_name = model.Email,
                            user_description = model.user_description,
                            //user_description_attachment = model.user_description_attachment,
                            is_nda_required = model.is_nda_required,
                            is_bc_required = model.is_bc_required,
                            is_certification_required = model.is_certification_required,
                            associated_assets = model.associated_assets,
                            user_role = model.user_role,
                            user_group = model.user_group,
                            is_approved = model.is_approved
                        };
                        var response = request.AppUserPostEndpoint("api/appuser", appuser);
                        if (response.Result.IsSuccessStatusCode)
                        {
                            AppUser userResponse = await response.Result.Content.ReadAsAsync<AppUser>();
                            Console.WriteLine("Id:{0}\tActive:{1}", userResponse.id, userResponse.is_active);
                        }
                        else
                        {
                            Console.WriteLine("Internal server Error");
                        }

                    }
                    await userManager.AddToRoleAsync(user, model.user_role);
                    return Created("", model);
                }

            }

            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (ModelState.IsValid)
            {
                var user = await this.userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    GenericAPICalls request = new GenericAPICalls(this.config);
                    string userResponse = string.Empty;
                    var passwordCheck = await this.signInManager.CheckPasswordSignInAsync(user, model.Password, false);
                    if (passwordCheck.Succeeded)
                    {

                        var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, user.Email),
                            new Claim(JwtRegisteredClaimNames.Sub, user.UserName)
                        };
                        var accessToken = _tokenService.GenerateAccessToken(claims);
                        var refreshToken = _tokenService.GenerateRefreshToken();

                        ////user.RefreshToken = refreshToken;
                        ////user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

                        //var claims = new List<Claim>
                        //{
                        //    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                        //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        //    new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
                        //};
                        //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config["Tokens:Key"]));
                        //var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        //var token = new JwtSecurityToken(
                        //    this.config["Tokens:Issuer"],
                        //    this.config["Tokens:Audience"],
                        //    claims,
                        //    expires: DateTime.UtcNow.AddHours(3),
                        //    signingCredentials: credentials
                        //    );






                        var response = request.GetEndpoint("api/AppUser/GetByEmail?email=" + user.Email);
                        if (response.Result.IsSuccessStatusCode)
                        {
                            userResponse = await response.Result.Content.ReadAsAsync<string>();
                        }
                        else
                        {
                            return Unauthorized("User Not Found");
                        }
                        return Ok(new
                        {
                            useridentier = userResponse,
                            token = accessToken,
                            refreshtoken = refreshToken,
                            refreshtokenexpirytime = DateTime.UtcNow.AddDays(7),
                        });
                    }
                    else if (passwordCheck.IsLockedOut)
                    {
                        return Unauthorized("Account Locked");
                    }
                    else if (!passwordCheck.Succeeded)
                    {
                        return Unauthorized("Wrong Credential");
                    }

                }
                else
                {
                    return Unauthorized("User Not Found");
                }
            }

            return BadRequest();
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh(TokenApiModel tokenApiModel)
        {
            if (tokenApiModel is null)
                return BadRequest("Invalid client request");

            string accessToken = tokenApiModel.AccessToken;
            string refreshToken = tokenApiModel.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name; //this is mapped to the Name claim by default

            var user = this.userManager.FindByEmailAsync(username);

            if (user == null)
                return BadRequest("Invalid client request");

            var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            return Ok(new AuthenticatedResponse()
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken
            });
        }

    }
}
