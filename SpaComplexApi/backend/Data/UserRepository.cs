using System.Data;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpaComplexApi.Models;

namespace SpaComplexApi.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly IConfiguration _configuration;

        public UserRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public JsonResult GetById(int id)
        {
            var query = @"select User_Id, FirstName, LastName, Email, Password,
	                        (SELECT Title FROM Role WHERE [User].Role_Id = Role.Role_Id) as Role 
                        from [User] where User_Id = @User_Id";


            var table = new DataTable();
            var user = new User(); 
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");

            using (var myConn = new SqlConnection(sqlDataSource))
            {

                myConn.Open();
                using (var myCommand = new SqlCommand(query, myConn))
                {
                    myCommand.Parameters.AddWithValue("@User_Id", id);
                    var myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    user.User_Id = (int)table.Rows[0][0];
                    user.FirstName = (string)table.Rows[0][1];
                    user.LastName = (string)table.Rows[0][2];
                    user.Email = (string)table.Rows[0][3];
                    user.Password = (string)table.Rows[0][4];
                    user.Role = (string)table.Rows[0][5];
                    myReader.Close();
                    myConn.Close();
                }
                
            }

            return new JsonResult(user);
        }
    }
}
