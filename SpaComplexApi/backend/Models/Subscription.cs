namespace SpaComplexApi.Models
{
    public class Subscription
    {
        public int Subscription_Id { get; set; }

        public string Title { get; set; }

        public string Category { get; set; }
        
        public string Days_type { get; set; }

        public string Time_type { get; set; }

        public int Amount { get; set; }

        public decimal Price { get; set; }

    }
}
