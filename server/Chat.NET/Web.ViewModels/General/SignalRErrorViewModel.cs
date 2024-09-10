using System.Net;

namespace Web.ViewModels.General
{
    public class SignalRErrorViewModel
    {
        public HttpStatusCode StatusCode { get; set; }
        public string? Message { get; set; }
    }
}
