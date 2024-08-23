using Contracts;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Web.ModelBinders
{
    /// <summary>
    /// Decodes the user from the JWT in the Authorization header and passes it to
    /// the action. If the JWT cannot be decoded, null is attached in place of the parameter.
    /// Because of this, the parameter receiving the claims must be marked as nullable
    /// if used in a non-authorized route.
    /// </summary>
    /// <param name="jwtService"></param>
    public class JwtToClaimsBinder(IJwtService jwtService) : IModelBinder
    {
        private readonly IJwtService jwtService = jwtService;

        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
           
           try
            {
                string? jwt = bindingContext.HttpContext?.Request.Headers.Authorization.FirstOrDefault();
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
