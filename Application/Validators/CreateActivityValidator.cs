using System;
using System.Data;
using Application.Activities.Commands;
using Application.Activities.Dtos;
using FluentValidation;

namespace Application.Validators;
public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
 public CreateActivityValidator() : base(x => x.ActivityDto)
 {
    
    
 }
}
