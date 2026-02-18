using System;

namespace Application.Core;

public class AppException(int statusCode, string massege, string? details)
{
 public int StatusCode { get; set; } = statusCode;
 public string Massege { get; set; } = massege;
 public string? Details { get; set; } = details;
}
