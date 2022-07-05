using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpaComplexApi.Models;

namespace SpaComplexApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptController : Controller
    {
        private readonly IConfiguration _configuration;

        public ReceiptController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // метод для статусы "Отменен"
        [HttpPost("decline")] 
        public async Task<IActionResult> Decline(Receipt receipt)
        {
            string query = @"update Receipt set Status_Id = 8 where Receipt_Id = @Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(new { message = $"заказ №{receipt.Receipt_Id} был отменен" });
        }

        // заказы для КЛИЕНТА

        [HttpPost("client")]
        public async Task<IActionResult> GetReceipt_User(Receipt receipt)
        {
            string query = @"select Receipt_Id,User_Id,
                                (SELECT Status_Title FROM Status WHERE Receipt.Status_Id = Status.Status_Id) as Status,
                                Name, Surname, Email, Phone,City, Address, Comment 
                            from Receipt where User_Id = @User_Id Order By Receipt_Id DESC";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@User_Id", receipt.User_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(table);
        }

        [HttpPost("client/info")]
        public async Task<IActionResult> GetReceiptInfo_User(Receipt receipt)
        {
            const string query = @"
                SELECT receipt_has_subscription.Receipt_Id, Receipt.User_Id, 
	Subscription.Subscription_Id, Subscription.Title, Subscription.Category_Id, Subscription.Days_type, Subscription.Time_type, Subscription.Price,
    receipt_has_subscription.Count
                FROM receipt_has_subscription, Subscription, Receipt 
                WHERE receipt_has_subscription.Receipt_Id = Receipt.Receipt_Id 
	            AND Receipt.User_Id = @User_Id AND receipt_has_subscription.Subscription_Id = Subscription.Subscription_Id ORDER BY Receipt_Id; ";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@User_Id", receipt.User_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(table);
        }

        // заказы для АДМИНА

        [HttpGet("admin")]
        public async Task<IActionResult> GetReceipt_Admin()
        {
            string query = @"select Receipt_Id,User_Id,
                                (SELECT Status_Title FROM Status WHERE Receipt.Status_Id = Status.Status_Id) as Status,
                                Name, Surname, Email, Phone,City, Address, Comment 
                            from Receipt Order By Receipt_Id DESC";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(table);
        }

        [HttpGet("admin/info")]
        public IActionResult GetReceiptInfo_Admin()
        {
            const string query = @"
                SELECT receipt_has_subscription.Receipt_Id, Receipt.User_Id, 
	Subscription.Subscription_Id, Subscription.Title, Subscription.Category_Id, Subscription.Days_type, Subscription.Time_type, Subscription.Price,
    receipt_has_subscription.Count
                FROM receipt_has_subscription, Receipt, Subscription  
                WHERE Receipt.Receipt_Id = receipt_has_subscription.Receipt_Id 
	            AND receipt_has_subscription.Subscription_Id = Subscription.Subscription_Id ORDER BY Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                using (var cmd = new SqlCommand(query, sqlConn))
                {
                    var reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                }
                sqlConn.Close();
            }

            return Ok(table);
        }

        // метод для статусы "Принят"
        [HttpPost("admin/accept")] 
        public async Task<IActionResult> Admin_Accept(Receipt receipt)
        {
            string query = @"update Receipt set Status_Id = 2 where Receipt_Id = @Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(new { message = $"заказ №{receipt.Receipt_Id} был подтвержден"});
        }

        // заказы для Работника склада

        [HttpGet("store-clerk")]
        public async Task<IActionResult> GetReceipt_StoreClerk()
        {
            string query = @"select Receipt_Id,User_Id,
                                (SELECT Status_Title FROM Status WHERE Receipt.Status_Id = Status.Status_Id) as Status,
                                Name, Surname, Email, Phone,City, Address, Comment 
                            from Receipt where Status_Id = 2 or Status_Id = 3 Order By Receipt_Id DESC";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(table);
        }

        [HttpGet("store-clerk/info")]
        public async Task<IActionResult> GetReceiptInfo_StoreClerk()
        {
            const string query = @"
                SELECT receipt_has_subscription.Receipt_Id, Receipt.User_Id, 
	Subscription.Subscription_Id, Subscription.Title, Subscription.Category_Id, Subscription.Days_type, Subscription.Time_type, Subscription.Price,
    receipt_has_subscription.Count
                FROM receipt_has_subscription, Receipt, Subscription  
                WHERE receipt_has_subscription.Receipt_Id = Receipt.Receipt_Id 
	            AND receipt_has_subscription.Subscription_Id = Subscription.Subscription_Id 
                AND (Receipt.Status_Id = 2 OR Receipt.Status_Id = 3) ORDER BY Receipt_Id";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(table);
        }

        // метод для статусы "Формируется"
        [HttpPost("store-clerk/forming")] 
        public async Task<IActionResult> Forming(Receipt receipt)
        {
            string query = @"update Receipt set Status_Id = 3 where Receipt_Id = @Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(new { message = $"заказ №{receipt.Receipt_Id} формируется" });
        }

        // метод для статусы "Сформирован"
        [HttpPost("store-clerk/formed")] 
        public async Task<IActionResult> Formed(Receipt receipt)
        {
            string query = @"update Receipt set Status_Id = 4 where Receipt_Id = @Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(new { message = $"заказ №{receipt.Receipt_Id} сформирован" });
        }

        // заказы для Курьера

        [HttpGet("courier")]
        public async Task<IActionResult> GetReceipt_Courier()
        {
            string query = @"select Receipt_Id,User_Id,
                                (SELECT Status_Title FROM Status WHERE Receipt.Status_Id = Status.Status_Id) as Status, 
                                Name, Surname, Email, Phone,City, Address, Comment 
                            from Receipt where Status_Id = 4 or Status_Id = 5 Order By Receipt_Id DESC";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(table);
        }

        [HttpGet("courier/info")]
        public async Task<IActionResult> GetReceiptInfo_Courier()
        {
            const string query = @"
                SELECT receipt_has_subscription.Receipt_Id, Receipt.User_Id, 
	Subscription.Subscription_Id, Subscription.Title, Subscription.Category_Id, Subscription.Days_type, Subscription.Time_type, Subscription.Price,
    receipt_has_subscription.Count
                FROM receipt_has_subscription, Receipt, Subscription  
                WHERE receipt_has_subscription.Receipt_Id = Receipt.Receipt_Id 
	            AND receipt_has_subscription.Subscription_Id = Subscription.Subscription_Id 
                AND (Receipt.Status_Id = 4 OR Receipt.Status_Id = 5) ORDER BY Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(table);
        }

        // метод для статусы "Доставляется"
        [HttpPost("courier/delivering")] 
        public async Task<IActionResult> Delivering(Receipt receipt)
        {
            string query = @"update Receipt set Status_Id = 5 where Receipt_Id = @Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(new { message = $"заказ №{receipt.Receipt_Id} доставляется" });
        }

        // метод для статусы "Доставлен"
        [HttpPost("courier/delivered")] 
        public async Task<IActionResult> Delivered(Receipt receipt)
        {
            const string query = @"update Receipt set Status_Id = 6 where Receipt_Id = @Receipt_Id;";
            const string get = @"select * from receipt_has_subscription where Receipt_Id = @Receipt_Id";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await using (var cmd = new SqlCommand(get, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }


            return Ok(table);
        }

        // метод для статусы "Не доставлен"
        [HttpPost("courier/undelivered")]
        public async Task<IActionResult> Undelivered(Receipt receipt)
        {
            string query = @"update Receipt set Status_Id = 7 where Receipt_Id = @Receipt_Id;";

            var table = new DataTable();
            var sqlSource = _configuration.GetConnectionString("SpaComplexDB");

            await using (var sqlConn = new SqlConnection(sqlSource))
            {
                sqlConn.Open();
                await using (var cmd = new SqlCommand(query, sqlConn))
                {
                    cmd.Parameters.AddWithValue("@Receipt_Id", receipt.Receipt_Id);
                    var reader = await cmd.ExecuteReaderAsync();
                    table.Load(reader);
                    await reader.CloseAsync();
                }
                await sqlConn.CloseAsync();
            }

            return Ok(new { message = $"заказ №{receipt.Receipt_Id} не доставлен" });
        }
    }
}
