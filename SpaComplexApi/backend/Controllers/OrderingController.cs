using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpaComplexApi.Dtos;

namespace SpaComplexApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderingController : Controller
    {
        private readonly IConfiguration _configuration;

        public OrderingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post_Receipt(OrderDto order)
        {
            if (!order.Phone.All(char.IsDigit)) return BadRequest(new { message = "только цифры" });

            var query = @"insert into Receipt(User_Id, Name, Surname, Email, Phone, City, Address, Comment) 
                            values(@User_Id, @Name, @Surname, @Email, @Phone, @City, @Address, @Comment);";

            var table = new DataTable();
            var sqlSourse = _configuration.GetConnectionString("SpaComplexDB");

            await using (var Conn = new SqlConnection(sqlSourse))
            {
                Conn.Open();
                await using (var cmd = new SqlCommand(query, Conn))
                {
                    cmd.Parameters.AddWithValue("@User_Id", order.User_Id);
                    cmd.Parameters.AddWithValue("@Name", order.Name);
                    cmd.Parameters.AddWithValue("@Surname", order.Surname);
                    cmd.Parameters.AddWithValue("@Email", order.Email);
                    cmd.Parameters.AddWithValue("@Phone", order.Phone);
                    cmd.Parameters.AddWithValue("@City", order.City);
                    cmd.Parameters.AddWithValue("@Address", order.Address);
                    cmd.Parameters.AddWithValue("@Comment", order.Comment);
                    var Reader = await cmd.ExecuteReaderAsync();
                    table.Load(Reader);
                    await Reader.CloseAsync();
                }

                await Conn.CloseAsync();
            }

            return Ok(new { message = "success!" });

        }

        [HttpGet]
        public async Task<IActionResult> Get_Last_Insert()
        {
            var query = @"select TOP 1 * from Receipt ORDER BY Receipt_Id DESC;";
            //var query = @"select * from Receipt ORDER BY Receipt_Id DESC LIMIT 1;";

            var table = new DataTable();
            var sqlSourse = _configuration.GetConnectionString("SpaComplexDB");
            await using (var Conn = new SqlConnection(sqlSourse))
            {
                Conn.Open();
                await using (var cmd = new SqlCommand(query, Conn))
                {
                    var Reader = await cmd.ExecuteReaderAsync();
                    table.Load(Reader);
                    await Reader.CloseAsync();
                }

                await Conn.CloseAsync();
            }
            
            return Ok(table);
        }

        [HttpPost("receiptHasSubscription")]
        public IActionResult Post_Subscription(OrderDto order)
        {
            var addCard = @$"insert into receipt_has_subscription(Subscription_Id, Receipt_Id, Count) 
                                values (@Subscription_Id, @Receipt_Id, @Count)";

            var table = new DataTable();
            var sqlSourse = _configuration.GetConnectionString("SpaComplexDB");

            using (var Conn = new SqlConnection(sqlSourse))
            {
                Conn.Open();

                using (var cmd = new SqlCommand(addCard, Conn))
                {
                    cmd.Parameters.AddWithValue("@Subscription_Id", order.Subscription_Id);
                    cmd.Parameters.AddWithValue("@Receipt_Id", order.Receipt_Id);
                    cmd.Parameters.AddWithValue("@Count", order.Count);
                    var Reader = cmd.ExecuteReader();
                    table.Load(Reader);
                    Reader.Close();
                }
                Conn.Close();
            }

            return Ok(new { message = "обьект был добавлен в receipt_has_subscription" });
        }
    }
}
