using Microsoft.AspNetCore.Mvc;

namespace SpaComplexApi.Data
{
    public interface IUserRepository
    {
        JsonResult GetById(int id);
    }
}
