using Contracts;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Web.ModelBinders
{
    public class JwtToClaimsBinder(IJwtService jwtService) : IModelBinder
    {
        private readonly IJwtService jwtService = jwtService;

        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
           
           try
            {
                string? jwt = bindingContext.HttpContext?.Request.Headers.Authorization.First();
                jwt ??= string.Empty;
                var user = this.jwtService.ExtractUserFromJWT(jwt);
                bindingContext.Result = ModelBindingResult.Success(user);
            }
            catch
            {
                bindingContext.Result = ModelBindingResult.Success(null);
            }

            return Task.CompletedTask;
        }
    }
}
