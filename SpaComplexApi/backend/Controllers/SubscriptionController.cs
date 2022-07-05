using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpaComplexApi.Dtos;

namespace SpaComplexApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : Controller
    {
        private readonly IConfiguration _configuration;

        public SubscriptionController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<JsonResult> Get()
        {
            const string query = @"select Subscription_Id, Title, 
	                        (select Name from Category where Subscription.Category_Id = Category.Category_Id) as Category, 
                          Days_type, Time_type, Amount, Price 
                          from Subscription";

            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");
            await using (var myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                await using (var myComm = new SqlCommand(query, myCon))
                {
                    var myReader = await myComm.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost("amount")]
        public async Task<JsonResult> ChangeAmount(OrderDto info)
        {
            const string query = @"
                update Subscription set Amount = (Amount - @Count) where Subscription_Id = @Subscription_Id;";

            var table = new DataTable();
            var sqlDataSource = _configuration.GetConnectionString("SpaComplexDB");
            await using (var myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                await using (var myComm = new SqlCommand(query, myCon))
                {
                    myComm.Parameters.AddWithValue("@Count", info.Count);
                    myComm.Parameters.AddWithValue("@Subscription_Id", info.Subscription_Id);
                    var myReader = await myComm.ExecuteReaderAsync();
                    table.Load(myReader);
                    await myReader.CloseAsync();
                    myCon.Close();
                }
            }

            return new JsonResult("количество абонементов на складе было изменено");
        }
    }
}
