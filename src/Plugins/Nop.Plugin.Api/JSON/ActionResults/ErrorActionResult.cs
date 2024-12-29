﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using System.Net;
using System.Text;

namespace Nop.Plugin.Api.JSON.ActionResults
{
    public class ErrorActionResult : ActionResult
    {
        private readonly string _jsonString;
        private readonly HttpStatusCode _statusCode;

        public ErrorActionResult(string jsonString, HttpStatusCode statusCode)
        {
            _jsonString = jsonString;
            _statusCode = statusCode;
        }

        public override void ExecuteResult(ActionContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var response = context.HttpContext.Response;
            response.StatusCode = (int)_statusCode;
            response.ContentType = "application/json";
            using (TextWriter writer = new HttpResponseStreamWriter(response.Body, Encoding.UTF8))
            {
                writer.Write(_jsonString);
            }

        }
    }
}
