using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpaComplexApi.Data;
using SpaComplexApi.Dtos;
using SpaComplexApi.Helpers;
using SpaComplexApi.Models;

namespace SpaComplexApi.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController: Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IConfiguration configuration, JwtService jwtService, IUserRepository repository)
        {
            _configuration = configuration;
            _jwtService = jwtService;
            _repository = repository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto user)
        {
            var query = @"SELECT * FROM [User]
                            WHERE Email = @Email and Password = @Password";


            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                await using(var myCommand = new SqlCommand(query, myConn))
                {
                    var password = md5.hashPassword(user.Password);
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    myCommand.Parameters.AddWithValue("@Password", password);
                    var myReader = await myCommand.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                    await myConn.CloseAsync();
                }
                if(table.Rows.Count == 0)
                {
                    return BadRequest(new { message = "Invalid Credentials" });
                }
            }

            var id = (int)table.Rows[0][0];
            var jwt = _jwtService.Generate(id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });

        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration(User user)
        {
            var query_check = @"select * from [User] where Email = @EmailTest";

            var query = @"INSERT INTO [User](FirstName, LastName, Email, Password) 
                            VALUES (@FirstName, @LastName, @Email, @Password)";

            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                await using (var myCommand = new SqlCommand(query_check, myConn))
                {
                    var checkEmail = user.Email;
                    myCommand.Parameters.AddWithValue("@EmailTest", checkEmail);
                    var myReader = await myCommand.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                }
                if (table.Rows.Count != 0)
                {
                    return BadRequest(new { message = "Такая почта используется" });
                }

                await using (var myCommand = new SqlCommand(query, myConn))
                {
                    var password = md5.hashPassword(user.Password);
                    myCommand.Parameters.AddWithValue("@FirstName", user.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", user.LastName);
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    myCommand.Parameters.AddWithValue("@Password", password);
                    var myReader = await myCommand.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                }

                await myConn.CloseAsync();
            }

            return Ok("success!");
        }

        [HttpGet("online")]
        public IActionResult IsOnline()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var token = _jwtService.Verify(jwt);

                var userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);

                return Ok(user.Value);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }
    }
}
