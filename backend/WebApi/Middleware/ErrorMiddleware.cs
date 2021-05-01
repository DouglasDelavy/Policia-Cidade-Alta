using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Api.Middleware
{
	public static class ExceptionHandlerExtensions
	{
		public static void UseGlobalExceptionHandler(this IApplicationBuilder app)
		{
			app.UseExceptionHandler(builder =>
			{
				builder.Run(async httpContext =>
				{
					var exceptionHandlerFeature = httpContext.Features.Get<IExceptionHandlerFeature>();

					if (exceptionHandlerFeature != null)
					{
						httpContext.Response.Clear();
						httpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
						httpContext.Response.ContentType = "application/json";
						httpContext.Response.Headers.Add("Acess-Control-Allow-Origin", "*");

						await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(new { exceptionHandlerFeature.Error.Message }));
					}
				});
			});
		}
	}
}
