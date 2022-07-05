using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpaComplexApi.Helpers;
using SpaComplexApi.Models.Dtos;

namespace SpaComplexApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<JsonResult> Users()
        {
            const string query = @"select * from [User]";

            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");
            await using (var myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                await using (var myCommand = new SqlCommand(query, myConn))
                {
                    var myReader = await myCommand.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                }
                await myConn.CloseAsync();
            }

            return new JsonResult(table);
        }

        [HttpPost("change_pass")]
        public async Task<JsonResult> ChangePassword(ChangeInfoDto user)
        {
            const string query = @"update [User] set Password = @Password where User_Id = @User_Id;";

            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");
            await using (var myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                await using (var myCommand = new SqlCommand(query, myConn))
                {
                    var password = md5.hashPassword(user.Password);
                    myCommand.Parameters.AddWithValue("@User_Id", user.User_Id);
                    myCommand.Parameters.AddWithValue("@Password", password);
                    var myReader = await myCommand.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                }
                await myConn.CloseAsync();
            }

            return new JsonResult("update success!");
        }

        [HttpPost("edit")]
        public async Task<JsonResult> EditInfo(ChangeInfoDto user)
        {
            const string query = @"update [User] set FirstName=@FirstName, LastName=@LastName, Email=@Email 
                                    where User_Id = @User_Id;";

            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");
            await using (var myConn = new SqlConnection(sqlDataSource))
            {
                myConn.Open();
                await using (var myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@User_Id", user.User_Id);
                    myCommand.Parameters.AddWithValue("@FirstName", user.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", user.LastName);
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    var myReader = await myCommand.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                }
                await myConn.CloseAsync();
            }

            return new JsonResult("update success!");
        }
    }
}
